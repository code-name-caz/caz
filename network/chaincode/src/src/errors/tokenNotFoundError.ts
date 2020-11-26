import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class TokenNotFoundError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.tokenNotFoundError,
      'Token not found',
    );

    super(response.toJson());
  }
}
