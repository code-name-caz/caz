"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const _1 = require(".");
const variables_1 = require("../variables");
class SuccessResponse extends _1.SmartContractResponse {
    constructor(result = {}) {
        super(true, variables_1.ResponseCodes.success, 'OK', result);
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=successResponse.js.map