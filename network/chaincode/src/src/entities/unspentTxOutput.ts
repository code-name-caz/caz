import { BigNumber } from 'bignumber.js';
import { Entity } from '../core';

// Unspent Transaction Output (UTXO)
export class UnspentTxOutput extends Entity {
  public readonly symbol: string;

  public readonly owner: string;

  public readonly txId: string;

  public readonly amount: BigNumber;

  constructor(symbol: string, owner: string, txId: string, amount: BigNumber) {
    super(UnspentTxOutput.makeKey([symbol, owner, txId]));

    this.txId = txId;
    this.symbol = symbol;
    this.amount = amount;
    this.owner = owner;
  }
}
