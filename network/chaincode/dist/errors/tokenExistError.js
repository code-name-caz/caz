"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExistError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class TokenExistError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.tokenExistsError, 'Token already exist');
        super(response.toJson());
    }
}
exports.TokenExistError = TokenExistError;
//# sourceMappingURL=tokenExistError.js.map