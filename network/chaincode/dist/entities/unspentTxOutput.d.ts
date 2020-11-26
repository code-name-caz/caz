import { BigNumber } from 'bignumber.js';
import { Entity } from '../core';
export declare class UnspentTxOutput extends Entity {
    readonly symbol: string;
    readonly owner: string;
    readonly txId: string;
    readonly amount: BigNumber;
    constructor(symbol: string, owner: string, txId: string, amount: BigNumber);
}
