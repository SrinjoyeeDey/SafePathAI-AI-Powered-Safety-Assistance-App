import { inspect, InspectOptions } from "util";
import Page, { TwilioResponsePayload } from "../../../../base/Page";
import Response from "../../../../http/response";
import V1 from "../../V1";
/**
 * The status of the transcriptions resource.
 */
export type TranscriptionsStatus = "started" | "stopped" | "failed";
/**
 * Options to pass to update a TranscriptionsInstance
 */
export interface TranscriptionsContextUpdateOptions {
    /**  */
    status?: TranscriptionsStatus;
}
/**
 * Options to pass to create a TranscriptionsInstance
 */
export interface TranscriptionsListInstanceCreateOptions {
    /** A collection of properties that describe transcription behaviour. */
    configuration?: object;
}
/**
 * Options to pass to each
 */
export interface TranscriptionsListInstanceEachOptions {
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Function to process each record. If this and a positional callback are passed, this one will be used */
    callback?: (item: TranscriptionsInstance, done: (err?: Error) => void) => void;
    /** Function to be called upon completion of streaming */
    done?: Function;
    /** Upper limit for the number of records to return. each() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to list
 */
export interface TranscriptionsListInstanceOptions {
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Upper limit for the number of records to return. list() guarantees never to return more than limit. Default is no limit */
    limit?: number;
}
/**
 * Options to pass to page
 */
export interface TranscriptionsListInstancePageOptions {
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    pageSize?: number;
    /** Page Number, this value is simply for client state */
    pageNumber?: number;
    /** PageToken provided by the API */
    pageToken?: string;
}
export interface TranscriptionsContext {
    /**
     * Fetch a TranscriptionsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    fetch(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Update a TranscriptionsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    update(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Update a TranscriptionsInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    update(params: TranscriptionsContextUpdateOptions, callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface TranscriptionsContextSolution {
    roomSid: string;
    ttid: string;
}
export declare class TranscriptionsContextImpl implements TranscriptionsContext {
    protected _version: V1;
    protected _solution: TranscriptionsContextSolution;
    protected _uri: string;
    constructor(_version: V1, roomSid: string, ttid: string);
    fetch(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    update(params?: TranscriptionsContextUpdateOptions | ((error: Error | null, item?: TranscriptionsInstance) => any), callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): TranscriptionsContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface TranscriptionsPayload extends TwilioResponsePayload {
    transcriptions: TranscriptionsResource[];
}
interface TranscriptionsResource {
    ttid: string;
    account_sid: string;
    room_sid: string;
    status: TranscriptionsStatus;
    date_created: Date;
    date_updated: Date;
    start_time: Date;
    end_time: Date;
    duration: number;
    url: string;
    configuration: Record<string, object>;
}
export declare class TranscriptionsInstance {
    protected _version: V1;
    protected _solution: TranscriptionsContextSolution;
    protected _context?: TranscriptionsContext;
    constructor(_version: V1, payload: TranscriptionsResource, roomSid: string, ttid?: string);
    /**
     * The unique string that we created to identify the transcriptions resource.
     */
    ttid: string;
    /**
     * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Room resource.
     */
    accountSid: string;
    /**
     * The SID of the transcriptions\'s room.
     */
    roomSid: string;
    status: TranscriptionsStatus;
    /**
     * The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateCreated: Date;
    /**
     * The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateUpdated: Date;
    /**
     * The time of transcriptions connected to the room in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format.
     */
    startTime: Date;
    /**
     * The time when the transcriptions disconnected from the room in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format.
     */
    endTime: Date;
    /**
     * The duration in seconds that the transcriptions were `connected`. Populated only after the transcriptions is `stopped`.
     */
    duration: number;
    /**
     * The absolute URL of the resource.
     */
    url: string;
    /**
     * An JSON object that describes the video layout of the composition in terms of regions. See [Specifying Video Layouts](https://www.twilio.com/docs/video/api/compositions-resource#specifying-video-layouts) for more info.
     */
    configuration: Record<string, object>;
    private get _proxy();
    /**
     * Fetch a TranscriptionsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    fetch(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Update a TranscriptionsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    update(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Update a TranscriptionsInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    update(params: TranscriptionsContextUpdateOptions, callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        ttid: string;
        accountSid: string;
        roomSid: string;
        status: TranscriptionsStatus;
        dateCreated: Date;
        dateUpdated: Date;
        startTime: Date;
        endTime: Date;
        duration: number;
        url: string;
        configuration: Record<string, object>;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface TranscriptionsSolution {
    roomSid: string;
}
export interface TranscriptionsListInstance {
    _version: V1;
    _solution: TranscriptionsSolution;
    _uri: string;
    (ttid: string): TranscriptionsContext;
    get(ttid: string): TranscriptionsContext;
    /**
     * Create a TranscriptionsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    create(callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Create a TranscriptionsInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionsInstance
     */
    create(params: TranscriptionsListInstanceCreateOptions, callback?: (error: Error | null, item?: TranscriptionsInstance) => any): Promise<TranscriptionsInstance>;
    /**
     * Streams TranscriptionsInstance records from the API.
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
     * @param { TranscriptionsListInstanceEachOptions } [params] - Options for request
     * @param { function } [callback] - Function to process each record
     */
    each(callback?: (item: TranscriptionsInstance, done: (err?: Error) => void) => void): void;
    each(params: TranscriptionsListInstanceEachOptions, callback?: (item: TranscriptionsInstance, done: (err?: Error) => void) => void): void;
    /**
     * Retrieve a single target page of TranscriptionsInstance records from the API.
     *
     * The request is executed immediately.
     *
     * @param { string } [targetUrl] - API-generated URL for the requested results page
     * @param { function } [callback] - Callback to handle list of records
     */
    getPage(targetUrl: string, callback?: (error: Error | null, items: TranscriptionsPage) => any): Promise<TranscriptionsPage>;
    /**
     * Lists TranscriptionsInstance records from the API as a list.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { TranscriptionsListInstanceOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    list(callback?: (error: Error | null, items: TranscriptionsInstance[]) => any): Promise<TranscriptionsInstance[]>;
    list(params: TranscriptionsListInstanceOptions, callback?: (error: Error | null, items: TranscriptionsInstance[]) => any): Promise<TranscriptionsInstance[]>;
    /**
     * Retrieve a single page of TranscriptionsInstance records from the API.
     *
     * The request is executed immediately.
     *
     * If a function is passed as the first argument, it will be used as the callback
     * function.
     *
     * @param { TranscriptionsListInstancePageOptions } [params] - Options for request
     * @param { function } [callback] - Callback to handle list of records
     */
    page(callback?: (error: Error | null, items: TranscriptionsPage) => any): Promise<TranscriptionsPage>;
    page(params: TranscriptionsListInstancePageOptions, callback?: (error: Error | null, items: TranscriptionsPage) => any): Promise<TranscriptionsPage>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TranscriptionsListInstance(version: V1, roomSid: string): TranscriptionsListInstance;
export declare class TranscriptionsPage extends Page<V1, TranscriptionsPayload, TranscriptionsResource, TranscriptionsInstance> {
    /**
     * Initialize the TranscriptionsPage
     *
     * @param version - Version of the resource
     * @param response - Response from the API
     * @param solution - Path solution
     */
    constructor(version: V1, response: Response<string>, solution: TranscriptionsSolution);
    /**
     * Build an instance of TranscriptionsInstance
     *
     * @param payload - Payload response from the API
     */
    getInstance(payload: TranscriptionsResource): TranscriptionsInstance;
    [inspect.custom](depth: any, options: InspectOptions): string;
}
export {};
