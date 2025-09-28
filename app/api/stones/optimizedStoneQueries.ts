import { PrismaClient } from "@prisma/client";
import type { Stone, StoneMinimal, StoneWithEffects, SearchParams } from "~/types";

const prisma = new PrismaClient();

// Optimized query for stone lists (minimal data)
export async function getStonesMinimal(): Promise<StoneMinimal[]> {
  try {
    return await prisma.stone.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        pictures: {
          take: 1, // Only get the first picture for performance
          select: {
            id: true,
            url: true,
            stoneId: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching stones minimal:", error);
    throw new Error("Impossible de récupérer la liste des pierres");
  }
}

// Optimized query for stone details (full data)
export async function getStoneWithFullDetails(id: string): Promise<Stone | null> {
  try {
    return await prisma.stone.findUnique({
      where: { id },
      include: {
        pictures: true,
        bodyEffects: true,
        spiritualEffects: true,
        emotionalEffects: true,
        rechargementTypes: true,
        purificationTypes: true,
        craftedForms: true,
        chakras: {
          orderBy: { number: 'asc' }
        },
        contraindications: true
      }
    });
  } catch (error) {
    console.error("Error fetching stone details:", error);
    throw new Error("Impossible de récupérer les détails de la pierre");
  }
}

// Optimized query for stones with only effects (for effect-focused views)
export async function getStonesWithEffects(): Promise<StoneWithEffects[]> {
  try {
    return await prisma.stone.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        pictures: {
          take: 1,
          select: {
            id: true,
            url: true,
            stoneId: true
          }
        },
        bodyEffects: true,
        spiritualEffects: true,
        emotionalEffects: true
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching stones with effects:", error);
    throw new Error("Impossible de récupérer les pierres avec leurs effets");
  }
}

// Search builder class for complex queries
class StoneSearchBuilder {
  private whereConditions: any = {};
  private includeRelations: any = {};

  addTextSearch(query?: string): this {
    if (query && query.trim()) {
      this.whereConditions.name = {
        contains: query.trim(),
        mode: 'insensitive'
      };
    }
    return this;
  }

  addEffectFilters(filters: {
    bodyEffectIds?: string[];
    spiritualEffectIds?: string[];
    emotionalEffectIds?: string[];
  }): this {
    if (filters.bodyEffectIds?.length) {
      this.whereConditions.bodyEffectIds = { hasSome: filters.bodyEffectIds };
    }
    if (filters.spiritualEffectIds?.length) {
      this.whereConditions.spiritualEffectIds = { hasSome: filters.spiritualEffectIds };
    }
    if (filters.emotionalEffectIds?.length) {
      this.whereConditions.emotionalEffectIds = { hasSome: filters.emotionalEffectIds };
    }
    return this;
  }

  addPropertyFilters(filters: {
    rechargementTypeIds?: string[];
    purificationTypeIds?: string[];
    craftedFormIds?: string[];
    chakraIds?: string[];
    contraindicationIds?: string[];
  }): this {
    Object.entries(filters).forEach(([field, ids]) => {
      if (ids?.length) {
        this.whereConditions[field] = { hasSome: ids };
      }
    });
    return this;
  }

  withMinimalIncludes(): this {
    this.includeRelations = {
      pictures: { take: 1 }
    };
    return this;
  }

  withFullIncludes(): this {
    this.includeRelations = {
      pictures: true,
      bodyEffects: true,
      spiritualEffects: true,
      emotionalEffects: true,
      rechargementTypes: true,
      purificationTypes: true,
      craftedForms: true,
      chakras: { orderBy: { number: 'asc' } },
      contraindications: true
    };
    return this;
  }

  build() {
    return {
      where: Object.keys(this.whereConditions).length > 0 ? this.whereConditions : undefined,
      include: this.includeRelations,
      orderBy: { name: 'asc' as const }
    };
  }
}

// Optimized search function
export async function searchStonesOptimized(params: SearchParams): Promise<Stone[]> {
  try {
    const builder = new StoneSearchBuilder();

    const query = builder
      .addTextSearch(params.query)
      .addEffectFilters({
        bodyEffectIds: params.filters?.bodyEffectIds,
        spiritualEffectIds: params.filters?.spiritualEffectIds,
        emotionalEffectIds: params.filters?.emotionalEffectIds
      })
      .addPropertyFilters({
        rechargementTypeIds: params.filters?.rechargementTypeIds,
        purificationTypeIds: params.filters?.purificationTypeIds,
        craftedFormIds: params.filters?.craftedFormIds,
        chakraIds: params.filters?.chakraIds,
        contraindicationIds: params.filters?.contraindicationIds
      })
      .withFullIncludes()
      .build();

    return await prisma.stone.findMany(query) as any;
  } catch (error) {
    console.error("Error searching stones:", error);
    throw new Error("Impossible de rechercher les pierres");
  }
}

// Paginated search for large datasets
export async function searchStonesPaginated(
  params: SearchParams & { page: number; limit: number }
): Promise<{ stones: StoneMinimal[]; totalCount: number; totalPages: number }> {
  try {
    const { page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const builder = new StoneSearchBuilder();
    const baseQuery = builder
      .addTextSearch(params.query)
      .addEffectFilters({
        bodyEffectIds: params.filters?.bodyEffectIds,
        spiritualEffectIds: params.filters?.spiritualEffectIds,
        emotionalEffectIds: params.filters?.emotionalEffectIds
      })
      .addPropertyFilters({
        rechargementTypeIds: params.filters?.rechargementTypeIds,
        purificationTypeIds: params.filters?.purificationTypeIds,
        craftedFormIds: params.filters?.craftedFormIds,
        chakraIds: params.filters?.chakraIds,
        contraindicationIds: params.filters?.contraindicationIds
      })
      .withMinimalIncludes()
      .build();

    const [stones, totalCount] = await Promise.all([
      prisma.stone.findMany({
        ...baseQuery,
        skip,
        take: limit
      }),
      prisma.stone.count({
        where: baseQuery.where
      })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      stones: stones as any,
      totalCount,
      totalPages
    };
  } catch (error) {
    console.error("Error in paginated stone search:", error);
    throw new Error("Impossible de rechercher les pierres avec pagination");
  }
}

// Get stones by specific effect type (optimized for effect pages)
export async function getStonesByEffect(
  effectType: 'body' | 'spiritual' | 'emotional',
  effectId: string
): Promise<StoneMinimal[]> {
  try {
    const fieldMap = {
      body: 'bodyEffectIds',
      spiritual: 'spiritualEffectIds',
      emotional: 'emotionalEffectIds'
    };

    return await prisma.stone.findMany({
      where: {
        [fieldMap[effectType]]: {
          has: effectId
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        pictures: {
          take: 1,
          select: {
            id: true,
            url: true,
            stoneId: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error(`Error fetching stones by ${effectType} effect:`, error);
    throw new Error(`Impossible de récupérer les pierres pour cet effet ${effectType}`);
  }
}

// Cache-friendly count queries
export async function getStonesCounts() {
  try {
    const [
      totalStones,
      stonesWithBodyEffects,
      stonesWithSpiritualEffects,
      stonesWithEmotionalEffects
    ] = await Promise.all([
      prisma.stone.count(),
      prisma.stone.count({
        where: {
          bodyEffectIds: { isEmpty: false }
        }
      }),
      prisma.stone.count({
        where: {
          spiritualEffectIds: { isEmpty: false }
        }
      }),
      prisma.stone.count({
        where: {
          emotionalEffectIds: { isEmpty: false }
        }
      })
    ]);

    return {
      totalStones,
      stonesWithBodyEffects,
      stonesWithSpiritualEffects,
      stonesWithEmotionalEffects
    };
  } catch (error) {
    console.error("Error getting stone counts:", error);
    throw new Error("Impossible de récupérer les statistiques des pierres");
  }
}