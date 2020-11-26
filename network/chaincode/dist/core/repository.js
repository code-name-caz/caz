"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const _1 = require(".");
class Repository {
    constructor(ctx, name) {
        this.ctx = ctx;
        this.name = name;
    }
    async putState(entity) {
        const compositeKey = this.ctx.stub.createCompositeKey(this.name, _1.Entity.splitKey(entity.key));
        await this.ctx.stub.putState(compositeKey, this.toBuffer(entity));
    }
    async deleteState(entity) {
        const compositeKey = this.ctx.stub.createCompositeKey(this.name, _1.Entity.splitKey(entity.key));
        await this.ctx.stub.deleteState(compositeKey);
    }
    async getState(key) {
        const compositeKey = this.ctx.stub.createCompositeKey(this.name, _1.Entity.splitKey(key));
        const data = await this.ctx.stub.getState(compositeKey);
        if (data && data.toString().length > 0) {
            return this.fromBuffer(data);
        }
        else {
            return null;
        }
    }
    toBuffer(object) {
        return Buffer.from(JSON.stringify(object));
    }
    fromBuffer(data) {
        return JSON.parse(data.toString());
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map