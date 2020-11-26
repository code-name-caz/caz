import { TokenContext } from '../../contexts';
import { Token } from '../../entities';

export class TokenListService {
  constructor(public ctx: TokenContext) {
  }

  public async call(): Promise<Token[]> {
    return await this.ctx.tokenRepository.select();
  }
}
