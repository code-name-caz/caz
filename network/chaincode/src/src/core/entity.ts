export abstract class Entity {
  public static readonly keyDelimiter = ':';

  public static makeKey(keyParts: string[]): string {
    return keyParts.join(Entity.keyDelimiter);
  }

  public static splitKey(key: string): string[] {
    return key.split(Entity.keyDelimiter);
  }

  public type: string;
  public key: string;

  constructor(key: string) {
    this.type = this.constructor.name;
    this.key = key;
  }
}
