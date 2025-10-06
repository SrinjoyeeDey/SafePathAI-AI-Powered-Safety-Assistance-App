import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../../base/Page";
import Response from "../../../../../http/response";
import V2010 from "../../../V2010";
/**
 * The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT.
 */
export type TriggerRecurring = "daily" | "monthly" | "yearly" | "alltime";
/**
 * The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).
 */
export type TriggerTriggerField = "count" | "usage" | "price";
/**
 * Options to pass to update a TriggerInstance
 */
export interface TriggerContextUpdateOptions {
    /** The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`. */
    callbackMethod?: string;
    /** The URL we should call using `callback_method` when the trigger fires. */
    callbackUrl?: string;
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    friendlyName?: string;
}
/**
 * Options to pass to create a TriggerInstance
 */
export interface TriggerListInstanceCreateOptions {
    /** The URL we should call using `callback_method` when the trigger fires. */
    callbackUrl: string;
    /** The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`. */
    triggerValue: string;
    /** The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value. */
    usageCategory: string;
    /** The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`. */
    callbackMethod?: string;
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    friendlyName?: string;
    /**  */
    recurring?: TriggerRecurring;
    /**  */
    triggerBy?: TriggerTriggerField;
}
/**
 * Options to pass to each
 */
export interface TriggerListInstanceEachOptions {
    /** The frequency of recurring UsageTriggers to read. Can be: `daily`, `monthly`, or `yearly` to read recurring UsageTriggers. An empty value or a value of `alltime` reads non-recurring UsageTriggers. */
    recurring?: TriggerRecurring;
    /** The trigger field of the UsageTriggers to read.  Can be: `count`, `usage`, or `price` as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price). */
    triggerBy?: TriggerTriggerField;
    /** The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
    usageCategory?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: TriggerInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface TriggerListInstanceOptions {
    /** The frequency of recurring UsageTriggers to read. Can be: `daily`, `monthly`, or `yearly` to read recurring UsageTriggers. An empty value or a value of `alltime` reads non-recurring UsageTriggers. */
    recurring?: TriggerRecurring;
    /** The trigger field of the UsageTriggers to read.  Can be: `count`, `usage`, or `price` as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price). */
    triggerBy?: TriggerTriggerField;
    /** The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
    usageCategory?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface TriggerListInstancePageOptions {
    /** The frequency of recurring UsageTriggers to read. Can be: `daily`, `monthly`, or `yearly` to read recurring UsageTriggers. An empty value or a value of `alltime` reads non-recurring UsageTriggers. */
    recurring?: TriggerRecurring;
    /** The trigger field of the UsageTriggers to read.  Can be: `count`, `usage`, or `price` as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price). */
    triggerBy?: TriggerTriggerField;
    /** The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
    usageCategory?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface TriggerContext {
    /**
     * Remove a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    fetch(callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Update a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    update(callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Update a TriggerInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    update(params: TriggerContextUpdateOptions, callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface TriggerContextSolution {
    accountSid: string;
    sid: string;
}
export declare class TriggerContextImpl implements TriggerContext {
    protected _version: V2010;
    protected _solution: TriggerContextSolution;
    protected _uri: string;
    constructor(_version: V2010, accountSid: string, sid: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    fetch(callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    update(params?: TriggerContextUpdateOptions | ((error: Error | null, item?: TriggerInstance) => any), callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): TriggerContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface TriggerPayload extends TwilioResponsePayload {
    usage_triggers: TriggerResource[];
}
interface TriggerResource {
    account_sid: string;
    api_version: string;
    callback_method: string;
    callback_url: string;
    current_value: string;
    date_created: Date;
    date_fired: Date;
    date_updated: Date;
    friendly_name: string;
    recurring: TriggerRecurring;
    sid: string;
    trigger_by: TriggerTriggerField;
    trigger_value: string;
    uri: string;
    usage_category: string;
    usage_record_uri: string;
}
export declare class TriggerInstance {
    protected _version: V2010;
    protected _solution: TriggerContextSolution;
    protected _context?: TriggerContext;
    constructor(_version: V2010, payload: TriggerResource, accountSid: string, sid?: string);
    /**
     * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors.
     */
    accountSid: string;
    /**
     * The API version used to create the resource.
     */
    apiVersion: string;
    /**
     * The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`.
     */
    callbackMethod: string;
    /**
     * The URL we call using the `callback_method` when the trigger fires.
     */
    callbackUrl: string;
    /**
     * The current value of the field the trigger is watching.
     */
    currentValue: string;
    /**
     * The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.
     */
    dateCreated: Date;
    /**
     * The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.
     */
    dateFired: Date;
    /**
     * The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format.
     */
    dateUpdated: Date;
    /**
     * The string that you assigned to describe the trigger.
     */
    friendlyName: string;
    recurring: TriggerRecurring;
    /**
     * The unique string that that we created to identify the UsageTrigger resource.
     */
    sid: string;
    triggerBy: TriggerTriggerField;
    /**
     * The value at which the trigger will fire.  Must be a positive, numeric value.
     */
    triggerValue: string;
    /**
     * The URI of the resource, relative to `https://api.twilio.com`.
     */
    uri: string;
    /**
     * The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).
     */
    usageCategory: string;
    /**
     * The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`.
     */
    usageRecordUri: string;
    private get _proxy();
    /**
     * Remove a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    fetch(callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Update a TriggerInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    update(callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Update a TriggerInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    update(params: TriggerContextUpdateOptions, callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        apiVersion: string;
        callbackMethod: string;
        callbackUrl: string;
        currentValue: string;
        dateCreated: Date;
        dateFired: Date;
        dateUpdated: Date;
        friendlyName: string;
        recurring: TriggerRecurring;
        sid: string;
        triggerBy: TriggerTriggerField;
        triggerValue: string;
        uri: string;
        usageCategory: string;
        usageRecordUri: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface TriggerSolution {
    accountSid: string;
}
export interface TriggerListInstance {
    _version: V2010;
    _solution: TriggerSolution;
    _uri: string;
    (sid: string): TriggerContext;
    get(sid: string): TriggerContext;
    /**
     * Create a TriggerInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TriggerInstance
     */
    create(params: TriggerListInstanceCreateOptions, callback?: (error: Error | null, item?: TriggerInstance) => any): Promise<TriggerInstance>;
    /**
     * Streams TriggerInstance records from the API.
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
     * @param { TriggerListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: TriggerInstance, done: (err?: Error) => void) => void): void;
    each(params: TriggerListInstanceEachOptions, callback?: (item: TriggerInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of TriggerInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: TriggerPage) => any): Promise<TriggerPage>;
    /**
     * Lists TriggerInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { TriggerListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: TriggerInstance[]) => any): Promise<TriggerInstance[]>;
    list(params: TriggerListInstanceOptions, callback?: (error: Error | null, items: TriggerInstance[]) => any): Promise<TriggerInstance[]>;
    /**
     * Retrieve a single page of TriggerInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { TriggerListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: TriggerPage) => any): Promise<TriggerPage>;
    page(params: TriggerListInstancePageOptions, callback?: (error: Error | null, items: TriggerPage) => any): Promise<TriggerPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TriggerListInstance(version: V2010, accountSid: string): TriggerListInstance;
export declare class TriggerPage extends Page<V2010, TriggerPayload, TriggerResource, TriggerInstance> {
    /**
     * Initialize the TriggerPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: V2010, response: Response<string>, solution: TriggerSolution);
    /**
     * Build an instance of TriggerInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: TriggerResource): TriggerInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
