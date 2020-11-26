import BigNumber from 'bignumber.js';
import Joi = require('joi');
import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
import { ForbiddenError, TokenExistError, ValidationError } from '../../errors';
import { Roles } from '../../variables';

export class TokenCreateService {
  private readonly schema = Joi.object().keys({
    symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
    name: Joi.string().required(),
    decimals: Joi.number().integer().min(0).max(18).required(),
    totalSupply: Joi.required(),
    owner: Joi.string().hex().length(40).required(),
  });

  constructor(public ctx: TokenContext) {
  }

  public async call(symbol: string, name: string, decimals: number, totalSupply: BigNumber, owner: string): Promise<void> {
    this.validate(symbol, name, decimals, totalSupply, owner);

    this.authorize();

    if (await this.ctx.tokenRepository.find(symbol)) { throw new TokenExistError(); }

    const token = new Token(symbol, name, decimals, totalSupply, owner, false);

    await this.ctx.tokenRepository.add(token);
  }

  private validate(symbol: string, name: string, decimals: number, totalSupply: BigNumber, owner: string): void {
    const result = this.schema.validate({
      symbol, name, decimals, totalSupply, owner,
    }, { abortEarly: false });

    if (result.error) { throw new ValidationError(result.error); }
  }

  private authorize() {
    if (this.ctx.getRole() !== Roles.emitter) {
      throw new ForbiddenError();
    }
  }
}
