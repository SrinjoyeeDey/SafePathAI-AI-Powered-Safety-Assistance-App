import axios from 'axios';
import GitHubService, { RateLimit, TokenValidation } from '../githubService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GitHubService', () => {
    const mockToken = 'ghp_1234567890abcdef1234567890abcdef12345678';
    
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.GITHUB_API_BASE_URL = 'https://api.github.com';
    });

    describe('validateToken', () => {
        it('should validate a valid token successfully', async () => {
            const mockResponse = {
                data: { login: 'testuser', id: 12345 },
                headers: {
                    'x-ratelimit-limit': '5000',
                    'x-ratelimit-remaining': '4999',
                    'x-ratelimit-reset': '1640995200',
                    'x-oauth-scopes': 'read:user, repo'
                },
                status: 200
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await GitHubService.validateToken(mockToken);

            expect(result.isValid).toBe(true);
            expect(result.scopes).toEqual(['read:user', 'repo']);
            expect(result.rateLimit.limit).toBe(5000);
            expect(result.rateLimit.remaining).toBe(4999);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.github.com/user',
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Authorization': `Bearer ${mockToken}`
                    })
                })
            );
        });

        it('should handle invalid token (401)', async () => {
            const mockError = {
                response: { status: 401 }
            };

            mockedAxios.get.mockRejectedValueOnce(mockError);

            const result = await GitHubService.validateToken(mockToken);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Invalid or expired token');
        });

        it('should handle rate limit exceeded (403)', async () => {
            const mockError = {
                response: {
                    status: 403,
                    headers: {
                        'x-ratelimit-limit': '60',
                        'x-ratelimit-remaining': '0',
                        'x-ratelimit-reset': '1640995200'
                    }
                }
            };

            mockedAxios.get.mockRejectedValueOnce(mockError);

            const result = await GitHubService.validateToken(mockToken);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Token lacks required permissions or rate limit exceeded');
            expect(result.rateLimit.remaining).toBe(0);
        });
    });

    describe('getRateLimit', () => {
        it('should get rate limit with token', async () => {
            const mockResponse = {
                data: {
                    rate: {
                        limit: 5000,
                        remaining: 4999,
                        reset: 1640995200
                    }
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await GitHubService.getRateLimit(mockToken);

            expect(result.limit).toBe(5000);
            expect(result.remaining).toBe(4999);
            expect(result.used).toBe(1);
            expect(result.reset).toBe(1640995200000); // Converted to milliseconds
        });

        it('should get rate limit without token', async () => {
            const mockResponse = {
                data: {
                    rate: {
                        limit: 60,
                        remaining: 59,
                        reset: 1640995200
                    }
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await GitHubService.getRateLimit();

            expect(result.limit).toBe(60);
            expect(result.remaining).toBe(59);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.github.com/rate_limit',
                expect.objectContaining({
                    headers: expect.not.objectContaining({
                        'Authorization': expect.any(String)
                    })
                })
            );
        });
    });

    describe('makeAuthenticatedRequest', () => {
        it('should make successful authenticated request', async () => {
            const mockResponse = {
                data: { message: 'success' },
                headers: {
                    'x-ratelimit-limit': '5000',
                    'x-ratelimit-remaining': '4999',
                    'x-ratelimit-reset': '1640995200'
                },
                status: 200
            };

            mockedAxios.mockResolvedValueOnce(mockResponse);

            const result = await GitHubService.makeAuthenticatedRequest('/test', mockToken);

            expect(result.data).toEqual({ message: 'success' });
            expect(result.status).toBe(200);
            expect(result.rateLimit.limit).toBe(5000);
        });

        it('should handle 401 unauthorized', async () => {
            const mockError = {
                response: { status: 401 }
            };

            mockedAxios.mockRejectedValueOnce(mockError);

            await expect(
                GitHubService.makeAuthenticatedRequest('/test', mockToken)
            ).rejects.toThrow('Token is invalid or expired');
        });

        it('should handle 403 rate limit exceeded', async () => {
            const mockError = {
                response: {
                    status: 403,
                    headers: {
                        'x-ratelimit-remaining': '0',
                        'x-ratelimit-reset': '1640995200'
                    }
                }
            };

            mockedAxios.mockRejectedValueOnce(mockError);

            await expect(
                GitHubService.makeAuthenticatedRequest('/test', mockToken)
            ).rejects.toThrow('Rate limit exceeded');
        });
    });

    describe('getUserInfo', () => {
        it('should get user information', async () => {
            const mockResponse = {
                data: {
                    login: 'testuser',
                    id: 12345,
                    name: 'Test User',
                    email: 'test@example.com'
                },
                headers: {
                    'x-ratelimit-limit': '5000',
                    'x-ratelimit-remaining': '4999',
                    'x-ratelimit-reset': '1640995200'
                },
                status: 200
            };

            mockedAxios.mockResolvedValueOnce(mockResponse);

            const result = await GitHubService.getUserInfo(mockToken);

            expect(result.login).toBe('testuser');
            expect(result.id).toBe(12345);
            expect(result.name).toBe('Test User');
            expect(result.email).toBe('test@example.com');
        });
    });

    describe('hasRequiredScopes', () => {
        it('should return true when all required scopes are present', () => {
            const scopes = ['read:user', 'repo', 'write:repo'];
            const required = ['read:user', 'repo'];

            expect(GitHubService.hasRequiredScopes(scopes, required)).toBe(true);
        });

        it('should return false when required scopes are missing', () => {
            const scopes = ['read:user'];
            const required = ['read:user', 'repo'];

            expect(GitHubService.hasRequiredScopes(scopes, required)).toBe(false);
        });
    });

    describe('getMinimumRequiredScopes', () => {
        it('should return minimum required scopes', () => {
            const scopes = GitHubService.getMinimumRequiredScopes();
            expect(scopes).toEqual(['read:user']);
        });
    });
});