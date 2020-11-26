import { Context, Repository } from '../core';
import { UnspentTxOutput } from '../entities';
export declare class UnspentTxOutputRepository extends Repository {
    constructor(ctx: Context);
    add(entity: UnspentTxOutput): Promise<void>;
    delete(entity: UnspentTxOutput): Promise<void>;
    find(symbol: string, owner: string, txId: string): Promise<any>;
    select(symbol: string, owner: string): Promise<UnspentTxOutput[]>;
}
