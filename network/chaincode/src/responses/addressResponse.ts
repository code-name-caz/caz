import { SuccessResponse } from './successResponse';

export class AddressResponse extends SuccessResponse {
  constructor(address: string) {
    super({ address });
  }
}
