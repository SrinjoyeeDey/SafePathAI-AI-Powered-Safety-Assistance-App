"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthStrategy_1 = __importDefault(require("./AuthStrategy"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenAuthStrategy extends AuthStrategy_1.default {
    constructor(tokenManager) {
        super("token");
        this.token = "";
        this.tokenManager = tokenManager;
    }
    async getAuthString() {
        return this.fetchToken()
            .then((token) => {
            this.token = token;
            return `Bearer ${this.token}`;
        })
            .catch((error) => {
            throw new Error(`Failed to fetch access token: ${error.message}`);
        });
    }
    requiresAuthentication() {
        return true;
    }
    async fetchToken() {
        if (this.token == null ||
            this.token.length === 0 ||
            this.isTokenExpired(this.token)) {
            return this.tokenManager.fetchToken();
        }
        return Promise.resolve(this.token);
    }
    /**
     * Function to check if the token is expired with a buffer of 30 seconds.
     * @param token - The JWT token as a string.
     * @returns Boolean indicating if the token is expired.
     */
    isTokenExpired(token) {
        try {
            // Decode the token without verifying the signature, as we only want to read the expiration for this check
            const decoded = jsonwebtoken_1.default.decode(token);
            if (!decoded || !decoded.exp) {
                // If the token doesn't have an expiration, consider it expired
                return true;
            }
            const expiresAt = decoded.exp * 1000;
            const bufferMilliseconds = 30 * 1000;
            const bufferExpiresAt = expiresAt - bufferMilliseconds;
            // Return true if the current time is after the expiration time with buffer
            return Date.now() > bufferExpiresAt;
        }
        catch (error) {
            // If there's an error decoding the token, consider it expired
            return true;
        }
    }
}
exports.default = TokenAuthStrategy;
