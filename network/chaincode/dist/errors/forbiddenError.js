"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class ForbiddenError extends Error {
    constructor() {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.forbiddenError, 'Forbidden');
        super(response.toJson());
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbiddenError.js.map