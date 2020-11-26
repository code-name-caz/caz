"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContext = void 0;
const core_1 = require("../core");
const repositories_1 = require("../repositories");
class TokenContext extends core_1.Context {
    constructor() {
        super();
        this.tokenRepository = new repositories_1.TokenRepository(this);
        this.unspentTxOutputRepository = new repositories_1.UnspentTxOutputRepository(this);
    }
}
exports.TokenContext = TokenContext;
//# sourceMappingURL=tokenContext.js.map