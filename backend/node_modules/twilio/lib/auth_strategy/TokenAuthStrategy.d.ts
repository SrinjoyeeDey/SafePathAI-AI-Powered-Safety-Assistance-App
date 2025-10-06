import AuthStrategy from "./AuthStrategy";
import TokenManager from "../http/bearer_token/TokenManager";
export default class TokenAuthStrategy extends AuthStrategy {
    private token;
    private tokenManager;
    constructor(tokenManager: TokenManager);
    getAuthString(): Promise<string>;
    requiresAuthentication(): boolean;
    fetchToken(): Promise<string>;
    /**
     * Function to check if the token is expired with a buffer of 30 seconds.
     * @param token - The JWT token as a string.
     * @returns Boolean indicating if the token is expired.
     */
    isTokenExpired(token: string): boolean;
}
