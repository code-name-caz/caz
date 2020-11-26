import { Entity } from '.';
import { Context } from './context';
export declare class Repository {
    ctx: Context;
    name: string;
    constructor(ctx: Context, name: string);
    putState(entity: Entity): Promise<void>;
    deleteState(entity: Entity): Promise<void>;
    getState(key: string): Promise<any>;
    protected toBuffer(object: any): Uint8Array;
    protected fromBuffer(data: Uint8Array): any;
}
