"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CredentialProvider_1 = __importDefault(require("./CredentialProvider"));
const ApiTokenManager_1 = __importDefault(require("../http/bearer_token/ApiTokenManager"));
const TokenAuthStrategy_1 = __importDefault(require("../auth_strategy/TokenAuthStrategy"));
class ClientCredentialProvider extends CredentialProvider_1.default {
    constructor() {
        super("client-credentials");
        this.grantType = "client_credentials";
        this.clientId = "";
        this.clientSecret = "";
        this.tokenManager = null;
    }
    toAuthStrategy() {
        if (this.tokenManager == null) {
            this.tokenManager = new ApiTokenManager_1.default({
                grantType: this.grantType,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
            });
        }
        return new TokenAuthStrategy_1.default(this.tokenManager);
    }
}
(function (ClientCredentialProvider) {
    class ClientCredentialProviderBuilder {
        constructor() {
            this.instance = new ClientCredentialProvider();
        }
        setClientId(clientId) {
            this.instance.clientId = clientId;
            return this;
        }
        setClientSecret(clientSecret) {
            this.instance.clientSecret = clientSecret;
            return this;
        }
        setTokenManager(tokenManager) {
            this.instance.tokenManager = tokenManager;
            return this;
        }
        build() {
            return this.instance;
        }
    }
    ClientCredentialProvider.ClientCredentialProviderBuilder = ClientCredentialProviderBuilder;
})(ClientCredentialProvider || (ClientCredentialProvider = {}));
module.exports = ClientCredentialProvider;
