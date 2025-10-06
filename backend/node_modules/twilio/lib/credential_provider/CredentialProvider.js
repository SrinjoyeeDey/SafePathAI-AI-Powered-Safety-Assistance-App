"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CredentialProvider {
    constructor(authType) {
        this.authType = authType;
    }
    getAuthType() {
        return this.authType;
    }
}
exports.default = CredentialProvider;
