import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class InvalidReceiverError extends Error {
  constructor() {
    const response = new FailureResponse(
      ResponseCodes.invalidReceiverError,
      'The sender and receiver are the same person.',
    );

    super(response.toJson());
  }
}
