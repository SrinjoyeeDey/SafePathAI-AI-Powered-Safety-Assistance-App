import { inspect, InspectOptions } from "util";
import V2 from "../V2";
/**
 * Rate limit response schema
 */
export declare class RateLimitResponse {
    /**
     * Limit of requests for the bucket
     */
    "field"?: string;
    /**
     * Limit of requests for the bucket
     */
    "limit"?: number;
    /**
     * Name of the bucket
     */
    "bucket"?: string;
    /**
     * Owner of the rule
     */
    "owner"?: string;
    /**
     * Time to live of the rule
     */
    "ttl"?: number;
}
/**
 * Options to pass to fetch a RateLimitInstance
 */
export interface RateLimitListInstanceFetchOptions {
    /**  */
    fields?: Array<string>;
}
export interface RateLimitSolution {
}
export interface RateLimitListInstance {
    _version: V2;
    _solution: RateLimitSolution;
    _uri: string;
    /**
     * Fetch a RateLimitInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RateLimitInstance
     */
    fetch(callback?: (error: Error | null, item?: RateLimitInstance) => any): Promise<RateLimitInstance>;
    /**
     * Fetch a RateLimitInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RateLimitInstance
     */
    fetch(params: RateLimitListInstanceFetchOptions, callback?: (error: Error | null, item?: RateLimitInstance) => any): Promise<RateLimitInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function RateLimitListInstance(version: V2): RateLimitListInstance;
interface RateLimitResource {
    rate_limits: Array<RateLimitResponse>;
}
export declare class RateLimitInstance {
    protected _version: V2;
    constructor(_version: V2, payload: RateLimitResource);
    rateLimits: Array<RateLimitResponse>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        rateLimits: RateLimitResponse[];
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
