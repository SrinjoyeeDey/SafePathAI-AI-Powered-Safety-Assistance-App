import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../../../base/Page";
import Response from "../../../../../../http/response";
import V2010 from "../../../../V2010";
/**
 * Options to pass to each
 */
export interface YesterdayListInstanceEachOptions {
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    startDate?: Date;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    endDate?: Date;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    includeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: YesterdayInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface YesterdayListInstanceOptions {
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    startDate?: Date;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    endDate?: Date;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    includeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface YesterdayListInstancePageOptions {
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    startDate?: Date;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    endDate?: Date;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    includeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface YesterdaySolution {
    accountSid: string;
}
export interface YesterdayListInstance {
    _version: V2010;
    _solution: YesterdaySolution;
    _uri: string;
    /**
     * Streams YesterdayInstance records from the API.
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
     * @param { YesterdayListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: YesterdayInstance, done: (err?: Error) => void) => void): void;
    each(params: YesterdayListInstanceEachOptions, callback?: (item: YesterdayInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of YesterdayInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: YesterdayPage) => any): Promise<YesterdayPage>;
    /**
     * Lists YesterdayInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { YesterdayListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: YesterdayInstance[]) => any): Promise<YesterdayInstance[]>;
    list(params: YesterdayListInstanceOptions, callback?: (error: Error | null, items: YesterdayInstance[]) => any): Promise<YesterdayInstance[]>;
    /**
     * Retrieve a single page of YesterdayInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { YesterdayListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: YesterdayPage) => any): Promise<YesterdayPage>;
    page(params: YesterdayListInstancePageOptions, callback?: (error: Error | null, items: YesterdayPage) => any): Promise<YesterdayPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function YesterdayListInstance(version: V2010, accountSid: string): YesterdayListInstance;
interface YesterdayPayload extends TwilioResponsePayload {
    usage_records: YesterdayResource[];
}
interface YesterdayResource {
    account_sid: string;
    api_version: string;
    as_of: string;
    category: string;
    count: string;
    count_unit: string;
    description: string;
    end_date: Date;
    price: number;
    price_unit: string;
    start_date: Date;
    subresource_uris: Record<string, string>;
    uri: string;
    usage: string;
    usage_unit: string;
}
export declare class YesterdayInstance {
    protected _version: V2010;
    constructor(_version: V2010, payload: YesterdayResource, accountSid: string);
    /**
     * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage.
     */
    accountSid: string;
    /**
     * The API version used to create the resource.
     */
    apiVersion: string;
    /**
     * Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT
     */
    asOf: string;
    /**
     * The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).
     */
    category: string;
    /**
     * The number of usage events, such as the number of calls.
     */
    count: string;
    /**
     * The units in which `count` is measured, such as `calls` for calls or `messages` for SMS.
     */
    countUnit: string;
    /**
     * A plain-language description of the usage category.
     */
    description: string;
    /**
     * The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.
     */
    endDate: Date;
    /**
     * The total price of the usage in the currency specified in `price_unit` and associated with the account.
     */
    price: number;
    /**
     * The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`.
     */
    priceUnit: string;
    /**
     * The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`.
     */
    startDate: Date;
    /**
     * A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources).
     */
    subresourceUris: Record<string, string>;
    /**
     * The URI of the resource, relative to `https://api.twilio.com`.
     */
    uri: string;
    /**
     * The amount used to bill usage and measured in units described in `usage_unit`.
     */
    usage: string;
    /**
     * The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS.
     */
    usageUnit: string;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        apiVersion: string;
        asOf: string;
        category: string;
        count: string;
        countUnit: string;
        description: string;
        endDate: Date;
        price: number;
        priceUnit: string;
        startDate: Date;
        subresourceUris: Record<string, string>;
        uri: string;
        usage: string;
        usageUnit: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export declare class YesterdayPage extends Page<V2010, YesterdayPayload, YesterdayResource, YesterdayInstance> {
    /**
     * Initialize the YesterdayPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: V2010, response: Response<string>, solution: YesterdaySolution);
    /**
     * Build an instance of YesterdayInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: YesterdayResource): YesterdayInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
