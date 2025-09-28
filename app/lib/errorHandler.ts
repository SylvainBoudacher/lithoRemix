// Custom API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Validation Error class
export class ValidationError extends ApiError {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// Not Found Error class
export class NotFoundError extends ApiError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} avec l'ID ${id} introuvable`
      : `${resource} introuvable`;
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

// Database Error class
export class DatabaseError extends ApiError {
  constructor(operation: string, details?: string) {
    const message = `Erreur de base de données lors de ${operation}${
      details ? `: ${details}` : ''
    }`;
    super(message, 500, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

// Error handler utility
export function handleApiError(error: unknown, context: string): never {
  console.error(`Error in ${context}:`, error);

  // If it's already an ApiError, re-throw it
  if (error instanceof ApiError) {
    throw error;
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;

    switch (prismaError.code) {
      case 'P2002':
        throw new ValidationError('Cette valeur existe déjà et doit être unique');
      case 'P2025':
        throw new NotFoundError('Ressource');
      case 'P2003':
        throw new ValidationError('Référence invalide vers une ressource liée');
      default:
        throw new DatabaseError(context, prismaError.message);
    }
  }

  // Handle validation errors
  if (error instanceof Error && error.message.includes('validation')) {
    throw new ValidationError(error.message);
  }

  // Generic error
  throw new ApiError(`Une erreur inattendue est survenue lors de ${context}`);
}

// Async error wrapper
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context: string
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleApiError(error, context);
    }
  };
}

// Validation utilities
export function validateRequired(value: any, fieldName: string): void {
  if (value === undefined || value === null || value === '') {
    throw new ValidationError(`Le champ ${fieldName} est requis`, fieldName);
  }
}

export function validateString(value: any, fieldName: string, minLength = 1, maxLength = 255): void {
  validateRequired(value, fieldName);

  if (typeof value !== 'string') {
    throw new ValidationError(`Le champ ${fieldName} doit être une chaîne de caractères`, fieldName);
  }

  if (value.length < minLength) {
    throw new ValidationError(
      `Le champ ${fieldName} doit contenir au moins ${minLength} caractère(s)`,
      fieldName
    );
  }

  if (value.length > maxLength) {
    throw new ValidationError(
      `Le champ ${fieldName} ne peut pas dépasser ${maxLength} caractères`,
      fieldName
    );
  }
}

export function validateArray(value: any, fieldName: string, minItems = 0): void {
  if (!Array.isArray(value)) {
    throw new ValidationError(`Le champ ${fieldName} doit être un tableau`, fieldName);
  }

  if (value.length < minItems) {
    throw new ValidationError(
      `Le champ ${fieldName} doit contenir au moins ${minItems} élément(s)`,
      fieldName
    );
  }
}

export function validateObjectId(value: any, fieldName: string): void {
  validateRequired(value, fieldName);

  if (typeof value !== 'string' || !value.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ValidationError(
      `Le champ ${fieldName} doit être un ObjectId MongoDB valide`,
      fieldName
    );
  }
}

// Form validation helper
export function validateStoneData(data: any): void {
  validateString(data.name, 'nom', 2, 100);

  if (data.description !== undefined) {
    validateString(data.description, 'description', 0, 1000);
  }

  // Validate effect arrays
  const effectFields = [
    'bodyEffectIds',
    'spiritualEffectIds',
    'emotionalEffectIds',
    'rechargementTypeIds',
    'purificationTypeIds',
    'craftedFormIds',
    'chakraIds',
    'contraindicationIds'
  ];

  effectFields.forEach(field => {
    if (data[field] !== undefined) {
      validateArray(data[field], field);
      data[field].forEach((id: any) => validateObjectId(id, `${field}[${data[field].indexOf(id)}]`));
    }
  });

  // Validate pictures
  if (data.pictures !== undefined) {
    validateArray(data.pictures, 'images');
    data.pictures.forEach((picture: any, index: number) => {
      validateString(picture.url, `images[${index}].url`);
    });
  }
}