import axios, { AxiosResponse, AxiosError } from 'axios';

export interface RateLimit {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
}

export interface TokenValidation {
    isValid: boolean;
    scopes: string[];
    rateLimit: RateLimit;
    error?: string;
}

export interface GitHubUser {
    login: string;
    id: number;
    name: string;
    email: string;
}

export class GitHubService {
    private static readonly BASE_URL = process.env.GITHUB_API_BASE_URL || 'https://api.github.com';
    private static readonly USER_AGENT = 'SafePath-GitHub-Integration/1.0';

    /**
     * Validates a GitHub Personal Access Token
     */
    static async validateToken(token: string): Promise<TokenValidation> {
        try {
            const response = await axios.get(`${GitHubService.BASE_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': GitHubService.USER_AGENT,
                    'Accept': 'application/vnd.github.v3+json'
                },
                timeout: 10000
            });

            // Extract rate limit information from headers
            const rateLimit = GitHubService.extractRateLimit(response);

            // Extract scopes from headers
            const scopes = GitHubService.extractScopes(response);

            return {
                isValid: true,
                scopes,
                rateLimit,
            };

        } catch (error) {
            const axiosError = error as AxiosError;
            
            if (axiosError.response?.status === 401) {
                return {
                    isValid: false,
                    scopes: [],
                    rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                    error: 'Invalid or expired token'
                };
            }

            if (axiosError.response?.status === 403) {
                const rateLimit = GitHubService.extractRateLimit(axiosError.response);
                return {
                    isValid: false,
                    scopes: [],
                    rateLimit,
                    error: 'Token lacks required permissions or rate limit exceeded'
                };
            }

            return {
                isValid: false,
                scopes: [],
                rateLimit: { limit: 60, remaining: 60, reset: Date.now() + 3600000, used: 0 },
                error: `Validation failed: ${axiosError.message}`
            };
        }
    }

    /**
     * Gets current rate limit information
     */
    static async getRateLimit(token?: string): Promise<RateLimit> {
        try {
            const headers: Record<string, string> = {
                'User-Agent': GitHubService.USER_AGENT,
                'Accept': 'application/vnd.github.v3+json'
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get(`${GitHubService.BASE_URL}/rate_limit`, {
                headers,
                timeout: 10000
            });

            const coreRateLimit = response.data.rate;
            return {
                limit: coreRateLimit.limit,
                remaining: coreRateLimit.remaining,
                reset: coreRateLimit.reset * 1000, // Convert to milliseconds
                used: coreRateLimit.limit - coreRateLimit.remaining
            };

        } catch (error) {
            const axiosError = error as AxiosError;
            
            // If we can extract rate limit from error response, use it
            if (axiosError.response) {
                return GitHubService.extractRateLimit(axiosError.response);
            }

            // Default fallback for unauthenticated requests
            return {
                limit: 60,
                remaining: 60,
                reset: Date.now() + 3600000,
                used: 0
            };
        }
    }

    /**
     * Makes an authenticated request to GitHub API
     */
    static async makeAuthenticatedRequest(endpoint: string, token: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any): Promise<any> {
        try {
            const url = endpoint.startsWith('http') ? endpoint : `${GitHubService.BASE_URL}${endpoint}`;
            
            const response = await axios({
                method,
                url,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': GitHubService.USER_AGENT,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                data,
                timeout: 15000
            });

            return {
                data: response.data,
                rateLimit: GitHubService.extractRateLimit(response),
                status: response.status
            };

        } catch (error) {
            const axiosError = error as AxiosError;
            
            if (axiosError.response?.status === 401) {
                throw new Error('Token is invalid or expired');
            }

            if (axiosError.response?.status === 403) {
                const rateLimit = GitHubService.extractRateLimit(axiosError.response);
                if (rateLimit.remaining === 0) {
                    throw new Error(`Rate limit exceeded. Resets at ${new Date(rateLimit.reset).toISOString()}`);
                }
                throw new Error('Insufficient permissions for this operation');
            }

            if (axiosError.response?.status === 404) {
                throw new Error('Resource not found');
            }

            throw new Error(`GitHub API request failed: ${axiosError.message}`);
        }
    }

    /**
     * Gets user information for a given token
     */
    static async getUserInfo(token: string): Promise<GitHubUser> {
        const result = await GitHubService.makeAuthenticatedRequest('/user', token);
        return {
            login: result.data.login,
            id: result.data.id,
            name: result.data.name || result.data.login,
            email: result.data.email || ''
        };
    }

    /**
     * Extracts rate limit information from response headers
     */
    private static extractRateLimit(response: AxiosResponse): RateLimit {
        const limit = parseInt(response.headers['x-ratelimit-limit'] || '60', 10);
        const remaining = parseInt(response.headers['x-ratelimit-remaining'] || '60', 10);
        const reset = parseInt(response.headers['x-ratelimit-reset'] || '0', 10) * 1000; // Convert to milliseconds
        
        return {
            limit,
            remaining,
            reset: reset || (Date.now() + 3600000), // Default to 1 hour from now if no reset time
            used: limit - remaining
        };
    }

    /**
     * Extracts OAuth scopes from response headers
     */
    private static extractScopes(response: AxiosResponse): string[] {
        const scopesHeader = response.headers['x-oauth-scopes'];
        if (!scopesHeader) return [];
        
        return scopesHeader
            .split(',')
            .map((scope: string) => scope.trim())
            .filter((scope: string) => scope.length > 0);
    }

    /**
     * Checks if a token has the required scopes
     */
    static hasRequiredScopes(scopes: string[], requiredScopes: string[]): boolean {
        return requiredScopes.every(required => scopes.includes(required));
    }

    /**
     * Gets the minimum required scopes for basic functionality
     */
    static getMinimumRequiredScopes(): string[] {
        return ['read:user']; // Basic scope for reading user information
    }
}

export default GitHubService;