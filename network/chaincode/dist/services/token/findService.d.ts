import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
export declare class TokenFindService {
    ctx: TokenContext;
    private readonly schema;
    constructor(ctx: TokenContext);
    call(symbol: string): Promise<Token>;
    private validate;
    private find;
}
