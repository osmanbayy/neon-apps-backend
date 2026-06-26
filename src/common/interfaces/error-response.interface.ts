export interface ErrorResponse {
  type: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
  statusCode: number;
  stack?: string;
}
