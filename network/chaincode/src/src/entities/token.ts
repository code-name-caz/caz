import { BigNumber } from 'bignumber.js';
import { Entity } from '../core';

export class Token extends Entity {

  public symbol: string;

  public name: string;

  public decimals: number;

  public totalSupply: BigNumber;

  public owner: string;

  public mined: boolean;

  constructor(symbol: string, name: string, decimals: number, totalSupply: BigNumber, owner: string, mined: boolean) {
    super(symbol);

    this.symbol = symbol;
    this.name = name;
    this.decimals = decimals;
    this.totalSupply = totalSupply;
    this.owner = owner;
    this.mined = mined;
  }
}
