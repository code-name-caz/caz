import BigNumber from 'bignumber.js';
import { Context, Repository } from '../core';
import { UnspentTxOutput } from '../entities';

export class UnspentTxOutputRepository extends Repository {
  constructor(ctx: Context) {
    super(ctx, 'utxo');
  }

  public async add(entity: UnspentTxOutput): Promise<void> {
    await super.putState(entity);
  }

  public async delete(entity: UnspentTxOutput): Promise<void> {
    await super.deleteState(entity);
  }

  public async find(symbol: string, owner: string, txId: string): Promise<any> {
    const object: any = await super.getState(UnspentTxOutput.makeKey([symbol, owner, txId]));

    if (object) {
      return new UnspentTxOutput(
        object.symbol,
        object.owner,
        object.txId,
        new BigNumber(object.amount),
      );
    } else {
      return null;
    }
  }

  public async select(symbol: string, owner: string): Promise<UnspentTxOutput[]> {
    const allResults: UnspentTxOutput[] = [];
    const query = JSON.stringify({ selector: { type: UnspentTxOutput.name, symbol, owner } });
    const iterator = await this.ctx.stub.getQueryResult(query);
    let result = await iterator.next();
    while (!result.done) {
      const object = this.fromBuffer(result.value.value);
      const keyParts = UnspentTxOutput.splitKey(object.key);

      allResults.push(
        new UnspentTxOutput(
          object.symbol,
          object.owner,
          keyParts[2],
          new BigNumber(object.amount),
        ),
      );

      result = await iterator.next();
    }
    return allResults;
  }
}
