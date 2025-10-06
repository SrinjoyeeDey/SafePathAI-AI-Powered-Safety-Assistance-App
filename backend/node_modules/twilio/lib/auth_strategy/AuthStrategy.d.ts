export default abstract class AuthStrategy {
    private authType;
    protected constructor(authType: string);
    getAuthType(): string;
    abstract getAuthString(): Promise<string>;
    abstract requiresAuthentication(): boolean;
}
