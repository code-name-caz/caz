import BigNumber from 'bignumber.js';
import { TokenContext } from '../../contexts';
export declare class TokenCreateService {
    ctx: TokenContext;
    private readonly schema;
    constructor(ctx: TokenContext);
    call(symbol: string, name: string, decimals: number, totalSupply: BigNumber, owner: string): Promise<void>;
    private validate;
    private authorize;
}
