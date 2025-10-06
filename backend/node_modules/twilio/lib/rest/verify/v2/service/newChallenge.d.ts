import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
export declare class CreatePasskeysChallengeRequest {
    "identity"?: string;
    "factorSid"?: string;
}
/**
 * Options to pass to create a NewChallengeInstance
 */
export interface NewChallengeContextCreateOptions {
    /**  */
    createPasskeysChallengeRequest: CreatePasskeysChallengeRequest;
}
export interface NewChallengeContext {
    /**
     * Create a NewChallengeInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed NewChallengeInstance
     */
    create(params: CreatePasskeysChallengeRequest, headers?: any, callback?: (error: Error | null, item?: NewChallengeInstance) => any): Promise<NewChallengeInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface NewChallengeContextSolution {
    serviceSid: string;
}
export declare class NewChallengeContextImpl implements NewChallengeContext {
    protected _version: V2;
    protected _solution: NewChallengeContextSolution;
    protected _uri: string;
    constructor(_version: V2, serviceSid: string);
    create(params: CreatePasskeysChallengeRequest, headers?: any, callback?: (error: Error | null, item?: NewChallengeInstance) => any): Promise<NewChallengeInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): NewChallengeContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface NewChallengeResource {
    options: Record<string, object>;
    sid: string;
    account_sid: string;
    service_sid: string;
    entity_sid: string;
    identity: string;
    factor_sid: string;
    date_created: Date;
    date_updated: Date;
    date_responded: Date;
    expiration_date: Date;
    status: string;
    responded_reason: string;
    details: any;
    hidden_details: any;
    metadata: any;
    factor_type: string;
    url: string;
    links: Record<string, string>;
}
export declare class NewChallengeInstance {
    protected _version: V2;
    protected _solution: NewChallengeContextSolution;
    protected _context?: NewChallengeContext;
    constructor(_version: V2, payload: NewChallengeResource, serviceSid: string);
    /**
     * An object that contains challenge options. Currently only used for `passkeys`.
     */
    options: Record<string, object>;
    /**
     * A 34 character string that uniquely identifies this Challenge.
     */
    sid: string;
    /**
     * The unique SID identifier of the Account.
     */
    accountSid: string;
    /**
     * The unique SID identifier of the Service.
     */
    serviceSid: string;
    /**
     * The unique SID identifier of the Entity.
     */
    entitySid: string;
    /**
     * Customer unique identity for the Entity owner of the Challenge.
     */
    identity: string;
    /**
     * The unique SID identifier of the Factor.
     */
    factorSid: string;
    /**
     * The date that this Challenge was created, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateCreated: Date;
    /**
     * The date that this Challenge was updated, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateUpdated: Date;
    /**
     * The date that this Challenge was responded, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateResponded: Date;
    /**
     * The date-time when this Challenge expires, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    expirationDate: Date;
    /**
     * The Status of this Challenge. One of `pending`, `expired`, `approved` or `denied`.
     */
    status: string;
    /**
     * Reason for the Challenge to be in certain `status`. One of `none`, `not_needed` or `not_requested`.
     */
    respondedReason: string;
    /**
     * Details provided to give context about the Challenge.
     */
    details: any;
    /**
     * Details provided to give context about the Challenge.
     */
    hiddenDetails: any;
    /**
     * Custom metadata associated with the challenge.
     */
    metadata: any;
    /**
     * The Factor Type of this Challenge. Currently `push` and `totp` are supported.
     */
    factorType: string;
    /**
     * The URL of this resource.
     */
    url: string;
    /**
     * Contains a dictionary of URL links to nested resources of this Challenge.
     */
    links: Record<string, string>;
    private get _proxy();
    /**
     * Create a NewChallengeInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed NewChallengeInstance
     */
    create(params: CreatePasskeysChallengeRequest, headers?: any, callback?: (error: Error | null, item?: NewChallengeInstance) => any): Promise<NewChallengeInstance>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        options: Record<string, object>;
        sid: string;
        accountSid: string;
        serviceSid: string;
        entitySid: string;
        identity: string;
        factorSid: string;
        dateCreated: Date;
        dateUpdated: Date;
        dateResponded: Date;
        expirationDate: Date;
        status: string;
        respondedReason: string;
        details: any;
        hiddenDetails: any;
        metadata: any;
        factorType: string;
        url: string;
        links: Record<string, string>;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface NewChallengeSolution {
    serviceSid: string;
}
export interface NewChallengeListInstance {
    _version: V2;
    _solution: NewChallengeSolution;
    _uri: string;
    (): NewChallengeContext;
    get(): NewChallengeContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function NewChallengeListInstance(version: V2, serviceSid: string): NewChallengeListInstance;
export {};
