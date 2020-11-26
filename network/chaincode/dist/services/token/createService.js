"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCreateService = void 0;
const Joi = require("joi");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const variables_1 = require("../../variables");
class TokenCreateService {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Joi.object().keys({
            symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
            name: Joi.string().required(),
            decimals: Joi.number().integer().min(0).max(18).required(),
            totalSupply: Joi.required(),
            owner: Joi.string().hex().length(40).required(),
        });
    }
    async call(symbol, name, decimals, totalSupply, owner) {
        this.validate(symbol, name, decimals, totalSupply, owner);
        this.authorize();
        if (await this.ctx.tokenRepository.find(symbol)) {
            throw new errors_1.TokenExistError();
        }
        const token = new entities_1.Token(symbol, name, decimals, totalSupply, owner, false);
        await this.ctx.tokenRepository.add(token);
    }
    validate(symbol, name, decimals, totalSupply, owner) {
        const result = this.schema.validate({
            symbol, name, decimals, totalSupply, owner,
        }, { abortEarly: false });
        if (result.error) {
            throw new errors_1.ValidationError(result.error);
        }
    }
    authorize() {
        if (this.ctx.getRole() !== variables_1.Roles.emitter) {
            throw new errors_1.ForbiddenError();
        }
    }
}
exports.TokenCreateService = TokenCreateService;
//# sourceMappingURL=createService.js.map