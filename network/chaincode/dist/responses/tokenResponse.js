"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenResponse = void 0;
const successResponse_1 = require("./successResponse");
class TokenResponse extends successResponse_1.SuccessResponse {
    constructor(token) {
        super({
            symbol: token.symbol,
            name: token.name,
            decimals: token.decimals,
            totalSupply: token.totalSupply.toString(),
            owner: token.owner,
            mined: token.mined,
        });
    }
}
exports.TokenResponse = TokenResponse;
//# sourceMappingURL=tokenResponse.js.map