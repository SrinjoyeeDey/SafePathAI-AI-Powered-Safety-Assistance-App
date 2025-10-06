"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const PreviewIamBase_1 = __importDefault(require("./PreviewIamBase"));
const Versionless_1 = __importDefault(require("./previewIam/Versionless"));
class PreviewIam extends PreviewIamBase_1.default {
    /**
     * @deprecated - Use v1.tokens instead
     */
    get tokens() {
        console.warn("tokens is deprecated. Use v1.tokens instead.");
        return this.v1.token;
    }
    /**
     * @deprecated - Use v1.authorize instead
     */
    get authorize() {
        console.warn("authorize is deprecated. Use v1.authorize instead.");
        return this.v1.authorize;
    }
    /** Getter for organization resource */
    get organization() {
        this._organization =
            this._organization || new Versionless_1.default(this).organization;
        return this._organization;
    }
}
module.exports = PreviewIam;
