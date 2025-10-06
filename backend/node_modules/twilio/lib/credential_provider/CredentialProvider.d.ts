import AuthStrategy from "../auth_strategy/AuthStrategy";
export default abstract class CredentialProvider {
    private authType;
    protected constructor(authType: string);
    getAuthType(): string;
    abstract toAuthStrategy(): AuthStrategy;
}
