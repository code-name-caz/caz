import { Context as FabricContext } from 'fabric-contract-api';

import { X509 } from 'jsrsasign';
import keccakHash = require('keccak');

export class Context extends FabricContext {
  public getAddress(): string {
    const cert = new X509();
    cert.readCertPEM(Buffer.from(this.stub.getCreator().idBytes).toString());
    const pubKeyHex = cert.getPublicKeyHex().slice(52);
    const addressBuffer = Buffer.from(pubKeyHex, 'hex').slice(1);
    const address = keccakHash('keccak256').update(addressBuffer)
      .digest().slice(-20).toString('hex');

    return address;
  }

  public getRole(): string {
    return this.clientIdentity.getAttributeValue('role');
  }
}
