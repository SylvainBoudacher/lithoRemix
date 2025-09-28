import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generic error messages type
interface ErrorMessages {
  create: string;
  update: string;
  delete: string;
  get: string;
  notFound: string;
}

// Generic CRUD operations factory
export function createCrudOperations<T extends { id: string }>(
  modelName: string,
  errorMessages: ErrorMessages
) {
  const model = (prisma as any)[modelName];

  return {
    // Create operation
    async create(data: Omit<T, 'id'>): Promise<T> {
      try {
        const result = await model.create({ data });
        return result as T;
      } catch (error) {
        console.error(`${errorMessages.create}:`, error);
        throw new Error(errorMessages.create);
      }
    },

    // Get all operation
    async getAll(include?: object): Promise<T[]> {
      try {
        const result = await model.findMany({ include });
        return result as T[];
      } catch (error) {
        console.error(`${errorMessages.get}:`, error);
        throw new Error(errorMessages.get);
      }
    },

    // Get by ID operation
    async getById(id: string, include?: object): Promise<T | null> {
      try {
        const result = await model.findUnique({
          where: { id },
          include
        });
        return result as T | null;
      } catch (error) {
        console.error(`${errorMessages.get}:`, error);
        throw new Error(errorMessages.get);
      }
    },

    // Update operation
    async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T> {
      try {
        const result = await model.update({
          where: { id },
          data
        });
        return result as T;
      } catch (error) {
        console.error(`${errorMessages.update}:`, error);
        throw new Error(errorMessages.update);
      }
    },

    // Delete operation
    async delete(id: string): Promise<T> {
      try {
        const result = await model.delete({
          where: { id }
        });
        return result as T;
      } catch (error) {
        console.error(`${errorMessages.delete}:`, error);
        throw new Error(errorMessages.delete);
      }
    },

    // Check if exists
    async exists(id: string): Promise<boolean> {
      try {
        const result = await model.findUnique({
          where: { id },
          select: { id: true }
        });
        return !!result;
      } catch (error) {
        console.error(`${errorMessages.get}:`, error);
        return false;
      }
    },

    // Count operation
    async count(where?: object): Promise<number> {
      try {
        return await model.count({ where });
      } catch (error) {
        console.error(`Error counting ${String(modelName)}:`, error);
        throw new Error(`Impossible de compter les ${String(modelName)}`);
      }
    }
  };
}

// Specific CRUD operations for each entity
export const bodyEffectOperations = createCrudOperations('bodyEffect', {
  create: "Impossible de créer l'effet corporel",
  update: "Impossible de mettre à jour l'effet corporel",
  delete: "Impossible de supprimer l'effet corporel",
  get: "Impossible de récupérer les effets corporels",
  notFound: "Effet corporel introuvable"
});

export const spiritualEffectOperations = createCrudOperations('spiritualEffect', {
  create: "Impossible de créer l'effet spirituel",
  update: "Impossible de mettre à jour l'effet spirituel",
  delete: "Impossible de supprimer l'effet spirituel",
  get: "Impossible de récupérer les effets spirituels",
  notFound: "Effet spirituel introuvable"
});

export const emotionalEffectOperations = createCrudOperations('emotionalEffect', {
  create: "Impossible de créer l'effet émotionnel",
  update: "Impossible de mettre à jour l'effet émotionnel",
  delete: "Impossible de supprimer l'effet émotionnel",
  get: "Impossible de récupérer les effets émotionnels",
  notFound: "Effet émotionnel introuvable"
});

export const rechargementTypeOperations = createCrudOperations('rechargementType', {
  create: "Impossible de créer le type de rechargement",
  update: "Impossible de mettre à jour le type de rechargement",
  delete: "Impossible de supprimer le type de rechargement",
  get: "Impossible de récupérer les types de rechargement",
  notFound: "Type de rechargement introuvable"
});

export const purificationTypeOperations = createCrudOperations('purificationType', {
  create: "Impossible de créer le type de purification",
  update: "Impossible de mettre à jour le type de purification",
  delete: "Impossible de supprimer le type de purification",
  get: "Impossible de récupérer les types de purification",
  notFound: "Type de purification introuvable"
});

export const craftedFormOperations = createCrudOperations('craftedForm', {
  create: "Impossible de créer la forme artisanale",
  update: "Impossible de mettre à jour la forme artisanale",
  delete: "Impossible de supprimer la forme artisanale",
  get: "Impossible de récupérer les formes artisanales",
  notFound: "Forme artisanale introuvable"
});

export const chakraOperations = createCrudOperations('chakra', {
  create: "Impossible de créer le chakra",
  update: "Impossible de mettre à jour le chakra",
  delete: "Impossible de supprimer le chakra",
  get: "Impossible de récupérer les chakras",
  notFound: "Chakra introuvable"
});

export const contraindicationOperations = createCrudOperations('contraindication', {
  create: "Impossible de créer la contre-indication",
  update: "Impossible de mettre à jour la contre-indication",
  delete: "Impossible de supprimer la contre-indication",
  get: "Impossible de récupérer les contre-indications",
  notFound: "Contre-indication introuvable"
});

// Enhanced operations with business logic
export class EnhancedCrudOperations<T extends { id: string }> {
  constructor(
    private operations: ReturnType<typeof createCrudOperations<T>>,
    private entityName: string
  ) {}

  // Create with validation
  async createWithValidation(
    data: Omit<T, 'id'>,
    validator?: (data: Omit<T, 'id'>) => Promise<void>
  ): Promise<T> {
    if (validator) {
      await validator(data);
    }
    return this.operations.create(data);
  }

  // Bulk operations
  async bulkDelete(ids: string[]): Promise<void> {
    const deletePromises = ids.map(id => this.operations.delete(id));
    await Promise.all(deletePromises);
  }

  // Search functionality
  async search(query: string, fields: (keyof T)[]): Promise<T[]> {
    // This would need to be implemented per entity type
    // since Prisma doesn't support generic text search
    throw new Error(`Search not implemented for ${this.entityName}`);
  }
}

// Export enhanced operations for specific entities
export const enhancedBodyEffectOperations = new EnhancedCrudOperations(
  bodyEffectOperations,
  'bodyEffect'
);

export const enhancedSpiritualEffectOperations = new EnhancedCrudOperations(
  spiritualEffectOperations,
  'spiritualEffect'
);

// ... Add others as needed