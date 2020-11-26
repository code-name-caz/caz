import { Token } from '../entities';
import { SuccessResponse } from './successResponse';

export class TokenResponse extends SuccessResponse {
  constructor(token: Token) {
    super({
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      totalSupply: token.totalSupply.toString(),
      owner: token.owner,
      mined: token.mined,
    });
  }
}
