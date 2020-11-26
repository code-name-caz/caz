import { ResponseCodes } from '../variables';

export class SmartContractResponse {
  constructor(
    public success: boolean,
    public code: ResponseCodes,
    public message: string,
    public result: any = {},
    public errors: any = {}) {
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public toString(): string {
    return this.toJson();
  }
}
