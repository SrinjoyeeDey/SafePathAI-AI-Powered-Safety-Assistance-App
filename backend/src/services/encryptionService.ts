import { createCipherGCM, createDecipherGCM, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export interface EncryptionResult {
    encryptedData: string;
    iv: string;
    authTag: string;
}

export class EncryptionService {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly IV_LENGTH = 16; // 128 bits
    private static readonly SALT_LENGTH = 32; // 256 bits
    private static readonly KEY_LENGTH = 32; // 256 bits

    /**
     * Derives a key from the master key using scrypt
     */
    private static async deriveKey(masterKey: string, salt: Buffer): Promise<Buffer> {
        return (await scryptAsync(masterKey, salt, EncryptionService.KEY_LENGTH)) as Buffer;
    }

    /**
     * Encrypts plaintext using AES-256-GCM
     */
    static async encrypt(plaintext: string): Promise<string> {
        try {
            const masterKey = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
            if (!masterKey) {
                throw new Error('GITHUB_TOKEN_ENCRYPTION_KEY environment variable is not set');
            }

            // Generate random salt and IV
            const salt = randomBytes(EncryptionService.SALT_LENGTH);
            const iv = randomBytes(EncryptionService.IV_LENGTH);

            // Derive key from master key and salt
            const key = await EncryptionService.deriveKey(masterKey, salt);

            // Create cipher
            const cipher = createCipherGCM(EncryptionService.ALGORITHM);
            cipher.setAAD(salt); // Use salt as additional authenticated data

            // Initialize cipher with key and IV
            cipher.init(key, iv);

            // Encrypt the data
            let encrypted = cipher.update(plaintext, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            // Get authentication tag
            const authTag = cipher.getAuthTag();

            // Combine salt, iv, authTag, and encrypted data
            const result: EncryptionResult = {
                encryptedData: encrypted,
                iv: iv.toString('hex'),
                authTag: authTag.toString('hex')
            };

            // Return as base64 encoded JSON for storage
            return Buffer.from(JSON.stringify({
                ...result,
                salt: salt.toString('hex')
            })).toString('base64');

        } catch (error) {
            throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Decrypts ciphertext using AES-256-GCM
     */
    static async decrypt(encryptedString: string): Promise<string> {
        try {
            const masterKey = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
            if (!masterKey) {
                throw new Error('GITHUB_TOKEN_ENCRYPTION_KEY environment variable is not set');
            }

            // Parse the encrypted string
            const encryptedData = JSON.parse(Buffer.from(encryptedString, 'base64').toString('utf8'));
            const { encryptedData: encrypted, iv, authTag, salt } = encryptedData;

            // Convert hex strings back to buffers
            const saltBuffer = Buffer.from(salt, 'hex');
            const ivBuffer = Buffer.from(iv, 'hex');
            const authTagBuffer = Buffer.from(authTag, 'hex');

            // Derive key from master key and salt
            const key = await EncryptionService.deriveKey(masterKey, saltBuffer);

            // Create decipher
            const decipher = createDecipherGCM(EncryptionService.ALGORITHM);
            decipher.setAAD(saltBuffer); // Use same salt as AAD
            decipher.setAuthTag(authTagBuffer);

            // Initialize decipher with key and IV
            decipher.init(key, ivBuffer);

            // Decrypt the data
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;

        } catch (error) {
            throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Creates a hash of the plaintext for validation without decryption
     */
    static createHash(plaintext: string): string {
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(plaintext).digest('hex');
    }

    /**
     * Validates that the encryption key is properly configured
     */
    static validateConfiguration(): boolean {
        const masterKey = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
        return !!(masterKey && masterKey.length >= 32);
    }
}

export default EncryptionService;