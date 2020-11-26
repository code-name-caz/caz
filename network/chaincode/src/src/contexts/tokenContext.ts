import { Context } from '../core';
import { TokenRepository, UnspentTxOutputRepository } from '../repositories';

export class TokenContext extends Context {

  public tokenRepository: TokenRepository;
  public unspentTxOutputRepository: UnspentTxOutputRepository;

  constructor() {
    super();

    this.tokenRepository = new TokenRepository(this);
    this.unspentTxOutputRepository = new UnspentTxOutputRepository(this);
  }
}
