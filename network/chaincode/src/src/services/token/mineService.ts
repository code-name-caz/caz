import Joi = require('joi');
import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
import { UnspentTxOutput } from '../../entities/unspentTxOutput';
import { ForbiddenError, TokenMinedError, TokenNotFoundError, ValidationError } from '../../errors';

export class TokenMineService {
  private readonly schema = Joi.object().keys({
    symbol: Joi.string().regex(/^[A-Z]+$/).min(3).max(6).required(),
    owner: Joi.string().hex().length(40).required(),
  });

  constructor(public ctx: TokenContext) {
  }

  public async call(symbol: string, owner: string) {
    this.validate(symbol, owner);

    const token = await this.find(symbol);

    this.authorize(token, owner);

    if (token.mined) { throw new TokenMinedError(); }

    await this.mine(token);
  }

  private validate(symbol: string, owner: string): void {
    const result = this.schema.validate({ symbol, owner }, { abortEarly: false });

    if (result.error) { throw new ValidationError(result.error); }
  }

  private async find(symbol: string): Promise<Token> {
    const token = await this.ctx.tokenRepository.find(symbol);

    if (!token) { throw new TokenNotFoundError(); }

    return token;
  }

  private authorize(token: Token, owner: string) {
    if (owner !== token.owner) {
      throw new ForbiddenError();
    }
  }

  private async mine(token: Token): Promise<void> {
    token.mined = true;

    const output = new UnspentTxOutput(
      token.symbol,
      token.owner,
      this.ctx.stub.getTxID(),
      token.totalSupply,
    );

    await this.ctx.tokenRepository.update(token);
    await this.ctx.unspentTxOutputRepository.add(output);
  }
}
