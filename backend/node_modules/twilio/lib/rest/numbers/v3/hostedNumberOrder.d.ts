import { inspect, InspectOptions } from "util";
import V3 from "../V3";
import { PhoneNumberCapabilities } from "../../../interfaces";
export type HostedNumberOrderStatus = "twilio-processing" | "received" | "pending-verification" | "verified" | "pending-loa" | "carrier-processing" | "testing" | "completed" | "failed" | "action-required";
export type HostedNumberOrderVerificationType = "phone-call" | "phone-bill";
/**
 * Options to pass to create a HostedNumberOrderInstance
 */
export interface HostedNumberOrderListInstanceCreateOptions {
    /** The number to host in [+E.164](https://en.wikipedia.org/wiki/E.164) format */
    phoneNumber: string;
    /** Used to specify that the SMS capability will be hosted on Twilio\\\'s platform. */
    smsCapability: boolean;
    /** This defaults to the AccountSid of the authorization the user is using. This can be provided to specify a subaccount to add the HostedNumberOrder to. */
    accountSid?: string;
    /** A 64 character string that is a human readable text that describes this resource. */
    friendlyName?: string;
    /** Optional. Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID. */
    uniqueName?: string;
    /** Optional. A list of emails that the LOA document for this HostedNumberOrder will be carbon copied to. */
    ccEmails?: Array<string>;
    /** The URL that Twilio should request when somebody sends an SMS to the phone number. This will be copied onto the IncomingPhoneNumber resource. */
    smsUrl?: string;
    /** The HTTP method that should be used to request the SmsUrl. Must be either `GET` or `POST`.  This will be copied onto the IncomingPhoneNumber resource. */
    smsMethod?: string;
    /** A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by SmsUrl. This will be copied onto the IncomingPhoneNumber resource. */
    smsFallbackUrl?: string;
    /** The HTTP method that should be used to request the SmsFallbackUrl. Must be either `GET` or `POST`. This will be copied onto the IncomingPhoneNumber resource. */
    smsFallbackMethod?: string;
    /** Optional. The Status Callback URL attached to the IncomingPhoneNumber resource. */
    statusCallbackUrl?: string;
    /** Optional. The Status Callback Method attached to the IncomingPhoneNumber resource. */
    statusCallbackMethod?: string;
    /** Optional. The 34 character sid of the application Twilio should use to handle SMS messages sent to this number. If a `SmsApplicationSid` is present, Twilio will ignore all of the SMS urls above and use those set on the application. */
    smsApplicationSid?: string;
    /** Optional. A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number. */
    addressSid?: string;
    /** Optional. Email of the owner of this phone number that is being hosted. */
    email?: string;
    /**  */
    verificationType?: HostedNumberOrderVerificationType;
    /** Optional. The unique sid identifier of the Identity Document that represents the document for verifying ownership of the number to be hosted. Required when VerificationType is phone-bill. */
    verificationDocumentSid?: string;
}
export interface HostedNumberOrderSolution {
}
export interface HostedNumberOrderListInstance {
    _version: V3;
    _solution: HostedNumberOrderSolution;
    _uri: string;
    /**
     * Create a HostedNumberOrderInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed HostedNumberOrderInstance
     */
    create(params: HostedNumberOrderListInstanceCreateOptions, callback?: (error: Error | null, item?: HostedNumberOrderInstance) => any): Promise<HostedNumberOrderInstance>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function HostedNumberOrderListInstance(version: V3): HostedNumberOrderListInstance;
interface HostedNumberOrderResource {
    sid: string;
    accountSid: string;
    incomingPhoneNumberSid: string;
    addressSid: string;
    signingDocumentSid: string;
    phoneNumber: string;
    capabilities: PhoneNumberCapabilities;
    friendlyName: string;
    uniqueName: string;
    status: HostedNumberOrderStatus;
    failureReason: string;
    dateCreated: Date;
    dateUpdated: Date;
    verificationAttempts: number;
    email: string;
    ccEmails: Array<string>;
    url: string;
    verificationType: HostedNumberOrderVerificationType;
    verificationDocumentSid: string;
    extension: string;
    callDelay: number;
    verificationCode: string;
    verificationCallSids: Array<string>;
}
export declare class HostedNumberOrderInstance {
    protected _version: V3;
    constructor(_version: V3, payload: HostedNumberOrderResource);
    /**
     * A 34 character string that uniquely identifies this HostedNumberOrder.
     */
    sid: string;
    /**
     * A 34 character string that uniquely identifies the account.
     */
    accountSid: string;
    /**
     * A 34 character string that uniquely identifies the [IncomingPhoneNumber](https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource) resource that represents the phone number being hosted.
     */
    incomingPhoneNumberSid: string;
    /**
     * A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number.
     */
    addressSid: string;
    /**
     * A 34 character string that uniquely identifies the [Authorization Document](https://www.twilio.com/docs/phone-numbers/hosted-numbers/hosted-numbers-api/authorization-document-resource) the user needs to sign.
     */
    signingDocumentSid: string;
    /**
     * Phone number to be hosted. This must be in [E.164](https://en.wikipedia.org/wiki/E.164) format, e.g., +16175551212
     */
    phoneNumber: string;
    capabilities: PhoneNumberCapabilities;
    /**
     * A 64 character string that is a human-readable text that describes this resource.
     */
    friendlyName: string;
    /**
     * Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID.
     */
    uniqueName: string;
    status: HostedNumberOrderStatus;
    /**
     * A message that explains why a hosted_number_order went to status \"action-required\"
     */
    failureReason: string;
    /**
     * The date this resource was created, given as [GMT RFC 2822](http://www.ietf.org/rfc/rfc2822.txt) format.
     */
    dateCreated: Date;
    /**
     * The date that this resource was updated, given as [GMT RFC 2822](http://www.ietf.org/rfc/rfc2822.txt) format.
     */
    dateUpdated: Date;
    /**
     * The number of attempts made to verify ownership of the phone number that is being hosted.
     */
    verificationAttempts: number;
    /**
     * Email of the owner of this phone number that is being hosted.
     */
    email: string;
    /**
     * A list of emails that LOA document for this HostedNumberOrder will be carbon copied to.
     */
    ccEmails: Array<string>;
    /**
     * The URL of this HostedNumberOrder.
     */
    url: string;
    verificationType: HostedNumberOrderVerificationType;
    /**
     * A 34 character string that uniquely identifies the Identity Document resource that represents the document for verifying ownership of the number to be hosted.
     */
    verificationDocumentSid: string;
    /**
     * A numerical extension to be used when making the ownership verification call.
     */
    extension: string;
    /**
     * A value between 0-30 specifying the number of seconds to delay initiating the ownership verification call.
     */
    callDelay: number;
    /**
     * A verification code provided in the response for a user to enter when they pick up the phone call.
     */
    verificationCode: string;
    /**
     * A list of 34 character strings that are unique identifiers for the calls placed as part of ownership verification.
     */
    verificationCallSids: Array<string>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        sid: string;
        accountSid: string;
        incomingPhoneNumberSid: string;
        addressSid: string;
        signingDocumentSid: string;
        phoneNumber: string;
        capabilities: PhoneNumberCapabilities;
        friendlyName: string;
        uniqueName: string;
        status: HostedNumberOrderStatus;
        failureReason: string;
        dateCreated: Date;
        dateUpdated: Date;
        verificationAttempts: number;
        email: string;
        ccEmails: string[];
        url: string;
        verificationType: HostedNumberOrderVerificationType;
        verificationDocumentSid: string;
        extension: string;
        callDelay: number;
        verificationCode: string;
        verificationCallSids: string[];
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
