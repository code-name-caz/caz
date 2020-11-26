"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const jsrsasign_1 = require("jsrsasign");
const keccakHash = require("keccak");
class Context extends fabric_contract_api_1.Context {
    getAddress() {
        const cert = new jsrsasign_1.X509();
        cert.readCertPEM(Buffer.from(this.stub.getCreator().idBytes).toString());
        const pubKeyHex = cert.getPublicKeyHex().slice(52);
        const addressBuffer = Buffer.from(pubKeyHex, 'hex').slice(1);
        const address = keccakHash('keccak256').update(addressBuffer)
            .digest().slice(-20).toString('hex');
        return address;
    }
    getRole() {
        return this.clientIdentity.getAttributeValue('role');
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map