export interface ZodValidationResponse {
  statusCode: number;
  message: string;
  errors: {
    path: (string | number)[];
    message: string;
  }[];
}
