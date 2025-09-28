// Base types from Prisma schema
export interface Picture {
  id: string;
  url: string;
  stoneId: string;
}

export interface BodyEffect {
  id: string;
  effect: string;
  stoneIds: string[];
}

export interface SpiritualEffect {
  id: string;
  effect: string;
  stoneIds: string[];
}

export interface EmotionalEffect {
  id: string;
  effect: string;
  stoneIds: string[];
}

export interface RechargementType {
  id: string;
  type: string;
  stoneIds: string[];
}

export interface PurificationType {
  id: string;
  type: string;
  stoneIds: string[];
}

export interface CraftedForm {
  id: string;
  form: string;
  stoneIds: string[];
}

export interface Chakra {
  id: string;
  number: number;
  stoneIds: string[];
}

export interface Contraindication {
  id: string;
  contraindicationName: string;
  stoneIds: string[];
}

// Complete Stone interface with all relations
export interface Stone {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  pictures: Picture[];
  bodyEffects: BodyEffect[];
  bodyEffectIds: string[];
  spiritualEffects: SpiritualEffect[];
  spiritualEffectIds: string[];
  emotionalEffects: EmotionalEffect[];
  emotionalEffectIds: string[];
  rechargementTypes: RechargementType[];
  rechargementTypeIds: string[];
  purificationTypes: PurificationType[];
  purificationTypeIds: string[];
  craftedForms: CraftedForm[];
  craftedFormIds: string[];
  chakras: Chakra[];
  chakraIds: string[];
  contraindications: Contraindication[];
  contraindicationIds: string[];
}

// Minimal Stone for list views (performance optimization)
export interface StoneMinimal {
  id: string;
  name: string;
  description?: string | null;
  pictures: Picture[];
}

// Stone with selected relations for specific use cases
export interface StoneWithEffects {
  id: string;
  name: string;
  description?: string | null;
  pictures: Picture[];
  bodyEffects: BodyEffect[];
  spiritualEffects: SpiritualEffect[];
  emotionalEffects: EmotionalEffect[];
}

// Form data types
export interface CreateStoneData {
  name: string;
  description?: string;
  bodyEffectIds: string[];
  spiritualEffectIds: string[];
  emotionalEffectIds: string[];
  rechargementTypeIds: string[];
  purificationTypeIds: string[];
  craftedFormIds: string[];
  chakraIds: string[];
  contraindicationIds: string[];
  pictures: Array<{
    url: string;
  }>;
}

export interface UpdateStoneData extends Partial<CreateStoneData> {
  id: string;
}

// Search types
export interface SearchFilters {
  bodyEffectIds?: string[];
  spiritualEffectIds?: string[];
  emotionalEffectIds?: string[];
  rechargementTypeIds?: string[];
  purificationTypeIds?: string[];
  craftedFormIds?: string[];
  chakraIds?: string[];
  contraindicationIds?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  pagination?: {
    page: number;
    limit: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// Utility types for CRUD operations
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T> = Partial<CreateInput<T>> & { id: string };