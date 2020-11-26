import { Context, Repository } from '../core';
import { Token } from '../entities';
export declare class TokenRepository extends Repository {
    constructor(ctx: Context);
    add(entity: Token): Promise<void>;
    update(entity: Token): Promise<void>;
    find(symbol: string): Promise<any>;
    select(): Promise<Token[]>;
}
