import { ValidationClientOptions } from "../../base/ValidationClient";
import RequestCanonicalizer from "./RequestCanonicalizer";
import jwt, { Algorithm } from "jsonwebtoken";
declare class ValidationToken {
    static readonly DEFAULT_ALGORITHM: "RS256";
    static readonly ALGORITHMS: readonly [jwt.Algorithm, jwt.Algorithm];
    private readonly _accountSid;
    private readonly _credentialSid;
    private readonly _signingKey;
    private readonly _privateKey;
    private readonly _algorithm;
    ttl: number;
    get accountSid(): string;
    get credentialSid(): string;
    get signingKey(): string;
    get privateKey(): string;
    get algorithm(): Algorithm;
    /**
     * @constructor
     * @param opts - The Options used to configure the ValidationToken
     * @param opts.accountSid - The account SID
     * @param opts.credentialSid - The credential SID for public key submitted to Twilio
     * @param opts.signingKey - The signing key
     * @param opts.privateKey - The private key for signing the token
     * @param opts.algorithm - The algorithm to use for signing the token
     * @param opts.ttl - The time to live for the token in seconds
     */
    constructor(opts: ValidationClientOptions);
    /**
     * Generates a `RequestCanonicalizer` instance for the given HTTP request.
     *
     * @param request - The HTTP request object containing details such as headers, URL, method, query parameters, and body.
     * @throws {Error} If the request URL or method is missing.
     * @returns {RequestCanonicalizer} - An instance of `RequestCanonicalizer` initialized with the canonicalized request details.
     */
    getRequestCanonicalizer(request: any): RequestCanonicalizer;
    /**
     * Generate a JWT token to include in the request header for PKCV
     * @param request - The request object
     * @returns {string} - The JWT token
     */
    fromHttpRequest(request: any): string;
}
declare namespace ValidationToken { }
export = ValidationToken;
