import OauthBase from "../OauthBase";
import Version from "../../base/Version";
import { TokenListInstance } from "./v2/token";
export default class V2 extends Version {
    /**
     * Initialize the V2 version of Oauth
     *
     * @param domain - The Twilio (Twilio.Oauth) domain
     */
    constructor(domain: OauthBase);
    /** token - { Twilio.Oauth.V2.TokenListInstance } resource */
    protected _token?: TokenListInstance;
    /** Getter for token resource */
    get token(): TokenListInstance;
}
