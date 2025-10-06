import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../base/Page";
import Response from "../../../../http/response";
import V1 from "../../V1";
/**
 * Options to pass to create a DestinationAlphaSenderInstance
 */
export interface DestinationAlphaSenderListInstanceCreateOptions {
    /** The Alphanumeric Sender ID string. Can be up to 11 characters long. Valid characters are A-Z, a-z, 0-9, space, hyphen `-`, plus `+`, underscore `_` and ampersand `&`. This value cannot contain only numbers. */
    alphaSender: string;
    /** The Optional Two Character ISO Country Code the Alphanumeric Sender ID will be used for. If the IsoCountryCode is not provided, a default Alpha Sender will be created that can be used across all countries. */
    isoCountryCode?: string;
}
/**
 * Options to pass to each
 */
export interface DestinationAlphaSenderListInstanceEachOptions {
    /** Optional filter to return only alphanumeric sender IDs associated with the specified two-character ISO country code. */
    isoCountryCode?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: DestinationAlphaSenderInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface DestinationAlphaSenderListInstanceOptions {
    /** Optional filter to return only alphanumeric sender IDs associated with the specified two-character ISO country code. */
    isoCountryCode?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface DestinationAlphaSenderListInstancePageOptions {
    /** Optional filter to return only alphanumeric sender IDs associated with the specified two-character ISO country code. */
    isoCountryCode?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface DestinationAlphaSenderContext {
    /**
     * Remove a DestinationAlphaSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a DestinationAlphaSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DestinationAlphaSenderInstance
     */
    fetch(callback?: (error: Error | null, item?: DestinationAlphaSenderInstance) => any): Promise<DestinationAlphaSenderInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface DestinationAlphaSenderContextSolution {
    serviceSid: string;
    sid: string;
}
export declare class DestinationAlphaSenderContextImpl implements DestinationAlphaSenderContext {
    protected _version: V1;
    protected _solution: DestinationAlphaSenderContextSolution;
    protected _uri: string;
    constructor(_version: V1, serviceSid: string, sid: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    fetch(callback?: (error: Error | null, item?: DestinationAlphaSenderInstance) => any): Promise<DestinationAlphaSenderInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): DestinationAlphaSenderContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface DestinationAlphaSenderPayload extends TwilioResponsePayload {
    alpha_senders: DestinationAlphaSenderResource[];
}
interface DestinationAlphaSenderResource {
    sid: string;
    account_sid: string;
    service_sid: string;
    date_created: Date;
    date_updated: Date;
    alpha_sender: string;
    capabilities: Array<string>;
    url: string;
    iso_country_code: string;
}
export declare class DestinationAlphaSenderInstance {
    protected _version: V1;
    protected _solution: DestinationAlphaSenderContextSolution;
    protected _context?: DestinationAlphaSenderContext;
    constructor(_version: V1, payload: DestinationAlphaSenderResource, serviceSid: string, sid?: string);
    /**
     * The unique string that we created to identify the AlphaSender resource.
     */
    sid: string;
    /**
     * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AlphaSender resource.
     */
    accountSid: string;
    /**
     * The SID of the [Service](https://www.twilio.com/docs/chat/rest/service-resource) the resource is associated with.
     */
    serviceSid: string;
    /**
     * The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateCreated: Date;
    /**
     * The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateUpdated: Date;
    /**
     * The Alphanumeric Sender ID string.
     */
    alphaSender: string;
    /**
     * An array of values that describe whether the number can receive calls or messages. Can be: `SMS`.
     */
    capabilities: Array<string>;
    /**
     * The absolute URL of the AlphaSender resource.
     */
    url: string;
    /**
     * The Two Character ISO Country Code the Alphanumeric Sender ID will be used for. For Default Alpha Senders that work across countries, this value will be an empty string
     */
    isoCountryCode: string;
    private get _proxy();
    /**
     * Remove a DestinationAlphaSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a DestinationAlphaSenderInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DestinationAlphaSenderInstance
     */
    fetch(callback?: (error: Error | null, item?: DestinationAlphaSenderInstance) => any): Promise<DestinationAlphaSenderInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        accountSid: string;
        serviceSid: string;
        dateCreated: Date;
        dateUpdated: Date;
        alphaSender: string;
        capabilities: string[];
        url: string;
        isoCountryCode: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface DestinationAlphaSenderSolution {
    serviceSid: string;
}
export interface DestinationAlphaSenderListInstance {
    _version: V1;
    _solution: DestinationAlphaSenderSolution;
    _uri: string;
    (sid: string): DestinationAlphaSenderContext;
    get(sid: string): DestinationAlphaSenderContext;
    /**
     * Create a DestinationAlphaSenderInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DestinationAlphaSenderInstance
     */
    create(params: DestinationAlphaSenderListInstanceCreateOptions, callback?: (error: Error | null, item?: DestinationAlphaSenderInstance) => any): Promise<DestinationAlphaSenderInstance>;
    /**
     * Streams DestinationAlphaSenderInstance records from the API.
     *
     * This operation lazily loads records as efficiently as possible until the limit
     * is reached.
     *
     * The results are passed into the callback function, so this operation is memory
     * efficient.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { DestinationAlphaSenderListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: DestinationAlphaSenderInstance, done: (err?: Error) => void) => void): void;
    each(params: DestinationAlphaSenderListInstanceEachOptions, callback?: (item: DestinationAlphaSenderInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of DestinationAlphaSenderInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: DestinationAlphaSenderPage) => any): Promise<DestinationAlphaSenderPage>;
    /**
     * Lists DestinationAlphaSenderInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { DestinationAlphaSenderListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: DestinationAlphaSenderInstance[]) => any): Promise<DestinationAlphaSenderInstance[]>;
    list(params: DestinationAlphaSenderListInstanceOptions, callback?: (error: Error | null, items: DestinationAlphaSenderInstance[]) => any): Promise<DestinationAlphaSenderInstance[]>;
    /**
     * Retrieve a single page of DestinationAlphaSenderInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { DestinationAlphaSenderListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: DestinationAlphaSenderPage) => any): Promise<DestinationAlphaSenderPage>;
    page(params: DestinationAlphaSenderListInstancePageOptions, callback?: (error: Error | null, items: DestinationAlphaSenderPage) => any): Promise<DestinationAlphaSenderPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function DestinationAlphaSenderListInstance(version: V1, serviceSid: string): DestinationAlphaSenderListInstance;
export declare class DestinationAlphaSenderPage extends Page<V1, DestinationAlphaSenderPayload, DestinationAlphaSenderResource, DestinationAlphaSenderInstance> {
    /**
     * Initialize the DestinationAlphaSenderPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: V1, response: Response<string>, solution: DestinationAlphaSenderSolution);
    /**
     * Build an instance of DestinationAlphaSenderInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: DestinationAlphaSenderResource): DestinationAlphaSenderInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
