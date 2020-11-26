"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGetBalanceService = void 0;
const bignumber_js_1 = require("bignumber.js");
const Joi = require("joi");
const errors_1 = require("../../errors");
class TokenGetBalanceService {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Joi.object().keys({
            symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
            address: Joi.string().hex().length(40).required(),
        });
    }
    async call(symbol, address) {
        this.validate(symbol, address);
        const token = await this.find(symbol);
        return this.balance(token, address);
    }
    validate(symbol, address) {
        const result = this.schema.validate({ symbol, address }, { abortEarly: false });
        if (result.error) {
            throw new errors_1.ValidationError(result.error);
        }
    }
    async find(symbol) {
        const token = await this.ctx.tokenRepository.find(symbol);
        if (!token) {
            throw new errors_1.TokenNotFoundError();
        }
        return token;
    }
    async balance(token, address) {
        const outputs = await this.ctx.unspentTxOutputRepository.select(token.symbol, address);
        return outputs.reduce((a, out) => a.plus(out.amount), new bignumber_js_1.default(0));
    }
}
exports.TokenGetBalanceService = TokenGetBalanceService;
//# sourceMappingURL=getBalanceService.js.map