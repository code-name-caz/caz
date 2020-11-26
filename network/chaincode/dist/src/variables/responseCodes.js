"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCodes = void 0;
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes[ResponseCodes["success"] = 0] = "success";
    ResponseCodes[ResponseCodes["validationError"] = 1001] = "validationError";
    ResponseCodes[ResponseCodes["tokenExistsError"] = 1002] = "tokenExistsError";
    ResponseCodes[ResponseCodes["tokenNotFoundError"] = 1003] = "tokenNotFoundError";
    ResponseCodes[ResponseCodes["forbiddenError"] = 1004] = "forbiddenError";
    ResponseCodes[ResponseCodes["tokenMinedError"] = 1005] = "tokenMinedError";
    ResponseCodes[ResponseCodes["insufficientFundsError"] = 1006] = "insufficientFundsError";
    ResponseCodes[ResponseCodes["invalidReceiverError"] = 1007] = "invalidReceiverError";
})(ResponseCodes = exports.ResponseCodes || (exports.ResponseCodes = {}));
//# sourceMappingURL=responseCodes.js.map