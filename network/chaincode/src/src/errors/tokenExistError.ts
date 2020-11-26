import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class TokenExistError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.tokenExistsError,
      'Token already exist',
    );

    super(response.toJson());
  }
}
