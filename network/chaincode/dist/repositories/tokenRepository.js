"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const bignumber_js_1 = require("bignumber.js");
const core_1 = require("../core");
const entities_1 = require("../entities");
class TokenRepository extends core_1.Repository {
    constructor(ctx) {
        super(ctx, 'tokens');
    }
    async add(entity) {
        await super.putState(entity);
    }
    async update(entity) {
        await super.putState(entity);
    }
    async find(symbol) {
        const object = await super.getState(entities_1.Token.makeKey([symbol]));
        if (object) {
            return new entities_1.Token(object.symbol, object.name, object.decimals, new bignumber_js_1.default(object.totalSupply), object.owner, object.mined);
        }
        else {
            return null;
        }
    }
    async select() {
        const allResults = [];
        const query = JSON.stringify({ selector: { type: entities_1.Token.name } });
        const iterator = await this.ctx.stub.getQueryResult(query);
        let result = await iterator.next();
        while (!result.done) {
            const object = this.fromBuffer(result.value.value);
            allResults.push(new entities_1.Token(object.symbol, object.name, object.decimals, new bignumber_js_1.default(object.totalSupply), object.owner, object.mined));
            result = await iterator.next();
        }
        return allResults;
    }
}
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=tokenRepository.js.map