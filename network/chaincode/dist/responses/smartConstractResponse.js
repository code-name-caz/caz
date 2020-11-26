"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractResponse = void 0;
class SmartContractResponse {
    constructor(success, code, message, result = {}, errors = {}) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.result = result;
        this.errors = errors;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toString() {
        return this.toJson();
    }
}
exports.SmartContractResponse = SmartContractResponse;
//# sourceMappingURL=smartConstractResponse.js.map