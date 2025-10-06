"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Twilio_1 = __importDefault(require("./rest/Twilio"));
const webhooks = __importStar(require("./webhooks/webhooks"));
const RequestClient_1 = __importDefault(require("./base/RequestClient"));
const RestException_1 = __importDefault(require("./base/RestException"));
const AccessToken_1 = __importDefault(require("./jwt/AccessToken"));
const ValidationToken_1 = __importDefault(require("./jwt/validation/ValidationToken"));
const ClientCapability_1 = __importDefault(require("./jwt/ClientCapability"));
const TaskRouterCapability_1 = __importDefault(require("./jwt/taskrouter/TaskRouterCapability"));
const taskRouterUtil = __importStar(require("./jwt/taskrouter/util"));
const VoiceResponse_1 = __importDefault(require("./twiml/VoiceResponse"));
const MessagingResponse_1 = __importDefault(require("./twiml/MessagingResponse"));
const FaxResponse_1 = __importDefault(require("./twiml/FaxResponse"));
const ClientCredentialProvider_1 = __importDefault(require("./credential_provider/ClientCredentialProvider"));
const NoAuthCredentialProvider_1 = __importDefault(require("./credential_provider/NoAuthCredentialProvider"));
const OrgsCredentialProvider_1 = __importDefault(require("./credential_provider/OrgsCredentialProvider"));
// Shorthand to automatically create a RestClient
function TwilioSDK(accountSid, authToken, opts) {
    return new TwilioSDK.Twilio(accountSid, authToken, opts);
}
(function (TwilioSDK) {
    TwilioSDK.Twilio = Twilio_1.default;
    let jwt;
    (function (jwt) {
        jwt.AccessToken = AccessToken_1.default;
        jwt.ValidationToken = ValidationToken_1.default;
        jwt.ClientCapability = ClientCapability_1.default;
        let taskrouter;
        (function (taskrouter) {
            taskrouter.TaskRouterCapability = TaskRouterCapability_1.default;
            taskrouter.util = taskRouterUtil;
        })(taskrouter = jwt.taskrouter || (jwt.taskrouter = {}));
    })(jwt = TwilioSDK.jwt || (TwilioSDK.jwt = {}));
    let twiml;
    (function (twiml) {
        twiml.VoiceResponse = VoiceResponse_1.default;
        twiml.MessagingResponse = MessagingResponse_1.default;
        twiml.FaxResponse = FaxResponse_1.default;
    })(twiml = TwilioSDK.twiml || (TwilioSDK.twiml = {}));
    TwilioSDK.RequestClient = RequestClient_1.default;
    TwilioSDK.RestException = RestException_1.default;
    TwilioSDK.ClientCredentialProviderBuilder = ClientCredentialProvider_1.default.ClientCredentialProviderBuilder;
    TwilioSDK.OrgsCredentialProviderBuilder = OrgsCredentialProvider_1.default.OrgsCredentialProviderBuilder;
    TwilioSDK.NoAuthCredentialProvider = NoAuthCredentialProvider_1.default.NoAuthCredentialProvider;
    TwilioSDK.validateBody = webhooks.validateBody;
    TwilioSDK.validateRequest = webhooks.validateRequest;
    TwilioSDK.validateRequestWithBody = webhooks.validateRequestWithBody;
    TwilioSDK.validateExpressRequest = webhooks.validateExpressRequest;
    TwilioSDK.validateIncomingRequest = webhooks.validateIncomingRequest;
    TwilioSDK.getExpectedBodyHash = webhooks.getExpectedBodyHash;
    TwilioSDK.getExpectedTwilioSignature = webhooks.getExpectedTwilioSignature;
    TwilioSDK.webhook = webhooks.webhook;
})(TwilioSDK || (TwilioSDK = {}));
module.exports = TwilioSDK;
