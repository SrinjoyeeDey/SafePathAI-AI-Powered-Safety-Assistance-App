import PreviewIamBase from "../PreviewIamBase";
import Version from "../../base/Version";
import { AuthorizeListInstance } from "./v1/authorize";
import { TokenListInstance } from "./v1/token";
export default class V1 extends Version {
    /**
     * Initialize the V1 version of PreviewIam
     *
     * @param domain - The Twilio (Twilio.PreviewIam) domain
     */
    constructor(domain: PreviewIamBase);
    /** authorize - { Twilio.PreviewIam.V1.AuthorizeListInstance } resource */
    protected _authorize?: AuthorizeListInstance;
    /** token - { Twilio.PreviewIam.V1.TokenListInstance } resource */
    protected _token?: TokenListInstance;
    /** Getter for authorize resource */
    get authorize(): AuthorizeListInstance;
    /** Getter for token resource */
    get token(): TokenListInstance;
}
