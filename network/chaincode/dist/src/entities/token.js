"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const core_1 = require("../core");
class Token extends core_1.Entity {
    constructor(symbol, name, decimals, totalSupply, owner, mined) {
        super(symbol);
        this.symbol = symbol;
        this.name = name;
        this.decimals = decimals;
        this.totalSupply = totalSupply;
        this.owner = owner;
        this.mined = mined;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map