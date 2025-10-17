import { randomBytes } from 'crypto';

/**
 * Utility to generate a secure 256-bit encryption key
 * Run this once to generate a key for GITHUB_TOKEN_ENCRYPTION_KEY
 */
export function generateEncryptionKey(): string {
    return randomBytes(32).toString('hex');
}

// If this file is run directly, generate and print a key
if (require.main === module) {
    console.log('Generated encryption key:');
    console.log(generateEncryptionKey());
    console.log('\nAdd this to your .env file as GITHUB_TOKEN_ENCRYPTION_KEY');
}