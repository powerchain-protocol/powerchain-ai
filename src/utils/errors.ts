/**
 * Custom error classes for the PowerChain OS
 */

export class APIError extends Error {
  public statusCode: number;
  
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

export class AuthenticationError extends APIError {
  constructor(message = 'Not authenticated') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends APIError {
  constructor(message = 'Not authorized to perform this action') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ModelInferenceError extends APIError {
  constructor(message = 'Failed to generate response from inference node') {
    super(message, 503);
    this.name = 'ModelInferenceError';
  }
}
