import { SmartContractResponse } from '.';
import { ResponseCodes } from '../variables';

export class FailureResponse extends SmartContractResponse {
  constructor(code: ResponseCodes, message: string, errors = {}) {
    super(false, code, message, {}, errors);
  }
}
