"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class RequestCanonicalizer {
    constructor(method, uri, queryParams, requestBody, headers) {
        this.method = method;
        this.uri = uri;
        this.queryParams = queryParams;
        this.requestBody = requestBody;
        this.headers = headers;
    }
    getCanonicalizedMethod() {
        return this.method.toUpperCase();
    }
    customEncode(str) {
        return encodeURIComponent(decodeURIComponent(str))
            .replace(/\*/g, "%2A")
            .replace(/%7E/g, "~");
    }
    ASCIICompare(a, b) {
        if (a < b)
            return -1;
        return a > b ? 1 : 0;
    }
    getCanonicalizedPath() {
        // Remove query string from path
        const path = this.uri.split("?")[0];
        // Normalize duplicate slashes (but preserve the leading one)
        const normalizedPath = path.replace(/\/+/g, "/");
        // We must preserve slashes (as path delimiters) but encode each segment
        // Split and encode, but first decode each segment to avoid double-encoding
        return normalizedPath
            .split("/")
            .map((segment) => this.customEncode(segment))
            .join("/");
    }
    getCanonicalizedQueryParams() {
        if (!this.queryParams) {
            return "";
        }
        // sort query params on the basis of '{key}={value}'
        const sortedQueryParams = Object.entries(this.queryParams)
            .map(([key, value]) => {
            return `${key}=${value}`;
        })
            .sort((a, b) => this.ASCIICompare(a, b)) // forces ASCII sorting using custom compare
            .map((param) => {
            const [key, value] = param.split("=");
            return `${this.customEncode(key)}=${this.customEncode(value)}`; // encode and concatenate as `key=value`
        });
        return sortedQueryParams.join("&");
    }
    getCanonicalizedHeaders() {
        // sort headers on the basis of '{key}:{value}'
        const sortedHeaders = Object.keys(this.headers)
            .map((key) => {
            if (!this.headers[key]) {
                return `${key.toLowerCase()}:`;
            }
            return `${key.toLowerCase()}:${this.headers[key].trim()}`;
        })
            .sort((a, b) => this.ASCIICompare(a, b)); // forces ASCII sorting using custom compare
        return `${sortedHeaders.join("\n")}\n`;
    }
    getCanonicalizedHashedHeaders() {
        const sortedHeaders = Object.keys(this.headers).sort((a, b) => this.ASCIICompare(a, b)); // forces ASCII sorting using custom compare
        return sortedHeaders.join(";");
    }
    getCanonicalizedRequestBody() {
        if (!this.requestBody) {
            return "";
        }
        if (typeof this.requestBody === "string") {
            return this.sha256Hex(this.requestBody);
        }
        else
            return this.sha256Hex(JSON.stringify(this.requestBody));
    }
    sha256Hex(body) {
        return crypto_1.default.createHash("sha256").update(body).digest("hex");
    }
    getCanonicalizedRequestString() {
        return `${this.getCanonicalizedMethod()}
${this.getCanonicalizedPath()}
${this.getCanonicalizedQueryParams()}
${this.getCanonicalizedHeaders()}
${this.getCanonicalizedHashedHeaders()}
${this.getCanonicalizedRequestBody()}`;
    }
    create() {
        return this.sha256Hex(this.getCanonicalizedRequestString());
    }
}
exports.default = RequestCanonicalizer;
