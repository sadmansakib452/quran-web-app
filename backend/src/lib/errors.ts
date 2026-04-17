export type ApiErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "INTERNAL_ERROR";
export type ApiStatus = 400 | 404 | 500;

/**
 * Application-level error used to produce consistent API responses.
 *
 * We use a small, explicit taxonomy (BAD_REQUEST/NOT_FOUND/INTERNAL_ERROR)
 * that matches `docs/api-contract.md`.
 */
export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status: ApiStatus;

  constructor(params: { code: ApiErrorCode; message: string; status: ApiStatus }) {
    super(params.message);
    this.name = "ApiError";
    this.code = params.code;
    this.status = params.status;
  }
}

export function badRequest(message: string) {
  return new ApiError({ code: "BAD_REQUEST", message, status: 400 });
}

export function notFound(message: string) {
  return new ApiError({ code: "NOT_FOUND", message, status: 404 });
}

export function internalError(message = "Unexpected server error") {
  return new ApiError({ code: "INTERNAL_ERROR", message, status: 500 });
}

export function toErrorResponse(err: unknown): {
  status: ApiStatus;
  body: { error: { code: ApiErrorCode; message: string } };
} {
  if (err instanceof ApiError) {
    return {
      status: err.status,
      body: { error: { code: err.code, message: err.message } },
    };
  }

  // Avoid leaking internal details to clients.
  return {
    status: 500,
    body: { error: { code: "INTERNAL_ERROR", message: "Unexpected server error" } },
  };
}

