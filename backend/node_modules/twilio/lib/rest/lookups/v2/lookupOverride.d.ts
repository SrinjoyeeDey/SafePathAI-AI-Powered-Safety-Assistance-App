import { inspect, InspectOptions } from "util";
import V2 from "../V2";
export declare class OverridesRequest {
    /**
     * The new line type to override the original line type
     */
    "lineType"?: string;
    /**
     * The reason for the override
     */
    "reason"?: string;
}
/**
 * Options to pass to create a LookupOverrideInstance
 */
export interface LookupOverrideContextCreateOptions {
    /**  */
    overridesRequest?: OverridesRequest;
}
/**
 * Options to pass to update a LookupOverrideInstance
 */
export interface LookupOverrideContextUpdateOptions {
    /**  */
    overridesRequest?: OverridesRequest;
}
export interface LookupOverrideContext {
    /**
     * Create a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    create(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Create a LookupOverrideInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    create(params: OverridesRequest, headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Remove a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    fetch(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Update a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    update(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Update a LookupOverrideInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    update(params: OverridesRequest, headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface LookupOverrideContextSolution {
    field: string;
    phoneNumber: string;
}
export declare class LookupOverrideContextImpl implements LookupOverrideContext {
    protected _version: V2;
    protected _solution: LookupOverrideContextSolution;
    protected _uri: string;
    constructor(_version: V2, field: string, phoneNumber: string);
    create(params?: OverridesRequest | ((error: Error | null, item?: LookupOverrideInstance) => any), headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    fetch(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    update(params?: OverridesRequest | ((error: Error | null, item?: LookupOverrideInstance) => any), headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): LookupOverrideContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface LookupOverrideResource {
    phone_number: string;
    original_line_type: string;
    overridden_line_type: string;
    override_reason: string;
    override_timestamp: Date;
    overridden_by_account_sid: string;
    code: number;
    message: string;
    more_info: string;
    status: number;
    field: string;
    limit: number;
    bucket: string;
    owner: string;
    ttl: number;
}
export declare class LookupOverrideInstance {
    protected _version: V2;
    protected _solution: LookupOverrideContextSolution;
    protected _context?: LookupOverrideContext;
    constructor(_version: V2, payload: LookupOverrideResource, field?: string, phoneNumber?: string);
    /**
     * The phone number for which the override was created
     */
    phoneNumber: string;
    /**
     * The original line type
     */
    originalLineType: string;
    /**
     * The new line type after the override
     */
    overriddenLineType: string;
    /**
     * The reason for the override
     */
    overrideReason: string;
    overrideTimestamp: Date;
    /**
     * The Account SID for the user who made the override
     */
    overriddenByAccountSid: string;
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
    /**
     * Limit of requests for the bucket
     */
    field: string;
    /**
     * Limit of requests for the bucket
     */
    limit: number;
    /**
     * Name of the bucket
     */
    bucket: string;
    /**
     * Owner of the rule
     */
    owner: string;
    /**
     * Time to live of the rule
     */
    ttl: number;
    private get _proxy();
    /**
     * Create a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    create(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Create a LookupOverrideInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    create(params: OverridesRequest, headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Remove a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    fetch(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Update a LookupOverrideInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    update(callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Update a LookupOverrideInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed LookupOverrideInstance
     */
    update(params: OverridesRequest, headers?: any, callback?: (error: Error | null, item?: LookupOverrideInstance) => any): Promise<LookupOverrideInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        phoneNumber: string;
        originalLineType: string;
        overriddenLineType: string;
        overrideReason: string;
        overrideTimestamp: Date;
        overriddenByAccountSid: string;
        code: number;
        message: string;
        moreInfo: string;
        status: number;
        field: string;
        limit: number;
        bucket: string;
        owner: string;
        ttl: number;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface LookupOverrideSolution {
}
export interface LookupOverrideListInstance {
    _version: V2;
    _solution: LookupOverrideSolution;
    _uri: string;
    (field: string, phoneNumber: string): LookupOverrideContext;
    get(field: string, phoneNumber: string): LookupOverrideContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function LookupOverrideListInstance(version: V2): LookupOverrideListInstance;
export {};
