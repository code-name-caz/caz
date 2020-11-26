import BigNumber from 'bignumber.js';
import { Context, Repository } from '../core';
import { Token } from '../entities';

export class TokenRepository extends Repository {
  constructor(ctx: Context) {
    super(ctx, 'tokens');
  }

  public async add(entity: Token): Promise<void> {
    await super.putState(entity);
  }

  public async update(entity: Token): Promise<void> {
    await super.putState(entity);
  }

  public async find(symbol: string): Promise<any> {
    const object: any = await super.getState(Token.makeKey([symbol]));

    if (object) {
      return new Token(
        object.symbol,
        object.name,
        object.decimals,
        new BigNumber(object.totalSupply),
        object.owner,
        object.mined,
      );
    } else {
      return null;
    }
  }

  public async select(): Promise<Token[]> {
    const allResults: Token[] = [];
    const query = JSON.stringify({ selector: { type: Token.name } });
    const iterator = await this.ctx.stub.getQueryResult(query);
    let result = await iterator.next();
    while (!result.done) {
      const object = this.fromBuffer(result.value.value);

      allResults.push(
        new Token(
          object.symbol,
          object.name,
          object.decimals,
          new BigNumber(object.totalSupply),
          object.owner,
          object.mined,
        ),
      );

      result = await iterator.next();
    }
    return allResults;
  }
}
