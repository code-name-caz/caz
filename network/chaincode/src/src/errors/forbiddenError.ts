import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class ForbiddenError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.forbiddenError,
      'Forbidden',
    );

    super(response.toJson());
  }
}
