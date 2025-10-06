"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthStrategy {
    constructor(authType) {
        this.authType = authType;
    }
    getAuthType() {
        return this.authType;
    }
}
exports.default = AuthStrategy;
