"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const responses_1 = require("../responses");
const variables_1 = require("../variables");
class ValidationError extends Error {
    static formatError(error) {
        return error.details.reduce((p, v) => {
            p[v.path.join('.')] = [v.message.replace(`"${v.context.key}"`, '').trim()];
            return p;
        }, {});
    }
    constructor(error) {
        const response = new responses_1.FailureResponse(variables_1.ResponseCodes.validationError, 'Validation Error', ValidationError.formatError(error));
        super(response.toJson());
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validationError.js.map