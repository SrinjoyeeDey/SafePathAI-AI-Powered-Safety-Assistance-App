import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
/**
 * Options to pass to fetch a EncryptedSentencesInstance
 */
export interface EncryptedSentencesContextFetchOptions {
    /** Grant access to PII Redacted/Unredacted Sentences. If redaction is enabled, the default is `true` to access redacted sentences. */
    redacted?: boolean;
}
export interface EncryptedSentencesContext {
    /**
     * Fetch a EncryptedSentencesInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedSentencesInstance
     */
    fetch(callback?: (error: Error | null, item?: EncryptedSentencesInstance) => any): Promise<EncryptedSentencesInstance>;
    /**
     * Fetch a EncryptedSentencesInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedSentencesInstance
     */
    fetch(params: EncryptedSentencesContextFetchOptions, callback?: (error: Error | null, item?: EncryptedSentencesInstance) => any): Promise<EncryptedSentencesInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface EncryptedSentencesContextSolution {
    transcriptSid: string;
}
export declare class EncryptedSentencesContextImpl implements EncryptedSentencesContext {
    protected _version: V2;
    protected _solution: EncryptedSentencesContextSolution;
    protected _uri: string;
    constructor(_version: V2, transcriptSid: string);
    fetch(params?: EncryptedSentencesContextFetchOptions | ((error: Error | null, item?: EncryptedSentencesInstance) => any), callback?: (error: Error | null, item?: EncryptedSentencesInstance) => any): Promise<EncryptedSentencesInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): EncryptedSentencesContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface EncryptedSentencesResource {
    location: string;
    transcript_sid: string;
    url: string;
}
export declare class EncryptedSentencesInstance {
    protected _version: V2;
    protected _solution: EncryptedSentencesContextSolution;
    protected _context?: EncryptedSentencesContext;
    constructor(_version: V2, payload: EncryptedSentencesResource, transcriptSid: string);
    /**
     * The location of the encrypted sentences.
     */
    location: string;
    transcriptSid: string;
    url: string;
    private get _proxy();
    /**
     * Fetch a EncryptedSentencesInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedSentencesInstance
     */
    fetch(callback?: (error: Error | null, item?: EncryptedSentencesInstance) => any): Promise<EncryptedSentencesInstance>;
    /**
     * Fetch a EncryptedSentencesInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed EncryptedSentencesInstance
     */
    fetch(params: EncryptedSentencesContextFetchOptions, callback?: (error: Error | null, item?: EncryptedSentencesInstance) => any): Promise<EncryptedSentencesInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        location: string;
        transcriptSid: string;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface EncryptedSentencesSolution {
    transcriptSid: string;
}
export interface EncryptedSentencesListInstance {
    _version: V2;
    _solution: EncryptedSentencesSolution;
    _uri: string;
    (): EncryptedSentencesContext;
    get(): EncryptedSentencesContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function EncryptedSentencesListInstance(version: V2, transcriptSid: string): EncryptedSentencesListInstance;
export {};
