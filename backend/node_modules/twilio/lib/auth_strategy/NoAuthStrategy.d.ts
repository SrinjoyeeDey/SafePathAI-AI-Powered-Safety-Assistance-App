import AuthStrategy from "./AuthStrategy";
export default class NoAuthStrategy extends AuthStrategy {
    constructor();
    getAuthString(): Promise<string>;
    requiresAuthentication(): boolean;
}
