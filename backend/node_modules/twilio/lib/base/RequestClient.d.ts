import { HttpMethod } from "../interfaces";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Response from "../http/response";
import Request, { Headers } from "../http/request";
import AuthStrategy from "../auth_strategy/AuthStrategy";
import { ValidationClientOptions } from "./ValidationClient";
declare class RequestClient {
    defaultTimeout: number;
    axios: AxiosInstance;
    lastResponse?: Response<any>;
    lastRequest?: Request<any>;
    autoRetry: boolean;
    maxRetryDelay: number;
    maxRetries: number;
    keepAlive: boolean;
    /**
     * Make http request
     * @param opts - The options passed to https.Agent
     * @param opts.timeout - https.Agent timeout option. Used as the socket timeout, AND as the default request timeout.
     * @param opts.keepAlive - https.Agent keepAlive option
     * @param opts.keepAliveMsecs - https.Agent keepAliveMsecs option
     * @param opts.maxSockets - https.Agent maxSockets option
     * @param opts.maxTotalSockets - https.Agent maxTotalSockets option
     * @param opts.maxFreeSockets - https.Agent maxFreeSockets option
     * @param opts.scheduling - https.Agent scheduling option
     * @param opts.autoRetry - Enable auto-retry requests with exponential backoff on 429 responses. Defaults to false.
     * @param opts.maxRetryDelay - Max retry delay in milliseconds for 429 Too Many Request response retries. Defaults to 3000.
     * @param opts.maxRetries - Max number of request retries for 429 Too Many Request responses. Defaults to 3.
     * @param opts.validationClient - Validation client for PKCV
     */
    constructor(opts?: RequestClient.RequestClientOptions);
    /**
     * Make http request
     * @param opts - The options argument
     * @param opts.method - The http method
     * @param opts.uri - The request uri
     * @param opts.username - The username used for auth
     * @param opts.password - The password used for auth
     * @param opts.authStrategy - The authStrategy for API call
     * @param opts.headers - The request headers
     * @param opts.params - The request params
     * @param opts.data - The request data
     * @param opts.timeout - The request timeout in milliseconds (default 30000)
     * @param opts.allowRedirects - Should the client follow redirects
     * @param opts.forever - Set to true to use the forever-agent
     * @param opts.logLevel - Show debug logs
     */
    request<TData>(opts: RequestClient.RequestOptions<TData>): Promise<Response<TData>>;
    filterLoggingHeaders(headers: Headers): string[];
    /**
     * ValidationInterceptor adds the Twilio-Client-Validation header to the request
     * @param validationClient - The validation client for PKCV
     * <p>Usage Example:</p>
     * ```javascript
     * import axios from "axios";
     * // Initialize validation client with credentials
     * const validationClient = {
     *           accountSid: "ACXXXXXXXXXXXXXXXX",
     *           credentialSid: "CRXXXXXXXXXXXXXXXX",
     *           signingKey: "SKXXXXXXXXXXXXXXXX",
     *           privateKey: "private key",
     *           algorithm: "PS256",
     *         }
     * // construct an axios instance
     * const instance = axios.create();
     * instance.interceptors.request.use(
     *   ValidationInterceptor(opts.validationClient)
     * );
     * ```
     */
    validationInterceptor(validationClient: ValidationClientOptions): (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig<any>;
    private logRequest;
}
declare namespace RequestClient {
    interface RequestOptions<TData = any, TParams = object> {
        /**
         * The HTTP method
         */
        method: HttpMethod;
        /**
         * The request URI
         */
        uri: string;
        /**
         * The username used for auth
         */
        username?: string;
        /**
         * The password used for auth
         */
        password?: string;
        /**
         * The AuthStrategy for API Call
         */
        authStrategy?: AuthStrategy;
        /**
         * The request headers
         */
        headers?: Headers;
        /**
         * The object of params added as query string to the request
         */
        params?: TParams;
        /**
         * The form data that should be submitted
         */
        data?: TData;
        /**
         * The request timeout in milliseconds
         */
        timeout?: number;
        /**
         * Should the client follow redirects
         */
        allowRedirects?: boolean;
        /**
         * Set to true to use the forever-agent
         */
        forever?: boolean;
        /**
         * Set to 'debug' to enable debug logging
         */
        logLevel?: string;
    }
    interface RequestClientOptions {
        /**
         * A timeout in milliseconds. This will be used as the HTTPS agent's socket
         * timeout, AND as the default request timeout.
         */
        timeout?: number;
        /**
         * https.Agent keepAlive option
         */
        keepAlive?: boolean;
        /**
         * https.Agent keepAliveMSecs option
         */
        keepAliveMsecs?: number;
        /**
         * https.Agent maxSockets option
         */
        maxSockets?: number;
        /**
         * https.Agent maxTotalSockets option
         */
        maxTotalSockets?: number;
        /**
         * https.Agent maxFreeSockets option
         */
        maxFreeSockets?: number;
        /**
         * https.Agent scheduling option
         */
        scheduling?: "fifo" | "lifo" | undefined;
        /**
         * The private CA certificate bundle (if private SSL certificate)
         */
        ca?: string | Buffer;
        /**
         * Enable auto-retry with exponential backoff when receiving 429 Errors from
         * the API. Disabled by default.
         */
        autoRetry?: boolean;
        /**
         * Maximum retry delay in milliseconds for 429 Error response retries.
         * Defaults to 3000.
         */
        maxRetryDelay?: number;
        /**
         * Maximum number of request retries for 429 Error responses. Defaults to 3.
         */
        maxRetries?: number;
        /**
         * Validation client for Public Key Client Validation
         * On setting this with your credentials, Twilio validates:
         <ul>
            <li>The request comes from a sender who is in control of the private key.</li>
            <li>The message has not been modified in transit.</li>
         </ul>
         * That the message has not been modified in transit.
         * Refer our doc for details - https://www.twilio.com/docs/iam/pkcv
         */
        validationClient?: ValidationClientOptions;
    }
}
export = RequestClient;
