import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class InsufficientFundsError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.insufficientFundsError,
      'Insufficient funds',
    );

    super(response.toJson());
  }
}
