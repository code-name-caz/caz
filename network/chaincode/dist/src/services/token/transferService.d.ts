import BigNumber from 'bignumber.js';
import { TokenContext } from '../../contexts';
export declare class TokenTransferService {
    ctx: TokenContext;
    private readonly schema;
    constructor(ctx: TokenContext);
    call(symbol: string, amount: BigNumber, from: string, to: string): Promise<void>;
    private validate;
    private find;
    private transfer;
}
