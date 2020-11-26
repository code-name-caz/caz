export declare abstract class Entity {
    static readonly keyDelimiter = ":";
    static makeKey(keyParts: string[]): string;
    static splitKey(key: string): string[];
    type: string;
    key: string;
    constructor(key: string);
}
