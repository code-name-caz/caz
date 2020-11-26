import BigNumber from 'bignumber.js';
import { Contract, Info, Transaction } from 'fabric-contract-api';

import { TokenContext } from '../contexts';

import {
  AddressResponse,
  BalanceResponse,
  TokenResponse,
} from '../responses';

import {
  TokenCreateService,
  TokenFindService,
  TokenGetBalanceService,
  TokenMineService,
  TokenTransferService,
} from '../services/token';
import { TokenListService } from '../services/token/listService';

@Info({ title: 'Token', description: 'Smart contract for token' })
export class TokenContract extends Contract {
  constructor() {
    super('token');
  }

  public createContext(): TokenContext {
    return new TokenContext();
  }

  @Transaction(false)
  public async getAddress(ctx: TokenContext): Promise<AddressResponse> {
    return new AddressResponse(ctx.getAddress());
  }

  @Transaction(true)
  public async create(ctx: TokenContext, symbol: string, name: string, decimals: number, totalSupply: string): Promise<void> {
    const createToken = new TokenCreateService(ctx);

    await createToken.call(symbol, name, decimals, new BigNumber(totalSupply), ctx.getAddress());
  }

  @Transaction(false)
  public async find(ctx: TokenContext, symbol: string): Promise<TokenResponse> {
    const findService = new TokenFindService(ctx);

    const token = await findService.call(symbol);

    return new TokenResponse(token);
  }

  @Transaction(false)
  public async tokens(ctx: TokenContext): Promise<TokenResponse[]> {
    const getTokensService = new TokenListService(ctx);

    const tokens = await getTokensService.call();

    return tokens.map((token) => new TokenResponse(token));
  }

  @Transaction(true)
  public async mine(ctx: TokenContext, symbol: string): Promise<void> {
    const mineToken = new TokenMineService(ctx);

    await mineToken.call(symbol, ctx.getAddress());
  }

  @Transaction(true)
  public async transfer(ctx: TokenContext, symbol: string, address: string, amount: string): Promise<void> {
    const transferToken = new TokenTransferService(ctx);

    await transferToken.call(symbol, new BigNumber(amount), ctx.getAddress(), address);
  }

  @Transaction(false)
  public async balance(ctx: TokenContext, symbol: string): Promise<BalanceResponse> {
    const balanceService = new TokenGetBalanceService(ctx);

    const balance = await balanceService.call(symbol, ctx.getAddress());

    return new BalanceResponse(symbol, balance);
  }

  @Transaction(false)
  public async balances(ctx: TokenContext): Promise<BalanceResponse[]> {
    const getTokensService = new TokenListService(ctx);
    const getBalanceService = new TokenGetBalanceService(ctx);

    const tokens = await getTokensService.call();
    const balances: BalanceResponse[] = [];

    tokens.forEach(async (token) => {
      const balance = await getBalanceService.call(token.symbol, ctx.getAddress());

      balances.push(new BalanceResponse(token.symbol, balance));
    });

    return balances;
  }
}
