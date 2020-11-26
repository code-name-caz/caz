"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenNotFoundError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class TokenNotFoundError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.tokenNotFoundError, 'Token not found');
        super(response.toJson());
    }
}
exports.TokenNotFoundError = TokenNotFoundError;
//# sourceMappingURL=tokenNotFoundError.js.map