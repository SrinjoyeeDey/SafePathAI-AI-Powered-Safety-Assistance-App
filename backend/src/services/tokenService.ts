import GitHubToken, { IGitHubToken } from '../models/GitHubToken';
import EncryptionService from './encryptionService';
import GitHubService, { TokenValidation } from './githubService';
import { Types } from 'mongoose';

export interface TokenInfo {
    hasToken: boolean;
    maskedToken?: string;
    scopes: string[];
    lastValidated: Date;
    isActive: boolean;
}

export interface StoredTokenValidation extends TokenValidation {
    tokenInfo?: TokenInfo;
}

export class TokenService {
    /**
     * Stores a new GitHub token for a user
     */
    static async storeToken(userId: string, token: string): Promise<void> {
        try {
            // Validate the token first
            const validation = await GitHubService.validateToken(token);
            if (!validation.isValid) {
                throw new Error(validation.error || 'Token validation failed');
            }

            // Encrypt the token
            const encryptedToken = await EncryptionService.encrypt(token);
            const tokenHash = EncryptionService.createHash(token);

            // Remove any existing token for this user
            await GitHubToken.findOneAndDelete({ userId: new Types.ObjectId(userId) });

            // Create new token document
            const tokenDoc = new GitHubToken({
                userId: new Types.ObjectId(userId),
                encryptedToken,
                tokenHash,
                scopes: validation.scopes,
                lastValidated: new Date(),
                isActive: true
            });

            await tokenDoc.save();

        } catch (error) {
            throw new Error(`Failed to store token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Retrieves and decrypts a token for a user
     */
    static async getToken(userId: string): Promise<string | null> {
        try {
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            if (!tokenDoc) {
                return null;
            }

            // Decrypt the token
            const decryptedToken = await EncryptionService.decrypt(tokenDoc.encryptedToken);
            return decryptedToken;

        } catch (error) {
            throw new Error(`Failed to retrieve token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Validates a token without storing it
     */
    static async validateToken(token: string): Promise<TokenValidation> {
        return await GitHubService.validateToken(token);
    }

    /**
     * Validates the stored token for a user
     */
    static async validateStoredToken(userId: string): Promise<StoredTokenValidation> {
        try {
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            if (!tokenDoc) {
                return {
                    isValid: false,
                    scopes: [],
                    rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                    error: 'No token found for user'
                };
            }

            // Decrypt and validate the token
            const decryptedToken = await EncryptionService.decrypt(tokenDoc.encryptedToken);
            const validation = await GitHubService.validateToken(decryptedToken);

            // Update validation timestamp and status
            tokenDoc.lastValidated = new Date();
            tokenDoc.isActive = validation.isValid;
            if (validation.isValid) {
                tokenDoc.scopes = validation.scopes;
            }
            await tokenDoc.save();

            return {
                ...validation,
                tokenInfo: {
                    hasToken: true,
                    maskedToken: TokenService.maskToken(decryptedToken),
                    scopes: tokenDoc.scopes,
                    lastValidated: tokenDoc.lastValidated,
                    isActive: tokenDoc.isActive
                }
            };

        } catch (error) {
            return {
                isValid: false,
                scopes: [],
                rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                error: `Token validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            };
        }
    }

    /**
     * Removes a token for a user
     */
    static async removeToken(userId: string): Promise<void> {
        try {
            const result = await GitHubToken.findOneAndDelete({ 
                userId: new Types.ObjectId(userId) 
            });

            if (!result) {
                throw new Error('No token found to remove');
            }

        } catch (error) {
            throw new Error(`Failed to remove token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Updates an existing token for a user
     */
    static async updateToken(userId: string, newToken: string): Promise<void> {
        try {
            // Validate the new token first
            const validation = await GitHubService.validateToken(newToken);
            if (!validation.isValid) {
                throw new Error(validation.error || 'New token validation failed');
            }

            // Encrypt the new token
            const encryptedToken = await EncryptionService.encrypt(newToken);
            const tokenHash = EncryptionService.createHash(newToken);

            // Update the existing token document
            const result = await GitHubToken.findOneAndUpdate(
                { userId: new Types.ObjectId(userId) },
                {
                    encryptedToken,
                    tokenHash,
                    scopes: validation.scopes,
                    lastValidated: new Date(),
                    isActive: true,
                    updatedAt: new Date()
                },
                { new: true, upsert: true }
            );

            if (!result) {
                throw new Error('Failed to update token document');
            }

        } catch (error) {
            throw new Error(`Failed to update token: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Gets token information without exposing the actual token
     */
    static async getTokenInfo(userId: string): Promise<TokenInfo> {
        try {
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            if (!tokenDoc) {
                return {
                    hasToken: false,
                    scopes: [],
                    lastValidated: new Date(0),
                    isActive: false
                };
            }

            // Decrypt token only to create masked version
            const decryptedToken = await EncryptionService.decrypt(tokenDoc.encryptedToken);

            return {
                hasToken: true,
                maskedToken: TokenService.maskToken(decryptedToken),
                scopes: tokenDoc.scopes,
                lastValidated: tokenDoc.lastValidated,
                isActive: tokenDoc.isActive
            };

        } catch (error) {
            return {
                hasToken: false,
                scopes: [],
                lastValidated: new Date(0),
                isActive: false
            };
        }
    }

    /**
     * Checks if a user has a valid token
     */
    static async hasValidToken(userId: string): Promise<boolean> {
        try {
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            return !!tokenDoc;

        } catch (error) {
            return false;
        }
    }

    /**
     * Gets a token for making authenticated requests (with automatic validation)
     */
    static async getTokenForRequest(userId: string): Promise<string | null> {
        try {
            const token = await TokenService.getToken(userId);
            if (!token) {
                return null;
            }

            // Check if token was validated recently (within last hour)
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            if (!tokenDoc) {
                return null;
            }

            const oneHourAgo = new Date(Date.now() - 3600000);
            if (tokenDoc.lastValidated < oneHourAgo) {
                // Re-validate the token
                const validation = await GitHubService.validateToken(token);
                
                tokenDoc.lastValidated = new Date();
                tokenDoc.isActive = validation.isValid;
                if (validation.isValid) {
                    tokenDoc.scopes = validation.scopes;
                }
                await tokenDoc.save();

                if (!validation.isValid) {
                    return null;
                }
            }

            return token;

        } catch (error) {
            return null;
        }
    }

    /**
     * Masks a token for display purposes
     */
    private static maskToken(token: string): string {
        if (token.length <= 8) {
            return '*'.repeat(token.length);
        }
        
        const prefix = token.substring(0, 4);
        const suffix = token.substring(token.length - 4);
        const middle = '*'.repeat(token.length - 8);
        
        return `${prefix}${middle}${suffix}`;
    }

    /**
     * Validates that a token hash matches the stored hash (for verification without decryption)
     */
    static async verifyTokenHash(userId: string, tokenToVerify: string): Promise<boolean> {
        try {
            const tokenDoc = await GitHubToken.findOne({ 
                userId: new Types.ObjectId(userId), 
                isActive: true 
            });

            if (!tokenDoc) {
                return false;
            }

            const hashToVerify = EncryptionService.createHash(tokenToVerify);
            return hashToVerify === tokenDoc.tokenHash;

        } catch (error) {
            return false;
        }
    }

    /**
     * Gets all users who have active tokens (for admin purposes)
     */
    static async getUsersWithTokens(): Promise<string[]> {
        try {
            const tokenDocs = await GitHubToken.find({ isActive: true }).select('userId');
            return tokenDocs.map(doc => doc.userId.toString());

        } catch (error) {
            return [];
        }
    }
}

export default TokenService;