import { TokenContext } from '../../contexts';
import { Token } from '../../entities';
export declare class TokenListService {
    ctx: TokenContext;
    constructor(ctx: TokenContext);
    call(): Promise<Token[]>;
}
