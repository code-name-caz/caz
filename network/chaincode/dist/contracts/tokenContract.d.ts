import { Contract } from 'fabric-contract-api';
import { TokenContext } from '../contexts';
import { AddressResponse, BalanceResponse, TokenResponse } from '../responses';
export declare class TokenContract extends Contract {
    constructor();
    createContext(): TokenContext;
    getAddress(ctx: TokenContext): Promise<AddressResponse>;
    create(ctx: TokenContext, symbol: string, name: string, decimals: number, totalSupply: string): Promise<void>;
    find(ctx: TokenContext, symbol: string): Promise<TokenResponse>;
    tokens(ctx: TokenContext): Promise<TokenResponse[]>;
    mine(ctx: TokenContext, symbol: string): Promise<void>;
    transfer(ctx: TokenContext, symbol: string, address: string, amount: string): Promise<void>;
    balance(ctx: TokenContext, symbol: string): Promise<BalanceResponse>;
    balances(ctx: TokenContext): Promise<BalanceResponse[]>;
}
