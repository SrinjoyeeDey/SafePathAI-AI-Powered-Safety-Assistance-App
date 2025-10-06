import Domain from "../base/Domain";
import V1 from "./messaging/V1";
import V2 from "./messaging/V2";
declare class MessagingBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    /**
     * Initialize messaging domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
}
export = MessagingBase;
