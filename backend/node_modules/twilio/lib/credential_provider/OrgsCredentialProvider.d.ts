import CredentialProvider from "./CredentialProvider";
import TokenManager from "../http/bearer_token/TokenManager";
import AuthStrategy from "../auth_strategy/AuthStrategy";
declare class OrgsCredentialProvider extends CredentialProvider {
    grantType: string;
    clientId: string;
    clientSecret: string;
    tokenManager: TokenManager | null;
    constructor();
    toAuthStrategy(): AuthStrategy;
}
declare namespace OrgsCredentialProvider {
    class OrgsCredentialProviderBuilder {
        private readonly instance;
        constructor();
        setClientId(clientId: string): OrgsCredentialProviderBuilder;
        setClientSecret(clientSecret: string): OrgsCredentialProviderBuilder;
        setTokenManager(tokenManager: TokenManager): OrgsCredentialProviderBuilder;
        build(): OrgsCredentialProvider;
    }
}
export = OrgsCredentialProvider;
