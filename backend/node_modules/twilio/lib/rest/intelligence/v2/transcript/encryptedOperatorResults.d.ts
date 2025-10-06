import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
/**
 * Options to pass to fetch a EncryptedOperatorResultsInstance
 */
export interface EncryptedOperatorResultsContextFetchOptions {
    /** Grant access to PII Redacted/Unredacted Operator Results. If redaction is enabled, the default is `true` to access redacted operator results. */
    redacted?: boolean;
}
export interface EncryptedOperatorResultsContext {
    /**
     * Fetch a EncryptedOperatorResultsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedOperatorResultsInstance
     */
    fetch(callback?: (error: Error | null, item?: EncryptedOperatorResultsInstance) => any): Promise<EncryptedOperatorResultsInstance>;
    /**
     * Fetch a EncryptedOperatorResultsInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedOperatorResultsInstance
     */
    fetch(params: EncryptedOperatorResultsContextFetchOptions, callback?: (error: Error | null, item?: EncryptedOperatorResultsInstance) => any): Promise<EncryptedOperatorResultsInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface EncryptedOperatorResultsContextSolution {
    transcriptSid: string;
}
export declare class EncryptedOperatorResultsContextImpl implements EncryptedOperatorResultsContext {
    protected _version: V2;
    protected _solution: EncryptedOperatorResultsContextSolution;
    protected _uri: string;
    constructor(_version: V2, transcriptSid: string);
    fetch(params?: EncryptedOperatorResultsContextFetchOptions | ((error: Error | null, item?: EncryptedOperatorResultsInstance) => any), callback?: (error: Error | null, item?: EncryptedOperatorResultsInstance) => any): Promise<EncryptedOperatorResultsInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): EncryptedOperatorResultsContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface EncryptedOperatorResultsResource {
    locations: Array<string>;
    transcript_sid: string;
    url: string;
}
export declare class EncryptedOperatorResultsInstance {
    protected _version: V2;
    protected _solution: EncryptedOperatorResultsContextSolution;
    protected _context?: EncryptedOperatorResultsContext;
    constructor(_version: V2, payload: EncryptedOperatorResultsResource, transcriptSid: string);
    /**
     * The locations of the encrypted operator results.
     */
    locations: Array<string>;
    transcriptSid: string;
    url: string;
    private get _proxy();
    /**
     * Fetch a EncryptedOperatorResultsInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedOperatorResultsInstance
     */
    fetch(callback?: (error: Error | null, item?: EncryptedOperatorResultsInstance) => any): Promise<EncryptedOperatorResultsInstance>;
    /**
     * Fetch a EncryptedOperatorResultsInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedOperatorResultsInstance
     */
    fetch(params: EncryptedOperatorResultsContextFetchOptions, callback?: (error: Error | null, item?: EncryptedOperatorResultsInstance) => any): Promise<EncryptedOperatorResultsInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        locations: string[];
        transcriptSid: string;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface EncryptedOperatorResultsSolution {
    transcriptSid: string;
}
export interface EncryptedOperatorResultsListInstance {
    _version: V2;
    _solution: EncryptedOperatorResultsSolution;
    _uri: string;
    (): EncryptedOperatorResultsContext;
    get(): EncryptedOperatorResultsContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function EncryptedOperatorResultsListInstance(version: V2, transcriptSid: string): EncryptedOperatorResultsListInstance;
export {};
