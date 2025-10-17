import TokenService, { TokenInfo, StoredTokenValidation } from '../tokenService';
import GitHubToken from '../../models/GitHubToken';
import EncryptionService from '../encryptionService';
import GitHubService from '../githubService';
import { Types } from 'mongoose';

// Mock dependencies
jest.mock('../../models/GitHubToken');
jest.mock('../encryptionService');
jest.mock('../githubService');

const mockedGitHubToken = GitHubToken as jest.Mocked<typeof GitHubToken>;
const mockedEncryptionService = EncryptionService as jest.Mocked<typeof EncryptionService>;
const mockedGitHubService = GitHubService as jest.Mocked<typeof GitHubService>;

describe('TokenService', () => {
    const mockUserId = '507f1f77bcf86cd799439011';
    const mockToken = 'ghp_1234567890abcdef1234567890abcdef12345678';
    const mockEncryptedToken = 'encrypted_token_data';
    const mockTokenHash = 'hashed_token_value';

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Setup default mocks
        mockedEncryptionService.encrypt.mockResolvedValue(mockEncryptedToken);
        mockedEncryptionService.decrypt.mockResolvedValue(mockToken);
        mockedEncryptionService.createHash.mockReturnValue(mockTokenHash);
        
        mockedGitHubService.validateToken.mockResolvedValue({
            isValid: true,
            scopes: ['read:user', 'repo'],
            rateLimit: { limit: 5000, remaining: 4999, reset: Date.now() + 3600000, used: 1 }
        });
    });

    describe('storeToken', () => {
        it('should store a valid token successfully', async () => {
            const mockSave = jest.fn().mockResolvedValue(true);
            const mockTokenDoc = {
                save: mockSave
            };

            mockedGitHubToken.findOneAndDelete.mockResolvedValue(null);
            (mockedGitHubToken as any).mockImplementation(() => mockTokenDoc);

            await TokenService.storeToken(mockUserId, mockToken);

            expect(mockedGitHubService.validateToken).toHaveBeenCalledWith(mockToken);
            expect(mockedEncryptionService.encrypt).toHaveBeenCalledWith(mockToken);
            expect(mockedEncryptionService.createHash).toHaveBeenCalledWith(mockToken);
            expect(mockedGitHubToken.findOneAndDelete).toHaveBeenCalledWith({
                userId: new Types.ObjectId(mockUserId)
            });
            expect(mockSave).toHaveBeenCalled();
        });

        it('should throw error for invalid token', async () => {
            mockedGitHubService.validateToken.mockResolvedValue({
                isValid: false,
                scopes: [],
                rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                error: 'Invalid token'
            });

            await expect(TokenService.storeToken(mockUserId, mockToken))
                .rejects.toThrow('Failed to store token: Invalid token');
        });
    });

    describe('getToken', () => {
        it('should retrieve and decrypt token successfully', async () => {
            const mockTokenDoc = {
                encryptedToken: mockEncryptedToken
            };

            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.getToken(mockUserId);

            expect(result).toBe(mockToken);
            expect(mockedGitHubToken.findOne).toHaveBeenCalledWith({
                userId: new Types.ObjectId(mockUserId),
                isActive: true
            });
            expect(mockedEncryptionService.decrypt).toHaveBeenCalledWith(mockEncryptedToken);
        });

        it('should return null when no token found', async () => {
            mockedGitHubToken.findOne.mockResolvedValue(null);

            const result = await TokenService.getToken(mockUserId);

            expect(result).toBeNull();
        });
    });

    describe('validateStoredToken', () => {
        it('should validate stored token successfully', async () => {
            const mockTokenDoc = {
                encryptedToken: mockEncryptedToken,
                scopes: ['read:user'],
                lastValidated: new Date(),
                isActive: true,
                save: jest.fn().mockResolvedValue(true)
            };

            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.validateStoredToken(mockUserId);

            expect(result.isValid).toBe(true);
            expect(result.tokenInfo?.hasToken).toBe(true);
            expect(result.tokenInfo?.maskedToken).toBe('ghp_****************************5678');
            expect(mockTokenDoc.save).toHaveBeenCalled();
        });

        it('should return invalid when no token found', async () => {
            mockedGitHubToken.findOne.mockResolvedValue(null);

            const result = await TokenService.validateStoredToken(mockUserId);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('No token found for user');
        });
    });

    describe('removeToken', () => {
        it('should remove token successfully', async () => {
            const mockTokenDoc = { _id: 'some_id' };
            mockedGitHubToken.findOneAndDelete.mockResolvedValue(mockTokenDoc as any);

            await TokenService.removeToken(mockUserId);

            expect(mockedGitHubToken.findOneAndDelete).toHaveBeenCalledWith({
                userId: new Types.ObjectId(mockUserId)
            });
        });

        it('should throw error when no token to remove', async () => {
            mockedGitHubToken.findOneAndDelete.mockResolvedValue(null);

            await expect(TokenService.removeToken(mockUserId))
                .rejects.toThrow('Failed to remove token: No token found to remove');
        });
    });

    describe('updateToken', () => {
        it('should update token successfully', async () => {
            const newToken = 'ghp_new_token_value';
            const mockUpdatedDoc = { _id: 'some_id' };

            mockedEncryptionService.encrypt.mockResolvedValue('new_encrypted_token');
            mockedEncryptionService.createHash.mockReturnValue('new_hash');
            mockedGitHubToken.findOneAndUpdate.mockResolvedValue(mockUpdatedDoc as any);

            await TokenService.updateToken(mockUserId, newToken);

            expect(mockedGitHubService.validateToken).toHaveBeenCalledWith(newToken);
            expect(mockedEncryptionService.encrypt).toHaveBeenCalledWith(newToken);
            expect(mockedGitHubToken.findOneAndUpdate).toHaveBeenCalledWith(
                { userId: new Types.ObjectId(mockUserId) },
                expect.objectContaining({
                    encryptedToken: 'new_encrypted_token',
                    tokenHash: 'new_hash',
                    isActive: true
                }),
                { new: true, upsert: true }
            );
        });

        it('should throw error for invalid new token', async () => {
            mockedGitHubService.validateToken.mockResolvedValue({
                isValid: false,
                scopes: [],
                rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                error: 'Invalid new token'
            });

            await expect(TokenService.updateToken(mockUserId, 'invalid_token'))
                .rejects.toThrow('Failed to update token: Invalid new token');
        });
    });

    describe('getTokenInfo', () => {
        it('should return token info for existing token', async () => {
            const mockTokenDoc = {
                encryptedToken: mockEncryptedToken,
                scopes: ['read:user', 'repo'],
                lastValidated: new Date('2023-01-01'),
                isActive: true
            };

            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.getTokenInfo(mockUserId);

            expect(result.hasToken).toBe(true);
            expect(result.maskedToken).toBe('ghp_****************************5678');
            expect(result.scopes).toEqual(['read:user', 'repo']);
            expect(result.isActive).toBe(true);
        });

        it('should return no token info when no token exists', async () => {
            mockedGitHubToken.findOne.mockResolvedValue(null);

            const result = await TokenService.getTokenInfo(mockUserId);

            expect(result.hasToken).toBe(false);
            expect(result.scopes).toEqual([]);
            expect(result.isActive).toBe(false);
        });
    });

    describe('hasValidToken', () => {
        it('should return true when user has valid token', async () => {
            const mockTokenDoc = { _id: 'some_id' };
            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.hasValidToken(mockUserId);

            expect(result).toBe(true);
        });

        it('should return false when user has no token', async () => {
            mockedGitHubToken.findOne.mockResolvedValue(null);

            const result = await TokenService.hasValidToken(mockUserId);

            expect(result).toBe(false);
        });
    });

    describe('verifyTokenHash', () => {
        it('should verify token hash correctly', async () => {
            const mockTokenDoc = {
                tokenHash: mockTokenHash
            };

            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.verifyTokenHash(mockUserId, mockToken);

            expect(result).toBe(true);
            expect(mockedEncryptionService.createHash).toHaveBeenCalledWith(mockToken);
        });

        it('should return false for incorrect hash', async () => {
            const mockTokenDoc = {
                tokenHash: 'different_hash'
            };

            mockedGitHubToken.findOne.mockResolvedValue(mockTokenDoc as any);

            const result = await TokenService.verifyTokenHash(mockUserId, mockToken);

            expect(result).toBe(false);
        });
    });

    describe('getUsersWithTokens', () => {
        it('should return list of user IDs with active tokens', async () => {
            const mockTokenDocs = [
                { userId: new Types.ObjectId('507f1f77bcf86cd799439011') },
                { userId: new Types.ObjectId('507f1f77bcf86cd799439012') }
            ];

            mockedGitHubToken.find.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockTokenDocs)
            } as any);

            const result = await TokenService.getUsersWithTokens();

            expect(result).toHaveLength(2);
            expect(result[0]).toBe('507f1f77bcf86cd799439011');
            expect(result[1]).toBe('507f1f77bcf86cd799439012');
        });
    });
});