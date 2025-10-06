import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../base/Page";
import Response from "../../../../http/response";
import Versionless from "../../Versionless";
export declare class PublicApiCreateRoleAssignmentRequest {
    /**
     * Twilio Role Sid representing assigned role
     */
    "roleSid": string;
    /**
     * Twilio Sid representing scope of this assignment
     */
    "scope": string;
    /**
     * Twilio Sid representing identity of this assignment
     */
    "identity": string;
}
/**
 * Options to pass to create a RoleAssignmentInstance
 */
export interface RoleAssignmentListInstanceCreateOptions {
    /**  */
    publicApiCreateRoleAssignmentRequest: PublicApiCreateRoleAssignmentRequest;
}
/**
 * Options to pass to each
 */
export interface RoleAssignmentListInstanceEachOptions {
    /**  */
    pageSize?: number;
    /**  */
    identity?: string;
    /**  */
    scope?: string;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: RoleAssignmentInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface RoleAssignmentListInstanceOptions {
    /**  */
    pageSize?: number;
    /**  */
    identity?: string;
    /**  */
    scope?: string;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface RoleAssignmentListInstancePageOptions {
    /**  */
    pageSize?: number;
    /**  */
    identity?: string;
    /**  */
    scope?: string;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface RoleAssignmentContext {
    /**
     * Remove a RoleAssignmentInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface RoleAssignmentContextSolution {
    organizationSid: string;
    sid: string;
}
export declare class RoleAssignmentContextImpl implements RoleAssignmentContext {
    protected _version: Versionless;
    protected _solution: RoleAssignmentContextSolution;
    protected _uri: string;
    constructor(_version: Versionless, organizationSid: string, sid: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): RoleAssignmentContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface RoleAssignmentPayload extends TwilioResponsePayload {
    content: RoleAssignmentResource[];
}
interface RoleAssignmentResource {
    sid: string;
    role_sid: string;
    scope: string;
    identity: string;
    code: number;
    message: string;
    moreInfo: string;
    status: number;
}
export declare class RoleAssignmentInstance {
    protected _version: Versionless;
    protected _solution: RoleAssignmentContextSolution;
    protected _context?: RoleAssignmentContext;
    constructor(_version: Versionless, payload: RoleAssignmentResource, organizationSid: string, sid?: string);
    /**
     * Twilio Role Assignment Sid representing this role assignment
     */
    sid: string;
    /**
     * Twilio Role Sid representing assigned role
     */
    roleSid: string;
    /**
     * Twilio Sid representing identity of this assignment
     */
    scope: string;
    /**
     * Twilio Sid representing scope of this assignment
     */
    identity: string;
    /**
     * Twilio-specific error code
     */
    code: number;
    /**
     * Error message
     */
    message: string;
    /**
     * Link to Error Code References
     */
    moreInfo: string;
    /**
     * HTTP response status code
     */
    status: number;
    private get _proxy();
    /**
     * Remove a RoleAssignmentInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        roleSid: string;
        scope: string;
        identity: string;
        code: number;
        message: string;
        moreInfo: string;
        status: number;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface RoleAssignmentSolution {
    organizationSid: string;
}
export interface RoleAssignmentListInstance {
    _version: Versionless;
    _solution: RoleAssignmentSolution;
    _uri: string;
    (sid: string): RoleAssignmentContext;
    get(sid: string): RoleAssignmentContext;
    /**
     * Create a RoleAssignmentInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RoleAssignmentInstance
     */
    create(params: PublicApiCreateRoleAssignmentRequest, headers?: any, callback?: (error: Error | null, item?: RoleAssignmentInstance) => any): Promise<RoleAssignmentInstance>;
    /**
     * Streams RoleAssignmentInstance records from the API.
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
     * @param { RoleAssignmentListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: RoleAssignmentInstance, done: (err?: Error) => void) => void): void;
    each(params: RoleAssignmentListInstanceEachOptions, callback?: (item: RoleAssignmentInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of RoleAssignmentInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: RoleAssignmentPage) => any): Promise<RoleAssignmentPage>;
    /**
     * Lists RoleAssignmentInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { RoleAssignmentListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: RoleAssignmentInstance[]) => any): Promise<RoleAssignmentInstance[]>;
    list(params: RoleAssignmentListInstanceOptions, callback?: (error: Error | null, items: RoleAssignmentInstance[]) => any): Promise<RoleAssignmentInstance[]>;
    /**
     * Retrieve a single page of RoleAssignmentInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { RoleAssignmentListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: RoleAssignmentPage) => any): Promise<RoleAssignmentPage>;
    page(params: RoleAssignmentListInstancePageOptions, callback?: (error: Error | null, items: RoleAssignmentPage) => any): Promise<RoleAssignmentPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function RoleAssignmentListInstance(version: Versionless, organizationSid: string): RoleAssignmentListInstance;
export declare class RoleAssignmentPage extends Page<Versionless, RoleAssignmentPayload, RoleAssignmentResource, RoleAssignmentInstance> {
    /**
     * Initialize the RoleAssignmentPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: Versionless, response: Response<string>, solution: RoleAssignmentSolution);
    /**
     * Build an instance of RoleAssignmentInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: RoleAssignmentResource): RoleAssignmentInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
