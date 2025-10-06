"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CredentialProvider_1 = __importDefault(require("./CredentialProvider"));
const NoAuthStrategy_1 = __importDefault(require("../auth_strategy/NoAuthStrategy"));
var NoAuthCredentialProvider;
(function (NoAuthCredentialProvider_1) {
    class NoAuthCredentialProvider extends CredentialProvider_1.default {
        constructor() {
            super("noauth");
        }
        toAuthStrategy() {
            return new NoAuthStrategy_1.default();
        }
    }
    NoAuthCredentialProvider_1.NoAuthCredentialProvider = NoAuthCredentialProvider;
})(NoAuthCredentialProvider || (NoAuthCredentialProvider = {}));
module.exports = NoAuthCredentialProvider;
