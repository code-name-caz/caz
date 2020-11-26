import { Context as FabricContext } from 'fabric-contract-api';
export declare class Context extends FabricContext {
    getAddress(): string;
    getRole(): string;
}
