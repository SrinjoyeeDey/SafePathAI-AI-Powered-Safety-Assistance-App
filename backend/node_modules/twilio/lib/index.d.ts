import ITwilio from "./rest/Twilio";
import * as webhooks from "./webhooks/webhooks";
import IRequestClient from "./base/RequestClient";
import type { ClientOpts as IClientOpts } from "./base/BaseTwilio";
import IRestException from "./base/RestException";
import IAccessToken from "./jwt/AccessToken";
import IValidationToken from "./jwt/validation/ValidationToken";
import IClientCapability from "./jwt/ClientCapability";
import ITaskRouterCapability from "./jwt/taskrouter/TaskRouterCapability";
import * as taskRouterUtil from "./jwt/taskrouter/util";
import IVoiceResponse from "./twiml/VoiceResponse";
import IMessagingResponse from "./twiml/MessagingResponse";
import IFaxResponse from "./twiml/FaxResponse";
import IClientCredentialProvider from "./credential_provider/ClientCredentialProvider";
import INoAuthCredentialProvider from "./credential_provider/NoAuthCredentialProvider";
import IOrgsCredentialProvider from "./credential_provider/OrgsCredentialProvider";
declare function TwilioSDK(accountSid?: string, authToken?: string, opts?: IClientOpts): TwilioSDK.Twilio;
declare namespace TwilioSDK {
    type Twilio = ITwilio;
    const Twilio: typeof ITwilio;
    namespace jwt {
        type AccessToken = IAccessToken;
        const AccessToken: typeof IAccessToken;
        type ValidationToken = IValidationToken;
        const ValidationToken: typeof IValidationToken;
        type ClientCapability = IClientCapability;
        const ClientCapability: typeof IClientCapability;
        namespace taskrouter {
            type TaskRouterCapability = ITaskRouterCapability;
            const TaskRouterCapability: typeof ITaskRouterCapability;
            const util: typeof taskRouterUtil;
        }
    }
    namespace twiml {
        type VoiceResponse = IVoiceResponse;
        const VoiceResponse: typeof IVoiceResponse;
        type MessagingResponse = IMessagingResponse;
        const MessagingResponse: typeof IMessagingResponse;
        type FaxResponse = IFaxResponse;
        const FaxResponse: typeof IFaxResponse;
    }
    type RequestClient = IRequestClient;
    const RequestClient: typeof IRequestClient;
    type RestException = IRestException;
    const RestException: typeof IRestException;
    type ClientCredentialProviderBuilder = IClientCredentialProvider.ClientCredentialProviderBuilder;
    const ClientCredentialProviderBuilder: typeof IClientCredentialProvider.ClientCredentialProviderBuilder;
    type OrgsCredentialProviderBuilder = IOrgsCredentialProvider.OrgsCredentialProviderBuilder;
    const OrgsCredentialProviderBuilder: typeof IOrgsCredentialProvider.OrgsCredentialProviderBuilder;
    type NoAuthCredentialProvider = INoAuthCredentialProvider.NoAuthCredentialProvider;
    const NoAuthCredentialProvider: typeof INoAuthCredentialProvider.NoAuthCredentialProvider;
    type validateBody = typeof webhooks.validateBody;
    const validateBody: typeof webhooks.validateBody;
    type validateRequest = typeof webhooks.validateRequest;
    const validateRequest: typeof webhooks.validateRequest;
    type validateRequestWithBody = typeof webhooks.validateRequestWithBody;
    const validateRequestWithBody: typeof webhooks.validateRequestWithBody;
    type validateExpressRequest = typeof webhooks.validateExpressRequest;
    const validateExpressRequest: typeof webhooks.validateExpressRequest;
    type validateIncomingRequest = typeof webhooks.validateIncomingRequest;
    const validateIncomingRequest: typeof webhooks.validateIncomingRequest;
    type getExpectedBodyHash = typeof webhooks.getExpectedBodyHash;
    const getExpectedBodyHash: typeof webhooks.getExpectedBodyHash;
    type getExpectedTwilioSignature = typeof webhooks.getExpectedTwilioSignature;
    const getExpectedTwilioSignature: typeof webhooks.getExpectedTwilioSignature;
    type webhook = typeof webhooks.webhook;
    const webhook: typeof webhooks.webhook;
    type ClientOpts = IClientOpts;
}
export = TwilioSDK;
