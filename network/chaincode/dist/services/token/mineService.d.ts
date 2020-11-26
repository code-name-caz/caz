import { TokenContext } from '../../contexts';
export declare class TokenMineService {
    ctx: TokenContext;
    private readonly schema;
    constructor(ctx: TokenContext);
    call(symbol: string, owner: string): Promise<void>;
    private validate;
    private find;
    private authorize;
    private mine;
}
