"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class InsufficientFundsError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.insufficientFundsError, 'Insufficient funds');
        super(response.toJson());
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
//# sourceMappingURL=insufficientFundsError.js.map