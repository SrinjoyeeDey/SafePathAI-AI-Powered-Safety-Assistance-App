declare class RequestCanonicalizer {
    method: string;
    uri: string;
    queryParams: Record<string, string>;
    requestBody: any;
    headers: Record<string, string>;
    constructor(method: string, uri: string, queryParams: Record<string, string>, requestBody: any, headers: Record<string, string>);
    getCanonicalizedMethod(): string;
    customEncode(str: string): string;
    ASCIICompare(a: string, b: string): number;
    getCanonicalizedPath(): string;
    getCanonicalizedQueryParams(): string;
    getCanonicalizedHeaders(): string;
    getCanonicalizedHashedHeaders(): string;
    getCanonicalizedRequestBody(): string;
    sha256Hex(body: string): string;
    getCanonicalizedRequestString(): string;
    create(): string;
}
export default RequestCanonicalizer;
