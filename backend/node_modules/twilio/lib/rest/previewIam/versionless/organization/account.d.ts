import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../base/Page";
import Response from "../../../../http/response";
import Versionless from "../../Versionless";
/**
 * Options to pass to each
 */
export interface AccountListInstanceEachOptions {
    /**  */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: AccountInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface AccountListInstanceOptions {
    /**  */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface AccountListInstancePageOptions {
    /**  */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface AccountContext {
    /**
     * Fetch a AccountInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountInstance
     */
    fetch(callback?: (error: Error | null, item?: AccountInstance) => any): Promise<AccountInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface AccountContextSolution {
    organizationSid: string;
    accountSid: string;
}
export declare class AccountContextImpl implements AccountContext {
    protected _version: Versionless;
    protected _solution: AccountContextSolution;
    protected _uri: string;
    constructor(_version: Versionless, organizationSid: string, accountSid: string);
    fetch(callback?: (error: Error | null, item?: AccountInstance) => any): Promise<AccountInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): AccountContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface AccountPayload extends TwilioResponsePayload {
    content: AccountResource[];
}
interface AccountResource {
    account_sid: string;
    friendly_name: string;
    status: string;
    owner_sid: string;
    date_created: Date;
}
/**
 * Page content
 */
export declare class AccountInstance {
    protected _version: Versionless;
    protected _solution: AccountContextSolution;
    protected _context?: AccountContext;
    constructor(_version: Versionless, payload: AccountResource, organizationSid: string, accountSid?: string);
    /**
     * Twilio account sid
     */
    accountSid: string;
    /**
     * Account friendly name
     */
    friendlyName: string;
    /**
     * Account status
     */
    status: string;
    /**
     * Twilio account sid
     */
    ownerSid: string;
    /**
     * The date and time when the account was created in the system
     */
    dateCreated: Date;
    private get _proxy();
    /**
     * Fetch a AccountInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountInstance
     */
    fetch(callback?: (error: Error | null, item?: AccountInstance) => any): Promise<AccountInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        friendlyName: string;
        status: string;
        ownerSid: string;
        dateCreated: Date;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface AccountSolution {
    organizationSid: string;
}
export interface AccountListInstance {
    _version: Versionless;
    _solution: AccountSolution;
    _uri: string;
    (accountSid: string): AccountContext;
    get(accountSid: string): AccountContext;
    /**
     * Streams AccountInstance records from the API.
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
     * @param { AccountListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: AccountInstance, done: (err?: Error) => void) => void): void;
    each(params: AccountListInstanceEachOptions, callback?: (item: AccountInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of AccountInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: AccountPage) => any): Promise<AccountPage>;
    /**
     * Lists AccountInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { AccountListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: AccountInstance[]) => any): Promise<AccountInstance[]>;
    list(params: AccountListInstanceOptions, callback?: (error: Error | null, items: AccountInstance[]) => any): Promise<AccountInstance[]>;
    /**
     * Retrieve a single page of AccountInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { AccountListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: AccountPage) => any): Promise<AccountPage>;
    page(params: AccountListInstancePageOptions, callback?: (error: Error | null, items: AccountPage) => any): Promise<AccountPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function AccountListInstance(version: Versionless, organizationSid: string): AccountListInstance;
export declare class AccountPage extends Page<Versionless, AccountPayload, AccountResource, AccountInstance> {
    /**
     * Initialize the AccountPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: Versionless, response: Response<string>, solution: AccountSolution);
    /**
     * Build an instance of AccountInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: AccountResource): AccountInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
