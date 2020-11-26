import { Context } from '../core';
import { TokenRepository, UnspentTxOutputRepository } from '../repositories';
export declare class TokenContext extends Context {
    tokenRepository: TokenRepository;
    unspentTxOutputRepository: UnspentTxOutputRepository;
    constructor();
}
