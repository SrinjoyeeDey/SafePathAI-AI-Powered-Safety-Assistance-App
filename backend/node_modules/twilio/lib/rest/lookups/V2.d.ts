import LookupsBase from "../LookupsBase";
import Version from "../../base/Version";
import { BucketListInstance } from "./v2/bucket";
import { LookupOverrideListInstance } from "./v2/lookupOverride";
import { PhoneNumberListInstance } from "./v2/phoneNumber";
import { QueryListInstance } from "./v2/query";
import { RateLimitListInstance } from "./v2/rateLimit";
export default class V2 extends Version {
    /**
     * Initialize the V2 version of Lookups
     *
     * @param domain - The Twilio (Twilio.Lookups) domain
     */
    constructor(domain: LookupsBase);
    /** bucket - { Twilio.Lookups.V2.BucketListInstance } resource */
    protected _bucket?: BucketListInstance;
    /** lookupOverrides - { Twilio.Lookups.V2.LookupOverrideListInstance } resource */
    protected _lookupOverrides?: LookupOverrideListInstance;
    /** phoneNumbers - { Twilio.Lookups.V2.PhoneNumberListInstance } resource */
    protected _phoneNumbers?: PhoneNumberListInstance;
    /** query - { Twilio.Lookups.V2.QueryListInstance } resource */
    protected _query?: QueryListInstance;
    /** rateLimits - { Twilio.Lookups.V2.RateLimitListInstance } resource */
    protected _rateLimits?: RateLimitListInstance;
    /** Getter for bucket resource */
    get bucket(): BucketListInstance;
    /** Getter for lookupOverrides resource */
    get lookupOverrides(): LookupOverrideListInstance;
    /** Getter for phoneNumbers resource */
    get phoneNumbers(): PhoneNumberListInstance;
    /** Getter for query resource */
    get query(): QueryListInstance;
    /** Getter for rateLimits resource */
    get rateLimits(): RateLimitListInstance;
}
