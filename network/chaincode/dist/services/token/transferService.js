"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTransferService = void 0;
const bignumber_js_1 = require("bignumber.js");
const Joi = require("joi");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
class TokenTransferService {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Joi.object().keys({
            symbol: Joi.string().uppercase().regex(/^[a-zA-Z]+$/).min(3).max(6).required(),
            amount: Joi.required(),
            from: Joi.string().hex().length(40).required(),
            to: Joi.string().hex().length(40).required(),
        });
    }
    async call(symbol, amount, from, to) {
        this.validate(symbol, amount, from, to);
        const token = await this.find(symbol);
        await this.transfer(token, amount, from, to);
    }
    validate(symbol, amount, from, to) {
        const result = this.schema.validate({
            symbol, amount, from, to,
        }, { abortEarly: false });
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
    async transfer(token, amount, from, to) {
        const outputs = await this.ctx.unspentTxOutputRepository.select(token.symbol, from);
        const balance = outputs.reduce((a, out) => a.plus(out.amount), new bignumber_js_1.default(0));
        const fund = balance.minus(amount);
        if (from === to) {
            throw new errors_1.InvalidReceiverError();
        }
        if (fund.isLessThan(new bignumber_js_1.default(0))) {
            throw new errors_1.InsufficientFundsError();
        }
        outputs.forEach(async (output) => await this.ctx.unspentTxOutputRepository.delete(output));
        await this.ctx.unspentTxOutputRepository.add(new entities_1.UnspentTxOutput(token.symbol, to, this.ctx.stub.getTxID(), amount));
        await this.ctx.unspentTxOutputRepository.add(new entities_1.UnspentTxOutput(token.symbol, from, this.ctx.stub.getTxID(), fund));
    }
}
exports.TokenTransferService = TokenTransferService;
//# sourceMappingURL=transferService.js.map