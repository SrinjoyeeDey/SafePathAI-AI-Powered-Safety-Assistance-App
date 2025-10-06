import { inspect, InspectOptions } from "util";
import V2 from "../V2";
/**
 * Rate limit request schema
 */
export declare class RateLimitRequest {
    /**
     * Limit of requests for the bucket
     */
    "limit"?: number;
    /**
     * Time to live of the rule
     */
    "ttl"?: number;
}
/**
 * Options to pass to update a BucketInstance
 */
export interface BucketContextUpdateOptions {
    /**  */
    rateLimitRequest?: RateLimitRequest;
}
export interface BucketContext {
    /**
     * Remove a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    fetch(callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Update a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    update(callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Update a BucketInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    update(params: RateLimitRequest, headers?: any, callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface BucketContextSolution {
    field: string;
    bucket: string;
}
export declare class BucketContextImpl implements BucketContext {
    protected _version: V2;
    protected _solution: BucketContextSolution;
    protected _uri: string;
    constructor(_version: V2, field: string, bucket: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    fetch(callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    update(params?: RateLimitRequest | ((error: Error | null, item?: BucketInstance) => any), headers?: any, callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): BucketContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface BucketResource {
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
export declare class BucketInstance {
    protected _version: V2;
    protected _solution: BucketContextSolution;
    protected _context?: BucketContext;
    constructor(_version: V2, payload: BucketResource, field?: string, bucket?: string);
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
     * Remove a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Fetch a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    fetch(callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Update a BucketInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    update(callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Update a BucketInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed BucketInstance
     */
    update(params: RateLimitRequest, headers?: any, callback?: (error: Error | null, item?: BucketInstance) => any): Promise<BucketInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
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
export interface BucketSolution {
}
export interface BucketListInstance {
    _version: V2;
    _solution: BucketSolution;
    _uri: string;
    (field: string, bucket: string): BucketContext;
    get(field: string, bucket: string): BucketContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function BucketListInstance(version: V2): BucketListInstance;
export {};
