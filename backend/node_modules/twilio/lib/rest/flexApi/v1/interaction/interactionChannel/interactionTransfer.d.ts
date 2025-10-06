import { inspect, InspectOptions } from "util";
import V1 from "../../../V1";
/**
 * The status of the Transfer. Can be: `active`, `completed`, `failed`.
 */
export type InteractionTransferTransferStatus = "active" | "failed" | "completed";
/**
 * The type of the Transfer. Can be: `cold`, `warm`.
 */
export type InteractionTransferTransferType = "warm" | "cold" | "external";
/**
 * Options to pass to update a InteractionTransferInstance
 */
export interface InteractionTransferContextUpdateOptions {
    /**  */
    body?: object;
}
/**
 * Options to pass to create a InteractionTransferInstance
 */
export interface InteractionTransferListInstanceCreateOptions {
    /**  */
    body?: object;
}
export interface InteractionTransferContext {
    /**
     * Fetch a InteractionTransferInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    fetch(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Update a InteractionTransferInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    update(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Update a InteractionTransferInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    update(params: object, headers?: any, callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface InteractionTransferContextSolution {
    interactionSid: string;
    channelSid: string;
    sid: string;
}
export declare class InteractionTransferContextImpl implements InteractionTransferContext {
    protected _version: V1;
    protected _solution: InteractionTransferContextSolution;
    protected _uri: string;
    constructor(_version: V1, interactionSid: string, channelSid: string, sid: string);
    fetch(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    update(params?: object | ((error: Error | null, item?: InteractionTransferInstance) => any), headers?: any, callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): InteractionTransferContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface InteractionTransferResource {
    sid: string;
    instance_sid: string;
    account_sid: string;
    interaction_sid: string;
    channel_sid: string;
    execution_sid: string;
    type: InteractionTransferTransferType;
    status: InteractionTransferTransferStatus;
    from: string;
    to: string;
    note_sid: string;
    summary_sid: string;
    date_created: Date;
    date_updated: Date;
    url: string;
}
export declare class InteractionTransferInstance {
    protected _version: V1;
    protected _solution: InteractionTransferContextSolution;
    protected _context?: InteractionTransferContext;
    constructor(_version: V1, payload: InteractionTransferResource, interactionSid: string, channelSid: string, sid?: string);
    /**
     * The unique string created by Twilio to identify an Interaction Transfer resource.
     */
    sid: string;
    /**
     * The SID of the Instance associated with the Transfer.
     */
    instanceSid: string;
    /**
     * The SID of the Account that created the Transfer.
     */
    accountSid: string;
    /**
     * The Interaction Sid for this channel.
     */
    interactionSid: string;
    /**
     * The Channel Sid for this Transfer.
     */
    channelSid: string;
    /**
     * The Execution SID associated with the Transfer.
     */
    executionSid: string;
    type: InteractionTransferTransferType;
    status: InteractionTransferTransferStatus;
    /**
     * The SID of the Participant initiating the Transfer.
     */
    from: string;
    /**
     * The SID of the Participant receiving the Transfer.
     */
    to: string;
    /**
     * The SID of the Note associated with the Transfer.
     */
    noteSid: string;
    /**
     * The SID of the Summary associated with the Transfer.
     */
    summarySid: string;
    /**
     * The date and time when the Transfer was created.
     */
    dateCreated: Date;
    /**
     * The date and time when the Transfer was last updated.
     */
    dateUpdated: Date;
    url: string;
    private get _proxy();
    /**
     * Fetch a InteractionTransferInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    fetch(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Update a InteractionTransferInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    update(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Update a InteractionTransferInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    update(params: object, headers?: any, callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        instanceSid: string;
        accountSid: string;
        interactionSid: string;
        channelSid: string;
        executionSid: string;
        type: InteractionTransferTransferType;
        status: InteractionTransferTransferStatus;
        from: string;
        to: string;
        noteSid: string;
        summarySid: string;
        dateCreated: Date;
        dateUpdated: Date;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface InteractionTransferSolution {
    interactionSid: string;
    channelSid: string;
}
export interface InteractionTransferListInstance {
    _version: V1;
    _solution: InteractionTransferSolution;
    _uri: string;
    (sid: string): InteractionTransferContext;
    get(sid: string): InteractionTransferContext;
    /**
     * Create a InteractionTransferInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    create(callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Create a InteractionTransferInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed InteractionTransferInstance
     */
    create(params: object, headers?: any, callback?: (error: Error | null, item?: InteractionTransferInstance) => any): Promise<InteractionTransferInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function InteractionTransferListInstance(version: V1, interactionSid: string, channelSid: string): InteractionTransferListInstance;
export {};
