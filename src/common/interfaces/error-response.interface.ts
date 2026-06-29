export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ErrorResponse {
  type: string;
  error: string;
  message: string;
  errors?: ValidationIssue[];
  timestamp: string;
  path: string;
  statusCode: number;
  stack?: string;
}
