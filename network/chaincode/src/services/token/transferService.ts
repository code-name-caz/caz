import BigNumber from 'bignumber.js';
import Joi = require('joi');
import { TokenContext } from '../../contexts';
import { Token, UnspentTxOutput } from '../../entities';
import { InsufficientFundsError, InvalidReceiverError, TokenNotFoundError, ValidationError } from '../../errors';

export class TokenTransferService {
  private readonly schema = Joi.object().keys({
    symbol: Joi.string().uppercase().regex(/^[a-zA-Z]+$/).min(3).max(6).required(),
    amount: Joi.required(),
    from: Joi.string().hex().length(40).required(),
    to: Joi.string().hex().length(40).required(),
  });

  constructor(public ctx: TokenContext) {
  }

  public async call(symbol: string, amount: BigNumber, from: string, to: string): Promise<void> {
    this.validate(symbol, amount, from, to);
    const token = await this.find(symbol);

    await this.transfer(token, amount, from, to);
  }

  private validate(symbol: string, amount: BigNumber, from: string, to: string): void {
    const result = this.schema.validate({
      symbol, amount, from, to,
    }, { abortEarly: false });

    if (result.error) { throw new ValidationError(result.error); }
  }

  private async find(symbol: string): Promise<Token> {
    const token = await this.ctx.tokenRepository.find(symbol);

    if (!token) { throw new TokenNotFoundError(); }

    return token;
  }

  private async transfer(token: Token, amount: BigNumber, from: string, to: string): Promise<void> {
    const outputs = await this.ctx.unspentTxOutputRepository.select(token.symbol, from);
    const balance = outputs.reduce((a, out) => a.plus(out.amount), new BigNumber(0));
    const fund = balance.minus(amount);

    if (from === to) { throw new InvalidReceiverError(); }
    if (fund.isLessThan(new BigNumber(0))) { throw new InsufficientFundsError(); }

    outputs.forEach(async (output) => await this.ctx.unspentTxOutputRepository.delete(output));

    await this.ctx.unspentTxOutputRepository.add(
      new UnspentTxOutput(token.symbol, to, this.ctx.stub.getTxID(), amount),
    );
    await this.ctx.unspentTxOutputRepository.add(
      new UnspentTxOutput(token.symbol, from, this.ctx.stub.getTxID(), fund),
    );
  }
}
