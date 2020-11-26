"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspentTxOutput = void 0;
const core_1 = require("../core");
// Unspent Transaction Output (UTXO)
class UnspentTxOutput extends core_1.Entity {
    constructor(symbol, owner, txId, amount) {
        super(UnspentTxOutput.makeKey([symbol, owner, txId]));
        this.txId = txId;
        this.symbol = symbol;
        this.amount = amount;
        this.owner = owner;
    }
}
exports.UnspentTxOutput = UnspentTxOutput;
//# sourceMappingURL=unspentTxOutput.js.map