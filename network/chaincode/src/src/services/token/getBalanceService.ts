import BigNumber from 'bignumber.js';
import Joi = require('joi');
import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
import { TokenNotFoundError, ValidationError } from '../../errors';

export class TokenGetBalanceService {
  private readonly schema = Joi.object().keys({
    symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
    address: Joi.string().hex().length(40).required(),
  });

  constructor(public ctx: TokenContext) {
  }

  public async call(symbol: string, address: string): Promise<BigNumber> {
    this.validate(symbol, address);

    const token = await this.find(symbol);

    return this.balance(token, address);
  }

  private validate(symbol: string, address: string): void {
    const result = this.schema.validate({ symbol, address }, { abortEarly: false });

    if (result.error) { throw new ValidationError(result.error); }
  }

  private async find(symbol: string): Promise<Token> {
    const token = await this.ctx.tokenRepository.find(symbol);

    if (!token) { throw new TokenNotFoundError(); }

    return token;
  }

  private async balance(token: Token, address: string): Promise<BigNumber> {
    const outputs = await this.ctx.unspentTxOutputRepository.select(token.symbol, address);

    return outputs.reduce((a, out) => a.plus(out.amount), new BigNumber(0));
  }
}
