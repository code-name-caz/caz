"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidReceiverError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class InvalidReceiverError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.invalidReceiverError, 'The sender and receiver are the same person.');
        super(response.toJson());
    }
}
exports.InvalidReceiverError = InvalidReceiverError;
//# sourceMappingURL=invalidReceiverError.js.map