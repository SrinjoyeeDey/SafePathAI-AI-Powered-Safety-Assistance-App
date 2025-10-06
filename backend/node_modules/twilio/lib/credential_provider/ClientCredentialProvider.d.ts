import CredentialProvider from "./CredentialProvider";
import TokenManager from "../http/bearer_token/TokenManager";
import AuthStrategy from "../auth_strategy/AuthStrategy";
declare class ClientCredentialProvider extends CredentialProvider {
    grantType: string;
    clientId: string;
    clientSecret: string;
    tokenManager: TokenManager | null;
    constructor();
    toAuthStrategy(): AuthStrategy;
}
declare namespace ClientCredentialProvider {
    class ClientCredentialProviderBuilder {
        private readonly instance;
        constructor();
        setClientId(clientId: string): ClientCredentialProviderBuilder;
        setClientSecret(clientSecret: string): ClientCredentialProviderBuilder;
        setTokenManager(tokenManager: TokenManager): ClientCredentialProviderBuilder;
        build(): ClientCredentialProvider;
    }
}
export = ClientCredentialProvider;
