"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMinedError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class TokenMinedError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.tokenMinedError, 'Token already mined');
        super(response.toJson());
    }
}
exports.TokenMinedError = TokenMinedError;
//# sourceMappingURL=tokenMinedError.js.map