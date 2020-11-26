import { Entity } from '.';
import { Context } from './context';

export class Repository {
  public ctx: Context;
  public name: string;

  constructor(ctx: Context, name: string) {
    this.ctx = ctx;
    this.name = name;
  }

  public async putState(entity: Entity): Promise<void> {
    const compositeKey = this.ctx.stub.createCompositeKey(this.name, Entity.splitKey(entity.key));

    await this.ctx.stub.putState(compositeKey, this.toBuffer(entity));
  }

  public async deleteState(entity: Entity): Promise<void> {
    const compositeKey = this.ctx.stub.createCompositeKey(this.name, Entity.splitKey(entity.key));

    await this.ctx.stub.deleteState(compositeKey);
  }

  public async getState(key: string): Promise<any> {
    const compositeKey = this.ctx.stub.createCompositeKey(this.name, Entity.splitKey(key));
    const data = await this.ctx.stub.getState(compositeKey);

    if (data && data.toString().length > 0) {
      return this.fromBuffer(data);
    } else {
      return null;
    }
  }

  protected toBuffer(object: any): Uint8Array {
    return Buffer.from(JSON.stringify(object));
  }

  protected fromBuffer(data: Uint8Array): any {
    return JSON.parse(data.toString());
  }
}
