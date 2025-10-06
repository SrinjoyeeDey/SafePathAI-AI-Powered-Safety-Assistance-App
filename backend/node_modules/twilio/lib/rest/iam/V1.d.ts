import IamBase from "../IamBase";
import Version from "../../base/Version";
import { ApiKeyListInstance } from "./v1/apiKey";
import { GetApiKeysListInstance } from "./v1/getApiKeys";
import { NewApiKeyListInstance } from "./v1/newApiKey";
import { TokenListInstance } from "./v1/token";
export default class V1 extends Version {
    /**
     * Initialize the V1 version of Iam
     *
     * @param domain - The Twilio (Twilio.Iam) domain
     */
    constructor(domain: IamBase);
    /** apiKey - { Twilio.Iam.V1.ApiKeyListInstance } resource */
    protected _apiKey?: ApiKeyListInstance;
    /** getApiKeys - { Twilio.Iam.V1.GetApiKeysListInstance } resource */
    protected _getApiKeys?: GetApiKeysListInstance;
    /** newApiKey - { Twilio.Iam.V1.NewApiKeyListInstance } resource */
    protected _newApiKey?: NewApiKeyListInstance;
    /** token - { Twilio.Iam.V1.TokenListInstance } resource */
    protected _token?: TokenListInstance;
    /** Getter for apiKey resource */
    get apiKey(): ApiKeyListInstance;
    /** Getter for getApiKeys resource */
    get getApiKeys(): GetApiKeysListInstance;
    /** Getter for newApiKey resource */
    get newApiKey(): NewApiKeyListInstance;
    /** Getter for token resource */
    get token(): TokenListInstance;
}
