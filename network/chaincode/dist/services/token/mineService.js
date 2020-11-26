"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMineService = void 0;
const Joi = require("joi");
const unspentTxOutput_1 = require("../../entities/unspentTxOutput");
const errors_1 = require("../../errors");
class TokenMineService {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Joi.object().keys({
            symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
            owner: Joi.string().hex().length(40).required(),
        });
    }
    async call(symbol, owner) {
        this.validate(symbol, owner);
        const token = await this.find(symbol);
        this.authorize(token, owner);
        if (token.mined) {
            throw new errors_1.TokenMinedError();
        }
        await this.mine(token);
    }
    validate(symbol, owner) {
        const result = this.schema.validate({ symbol, owner }, { abortEarly: false });
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
    authorize(token, owner) {
        if (owner !== token.owner) {
            throw new errors_1.ForbiddenError();
        }
    }
    async mine(token) {
        token.mined = true;
        const output = new unspentTxOutput_1.UnspentTxOutput(token.symbol, token.owner, this.ctx.stub.getTxID(), token.totalSupply);
        await this.ctx.tokenRepository.update(token);
        await this.ctx.unspentTxOutputRepository.add(output);
    }
}
exports.TokenMineService = TokenMineService;
//# sourceMappingURL=mineService.js.map