"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthStrategy_1 = __importDefault(require("./AuthStrategy"));
class NoAuthStrategy extends AuthStrategy_1.default {
    constructor() {
        super("noauth");
    }
    getAuthString() {
        return Promise.resolve("");
    }
    requiresAuthentication() {
        return false;
    }
}
exports.default = NoAuthStrategy;
