import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
export declare class ApprovePasskeysChallengeRequest {
    /**
     * A [base64url](https://base64.guru/standards/base64url) encoded representation of `rawId`.
     */
    "id": string;
    /**
     * The globally unique identifier for this `PublicKeyCredential`.
     */
    "rawId": string;
    /**
     * A string that indicates the mechanism by which the WebAuthn implementation is attached to the authenticator at the time the associated `navigator.credentials.create()` or `navigator.credentials.get()` call completes.
     */
    "authenticatorAttachment": string;
    /**
     * The valid credential types supported by the API. The values of this enumeration are used for versioning the `AuthenticatorAssertion` and `AuthenticatorAttestation` structures according to the type of the authenticator.
     */
    "type"?: string;
    "response": ApprovePasskeysChallengeRequestResponse;
}
/**
 * The result of a WebAuthn authentication via a `navigator.credentials.get()` request, as specified in [AuthenticatorAttestationResponse](https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse).
 */
export declare class ApprovePasskeysChallengeRequestResponse {
    /**
     * The [authenticator data](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Authenticator_data) structure contains information from the authenticator about the processing of a credential creation or authentication request.
     */
    "authenticatorData": string;
    /**
     * This property contains the JSON-compatible serialization of the data passed from the browser to the authenticator in order to generate this credential.
     */
    "clientDataJSON": string;
    /**
     * An assertion signature over `authenticatorData` and `clientDataJSON`. The assertion signature is created with the private key of the key pair that was created during the originating `navigator.credentials.create()` call and verified using the public key of that same key pair.
     */
    "signature": string;
    /**
     * The user handle stored in the authenticator, specified as `user.id` in the options passed to the originating `navigator.credentials.create()` call. This property should contain a base64url-encoded entity SID.
     */
    "userHandle"?: string;
}
/**
 * Options to pass to update a ApproveChallengeInstance
 */
export interface ApproveChallengeListInstanceUpdateOptions {
    /**  */
    approvePasskeysChallengeRequest: ApprovePasskeysChallengeRequest;
}
export interface ApproveChallengeSolution {
    serviceSid: string;
}
export interface ApproveChallengeListInstance {
    _version: V2;
    _solution: ApproveChallengeSolution;
    _uri: string;
    /**
     * Update a ApproveChallengeInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ApproveChallengeInstance
     */
    update(params: ApprovePasskeysChallengeRequest, headers?: any, callback?: (error: Error | null, item?: ApproveChallengeInstance) => any): Promise<ApproveChallengeInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function ApproveChallengeListInstance(version: V2, serviceSid: string): ApproveChallengeListInstance;
interface ApproveChallengeResource {
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
export declare class ApproveChallengeInstance {
    protected _version: V2;
    constructor(_version: V2, payload: ApproveChallengeResource, serviceSid: string);
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
export {};
