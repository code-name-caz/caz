"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressResponse = void 0;
const successResponse_1 = require("./successResponse");
class AddressResponse extends successResponse_1.SuccessResponse {
    constructor(address) {
        super({ address });
    }
}
exports.AddressResponse = AddressResponse;
//# sourceMappingURL=addressResponse.js.map