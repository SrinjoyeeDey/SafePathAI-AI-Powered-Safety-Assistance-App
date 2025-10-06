import { inspect, InspectOptions } from "util";
import V2 from "../V2";
/**
 * Options to pass to create a TypingIndicatorInstance
 */
export interface TypingIndicatorListInstanceCreateOptions {
    /** Shared channel identifier */
    channel: string;
    /** Message SID that identifies the conversation thread for the typing indicator. Must be a valid Twilio Message SID (SM*) or Media SID (MM*) from an existing WhatsApp conversation.  */
    messageId: string;
}
export interface TypingIndicatorSolution {
}
export interface TypingIndicatorListInstance {
    _version: V2;
    _solution: TypingIndicatorSolution;
    _uri: string;
    /**
     * Create a TypingIndicatorInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypingIndicatorInstance
     */
    create(params: TypingIndicatorListInstanceCreateOptions, callback?: (error: Error | null, item?: TypingIndicatorInstance) => any): Promise<TypingIndicatorInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TypingIndicatorListInstance(version: V2): TypingIndicatorListInstance;
interface TypingIndicatorResource {
    success: boolean;
}
export declare class TypingIndicatorInstance {
    protected _version: V2;
    constructor(_version: V2, payload: TypingIndicatorResource);
    /**
     * Indicates if the typing indicator was sent successfully.
     */
    success: boolean;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        success: boolean;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
