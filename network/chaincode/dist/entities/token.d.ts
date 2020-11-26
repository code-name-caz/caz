import { BigNumber } from 'bignumber.js';
import { Entity } from '../core';
export declare class Token extends Entity {
    symbol: string;
    name: string;
    decimals: number;
    totalSupply: BigNumber;
    owner: string;
    mined: boolean;
    constructor(symbol: string, name: string, decimals: number, totalSupply: BigNumber, owner: string, mined: boolean);
}
