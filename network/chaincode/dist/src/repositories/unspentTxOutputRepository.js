"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentTxOutputRepository = void 0;
const bignumber_js_1 = require("bignumber.js");
const core_1 = require("../core");
const entities_1 = require("../entities");
class UnspentTxOutputRepository extends core_1.Repository {
    constructor(ctx) {
        super(ctx, 'utxo');
    }
    async add(entity) {
        await super.putState(entity);
    }
    async delete(entity) {
        await super.deleteState(entity);
    }
    async find(symbol, owner, txId) {
        const object = await super.getState(entities_1.UnspentTxOutput.makeKey([symbol, owner, txId]));
        if (object) {
            return new entities_1.UnspentTxOutput(object.symbol, object.owner, object.txId, new bignumber_js_1.default(object.amount));
        }
        else {
            return null;
        }
    }
    async select(symbol, owner) {
        const allResults = [];
        const query = JSON.stringify({ selector: { type: entities_1.UnspentTxOutput.name, symbol, owner } });
        const iterator = await this.ctx.stub.getQueryResult(query);
        let result = await iterator.next();
        while (!result.done) {
            const object = this.fromBuffer(result.value.value);
            const keyParts = entities_1.UnspentTxOutput.splitKey(object.key);
            allResults.push(new entities_1.UnspentTxOutput(object.symbol, object.owner, keyParts[2], new bignumber_js_1.default(object.amount)));
            result = await iterator.next();
        }
        return allResults;
    }
}
exports.UnspentTxOutputRepository = UnspentTxOutputRepository;
//# sourceMappingURL=unspentTxOutputRepository.js.map