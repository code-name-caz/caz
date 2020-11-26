import { SmartContractResponse } from '.';
import { ResponseCodes } from '../variables';

export class SuccessResponse extends SmartContractResponse {
  constructor(result = {}) {
    super(true, ResponseCodes.success, 'OK', result);
  }
}
