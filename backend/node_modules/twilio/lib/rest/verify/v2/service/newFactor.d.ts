import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
export declare class CreateNewPasskeysFactorRequest {
    "friendlyName": string;
    "identity": string;
    "config"?: CreateNewPasskeysFactorRequestConfig;
}
export declare class CreateNewPasskeysFactorRequestConfig {
    "relyingParty"?: CreateNewPasskeysFactorRequestConfigRelyingParty;
    "authenticatorAttachment"?: string;
    "discoverableCredentials"?: string;
    "userVerification"?: string;
}
/**
 * Contains the information of the party requesting the user for authentication
 */
export declare class CreateNewPasskeysFactorRequestConfigRelyingParty {
    "id"?: string;
    "name"?: string;
    "origins"?: Array<string>;
}
/**
 * Options to pass to create a NewFactorInstance
 */
export interface NewFactorListInstanceCreateOptions {
    /**  */
    createNewPasskeysFactorRequest: CreateNewPasskeysFactorRequest;
}
export interface NewFactorSolution {
    serviceSid: string;
}
export interface NewFactorListInstance {
    _version: V2;
    _solution: NewFactorSolution;
    _uri: string;
    /**
     * Create a NewFactorInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed NewFactorInstance
     */
    create(params: CreateNewPasskeysFactorRequest, headers?: any, callback?: (error: Error | null, item?: NewFactorInstance) => any): Promise<NewFactorInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function NewFactorListInstance(version: V2, serviceSid: string): NewFactorListInstance;
interface NewFactorResource {
    sid: string;
    account_sid: string;
    service_sid: string;
    entity_sid: string;
    identity: string;
    binding: any;
    options: any;
    date_created: Date;
    date_updated: Date;
    friendly_name: string;
    status: string;
    factor_type: string;
    config: any;
    metadata: any;
    url: string;
}
export declare class NewFactorInstance {
    protected _version: V2;
    constructor(_version: V2, payload: NewFactorResource, serviceSid: string);
    /**
     * A 34 character string that uniquely identifies this Factor.
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
     * Customer unique identity for the Entity owner of the Factor.
     */
    identity: string;
    /**
     * Contains the `factor_type` specific secret and metadata. The Binding property is ONLY returned upon Factor creation.
     */
    binding: any;
    options: any;
    /**
     * The date that this Factor was created, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateCreated: Date;
    /**
     * The date that this Factor was updated, given in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateUpdated: Date;
    /**
     * The friendly name of this Factor. This can be any string up to 64 characters, meant for humans to distinguish between Factors.
     */
    friendlyName: string;
    /**
     * The Status of this Factor. One of `unverified` or `verified`.
     */
    status: string;
    /**
     * The Type of this Factor. Currently `push` and `totp` are supported.
     */
    factorType: string;
    /**
     * An object that contains configurations specific to a `factor_type`.
     */
    config: any;
    /**
     * Custom metadata associated with the factor.
     */
    metadata: any;
    /**
     * The URL of this resource.
     */
    url: string;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        accountSid: string;
        serviceSid: string;
        entitySid: string;
        identity: string;
        binding: any;
        options: any;
        dateCreated: Date;
        dateUpdated: Date;
        friendlyName: string;
        status: string;
        factorType: string;
        config: any;
        metadata: any;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
