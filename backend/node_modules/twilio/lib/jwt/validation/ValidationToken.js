"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const RequestCanonicalizer_1 = __importDefault(require("./RequestCanonicalizer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ValidationToken {
    get accountSid() {
        return this._accountSid;
    }
    get credentialSid() {
        return this._credentialSid;
    }
    get signingKey() {
        return this._signingKey;
    }
    get privateKey() {
        return this._privateKey;
    }
    get algorithm() {
        return this._algorithm;
    }
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
    constructor(opts) {
        if (!opts.accountSid) {
            throw new Error("accountSid is required");
        }
        if (!opts.credentialSid) {
            throw new Error("credentialSid is required");
        }
        if (!opts.signingKey) {
            throw new Error("signingKey is required");
        }
        if (!opts.privateKey) {
            throw new Error("privateKey is required");
        }
        const algorithm = opts.algorithm ?? ValidationToken.DEFAULT_ALGORITHM; // default to RS256;
        if (!ValidationToken.ALGORITHMS.includes(algorithm)) {
            throw new Error("Algorithm not supported. Allowed values are " +
                ValidationToken.ALGORITHMS.join(", "));
        }
        this._accountSid = opts.accountSid;
        this._credentialSid = opts.credentialSid;
        this._signingKey = opts.signingKey;
        this._privateKey = opts.privateKey;
        this._algorithm = algorithm;
        this.ttl = 300;
    }
    /**
     * Generates a `RequestCanonicalizer` instance for the given HTTP request.
     *
     * @param request - The HTTP request object containing details such as headers, URL, method, query parameters, and body.
     * @throws {Error} If the request URL or method is missing.
     * @returns {RequestCanonicalizer} - An instance of `RequestCanonicalizer` initialized with the canonicalized request details.
     */
    getRequestCanonicalizer(request) {
        const headers = request.headers ?? {};
        const requestUrl = request.url;
        const method = request.method;
        const queryParams = request.params;
        const requestBody = request.data;
        if (!requestUrl) {
            throw new Error("Url is required");
        }
        if (!method) {
            throw new Error("Method is required");
        }
        const url = new URL(requestUrl);
        let signedHeaders = {
            host: url.host,
            authorization: headers["Authorization"],
        };
        return new RequestCanonicalizer_1.default(method, url.pathname, queryParams, requestBody, signedHeaders);
    }
    /**
     * Generate a JWT token to include in the request header for PKCV
     * @param request - The request object
     * @returns {string} - The JWT token
     */
    fromHttpRequest(request) {
        try {
            const requestCanonicalizer = this.getRequestCanonicalizer(request);
            const canonicalizedRequest = requestCanonicalizer.create();
            const header = {
                cty: "twilio-pkrv;v=1",
                typ: "JWT",
                alg: this._algorithm,
                kid: this._credentialSid,
            };
            const payload = {
                iss: this._signingKey,
                sub: this._accountSid,
                hrh: requestCanonicalizer.getCanonicalizedHashedHeaders(),
                rqh: canonicalizedRequest,
            };
            return jsonwebtoken_1.default.sign(payload, this._privateKey, {
                header: header,
                algorithm: this._algorithm,
                expiresIn: this.ttl,
            });
        }
        catch (err) {
            throw new Error("Error generating JWT token " + err);
        }
    }
}
ValidationToken.DEFAULT_ALGORITHM = "RS256";
ValidationToken.ALGORITHMS = [
    "RS256",
    "PS256",
];
module.exports = ValidationToken;
