"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CredentialProvider_1 = __importDefault(require("./CredentialProvider"));
const OrgsTokenManager_1 = __importDefault(require("../http/bearer_token/OrgsTokenManager"));
const TokenAuthStrategy_1 = __importDefault(require("../auth_strategy/TokenAuthStrategy"));
class OrgsCredentialProvider extends CredentialProvider_1.default {
    constructor() {
        super("client-credentials");
        this.grantType = "client_credentials";
        this.clientId = "";
        this.clientSecret = "";
        this.tokenManager = null;
    }
    toAuthStrategy() {
        if (this.tokenManager == null) {
            this.tokenManager = new OrgsTokenManager_1.default({
                grantType: this.grantType,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
            });
        }
        return new TokenAuthStrategy_1.default(this.tokenManager);
    }
}
(function (OrgsCredentialProvider) {
    class OrgsCredentialProviderBuilder {
        constructor() {
            this.instance = new OrgsCredentialProvider();
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
    OrgsCredentialProvider.OrgsCredentialProviderBuilder = OrgsCredentialProviderBuilder;
})(OrgsCredentialProvider || (OrgsCredentialProvider = {}));
module.exports = OrgsCredentialProvider;
