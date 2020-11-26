import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class TokenMinedError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.tokenMinedError,
      'Token already mined',
    );

    super(response.toJson());
  }
}
