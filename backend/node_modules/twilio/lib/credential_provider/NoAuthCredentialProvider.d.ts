import CredentialProvider from "./CredentialProvider";
import AuthStrategy from "../auth_strategy/AuthStrategy";
declare namespace NoAuthCredentialProvider {
    class NoAuthCredentialProvider extends CredentialProvider {
        constructor();
        toAuthStrategy(): AuthStrategy;
    }
}
export = NoAuthCredentialProvider;
