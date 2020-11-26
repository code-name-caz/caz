import BigNumber from 'bignumber.js';
import { TokenContext } from '../../contexts';
export declare class TokenGetBalanceService {
    ctx: TokenContext;
    private readonly schema;
    constructor(ctx: TokenContext);
    call(symbol: string, address: string): Promise<BigNumber>;
    private validate;
    private find;
    private balance;
}
