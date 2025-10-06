import Domain from "../base/Domain";
import V1 from "./oauth/V1";
import V2 from "./oauth/V2";
declare class OauthBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    /**
     * Initialize oauth domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
}
export = OauthBase;
