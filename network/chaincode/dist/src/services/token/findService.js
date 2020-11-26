"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFindService = void 0;
const Joi = require("joi");
const errors_1 = require("../../errors");
class TokenFindService {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Joi.object().keys({
            symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
        });
    }
    async call(symbol) {
        this.validate(symbol);
        return await this.find(symbol);
    }
    validate(symbol) {
        const result = this.schema.validate({ symbol }, { abortEarly: false });
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
}
exports.TokenFindService = TokenFindService;
//# sourceMappingURL=findService.js.map