"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureResponse = void 0;
const _1 = require(".");
class FailureResponse extends _1.SmartContractResponse {
    constructor(code, message, errors = {}) {
        super(false, code, message, {}, errors);
    }
}
exports.FailureResponse = FailureResponse;
//# sourceMappingURL=failureResponse.js.map