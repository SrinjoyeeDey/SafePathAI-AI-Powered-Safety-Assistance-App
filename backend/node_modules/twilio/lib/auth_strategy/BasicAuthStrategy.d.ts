import AuthStrategy from "./AuthStrategy";
export default class BasicAuthStrategy extends AuthStrategy {
    private username;
    private password;
    constructor(username: string, password: string);
    getAuthString(): Promise<string>;
    requiresAuthentication(): boolean;
}
