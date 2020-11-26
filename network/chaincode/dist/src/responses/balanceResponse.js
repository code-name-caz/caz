"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceResponse = void 0;
const successResponse_1 = require("./successResponse");
class BalanceResponse extends successResponse_1.SuccessResponse {
    constructor(symbol, balance) {
        super({
            symbol,
            balance: balance.toString(),
        });
    }
}
exports.BalanceResponse = BalanceResponse;
//# sourceMappingURL=balanceResponse.js.map