import Joi = require('joi');
import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
import { TokenNotFoundError, ValidationError } from '../../errors';

export class TokenFindService {
  private readonly schema = Joi.object().keys({
    symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
  });

  constructor(public ctx: TokenContext) {
  }

  public async call(symbol: string): Promise<Token> {
    this.validate(symbol);

    return await this.find(symbol);
  }

  private validate(symbol: string): void {
    const result = this.schema.validate({ symbol }, { abortEarly: false });

    if (result.error) { throw new ValidationError(result.error); }
  }

  private async find(symbol: string): Promise<Token> {
    const token = await this.ctx.tokenRepository.find(symbol);

    if (!token) { throw new TokenNotFoundError(); }

    return token;
  }
}
