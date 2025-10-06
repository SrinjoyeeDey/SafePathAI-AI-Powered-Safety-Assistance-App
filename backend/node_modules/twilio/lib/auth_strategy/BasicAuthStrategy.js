"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthStrategy_1 = __importDefault(require("./AuthStrategy"));
class BasicAuthStrategy extends AuthStrategy_1.default {
    constructor(username, password) {
        super("basic");
        this.username = username;
        this.password = password;
    }
    getAuthString() {
        const auth = Buffer.from(this.username + ":" + this.password).toString("base64");
        return Promise.resolve(`Basic ${auth}`);
    }
    requiresAuthentication() {
        return true;
    }
}
exports.default = BasicAuthStrategy;
