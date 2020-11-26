import BigNumber from 'bignumber.js';
import { SuccessResponse } from './successResponse';

export class BalanceResponse extends SuccessResponse {
  constructor(symbol: string, balance: BigNumber) {
    super({
      symbol,
      balance: balance.toString(),
    });
  }
}
