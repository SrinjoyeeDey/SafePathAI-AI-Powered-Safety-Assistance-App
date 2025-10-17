import EncryptionService from '../encryptionService';

// Mock environment variable
process.env.GITHUB_TOKEN_ENCRYPTION_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2';

describe('EncryptionService', () => {
    const testToken = 'ghp_1234567890abcdef1234567890abcdef12345678';

    test('should encrypt and decrypt successfully', async () => {
        const encrypted = await EncryptionService.encrypt(testToken);
        const decrypted = await EncryptionService.decrypt(encrypted);
        
        expect(decrypted).toBe(testToken);
    });

    test('should produce different encrypted outputs for same input', async () => {
        const encrypted1 = await EncryptionService.encrypt(testToken);
        const encrypted2 = await EncryptionService.encrypt(testToken);
        
        expect(encrypted1).not.toBe(encrypted2);
    });

    test('should create consistent hash for same input', () => {
        const hash1 = EncryptionService.createHash(testToken);
        const hash2 = EncryptionService.createHash(testToken);
        
        expect(hash1).toBe(hash2);
        expect(hash1).toHaveLength(64); // SHA-256 produces 64 character hex string
    });

    test('should validate configuration correctly', () => {
        expect(EncryptionService.validateConfiguration()).toBe(true);
        
        const originalKey = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
        process.env.GITHUB_TOKEN_ENCRYPTION_KEY = 'short';
        expect(EncryptionService.validateConfiguration()).toBe(false);
        
        delete process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
        expect(EncryptionService.validateConfiguration()).toBe(false);
        
        // Restore original key
        process.env.GITHUB_TOKEN_ENCRYPTION_KEY = originalKey;
    });

    test('should throw error when encryption key is missing', async () => {
        const originalKey = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
        delete process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
        
        await expect(EncryptionService.encrypt(testToken)).rejects.toThrow('GITHUB_TOKEN_ENCRYPTION_KEY environment variable is not set');
        
        // Restore original key
        process.env.GITHUB_TOKEN_ENCRYPTION_KEY = originalKey;
    });

    test('should throw error when decrypting invalid data', async () => {
        await expect(EncryptionService.decrypt('invalid-data')).rejects.toThrow('Decryption failed');
    });
});