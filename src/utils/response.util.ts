import type { Context } from 'hono';

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  metadata?: PaginationMetadata;
}

interface PaginationMetadata {
  page: number;
  rowsPerPage?: number;
  total: number;
  totalPages: number;
}

interface ErrorResponse {
  success: false;
  message: string;
  error?: any;
}

export function successResponse<T>(
  c: Context,
  data: T,
  message = 'Success',
  statusCode = 200,
  metadata?: PaginationMetadata
) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
  };

  if (metadata) {
    response.metadata = metadata;
  }

  return c.json(response, statusCode as any);
}

export function errorResponse(
  c: Context,
  message: string,
  error?: any,
  statusCode = 500
) {
  const response: ErrorResponse = {
    success: false,
    message,
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.error = error instanceof Error ? error.message : error;
  }

  return c.json(response, statusCode as any);
}

export function validationErrorResponse(
  c: Context,
  message: string,
  errors?: any
) {
  return c.json(
    {
      success: false,
      message,
      errors,
    },
    400
  );
}

export function notFoundResponse(c: Context, resource: string) {
  return c.json(
    {
      success: false,
      message: `${resource} not found`,
    },
    404
  );
}
