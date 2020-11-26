import { ValidationError as JoiValidationError } from 'joi';
import { FailureResponse } from '../responses';
import { ResponseCodes } from '../variables';

export class ValidationError extends Error {
  private static formatError(error: JoiValidationError) {
    return error.details.reduce((p, v) => {
      p[v.path.join('.')] = [v.message.replace(`"${v.context.key}"`, '').trim()];

      return p;
    }, {});
  }

  constructor(error: JoiValidationError) {
    const response = new FailureResponse(
      ResponseCodes.validationError,
      'Validation Error',
      ValidationError.formatError(error),
    );

    super(response.toJson());
  }
}
