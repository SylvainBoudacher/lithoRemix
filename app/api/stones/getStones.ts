import prisma from '~/lib/prismaDb';

export async function getStones() {
    try {
        const stones = await prisma.stone.findMany({
            include: {
                pictures: true,
            }
        });
        return stones;
    } catch (error) {
        console.error("Erreur lors de la récupération des pierres:", error);
        throw new Error("Impossible de récupérer les pierres");
    }
}

export async function getStoneById(id: string) {
    try {
        const stone = await prisma.stone.findUnique({
            where: { id },
            include: {
                pictures: true,
                bodyEffects: true,
                spiritualEffects: true,
                emotionalEffects: true,
                rechargementTypes: true,
                purificationTypes: true,
                craftedForms: true,
                chakras: true,
            }
        });
        return stone;
    } catch (error) {
        console.error("Erreur lors de la récupération de la pierre:", error);
        throw new Error("Impossible de récupérer la pierre");
    }
}

export async function getStoneName(id: string) {
    try {
        const stone = await prisma.stone.findUnique({
            where: { id },
            select: { name: true },
        });
        return stone;
    } catch (error) {
        console.error("Erreur lors de la récupération du nom de la pierre:", error);
        throw new Error("Impossible de récupérer le nom de la pierre");
    }
}

export async function searchStones(
    queryOrOptions: string | {
        query?: string;
        bodyEffectIds?: string[];
        spiritualEffectIds?: string[];
        emotionalEffectIds?: string[];
        rechargementTypeIds?: string[];
        purificationTypeIds?: string[];
        craftedFormIds?: string[];
        chakraIds?: string[];
        contraindicationIds?: string[];
    },
    options?: {
        bodyEffectIds?: string[];
        spiritualEffectIds?: string[];
        emotionalEffectIds?: string[];
        rechargementTypeIds?: string[];
        purificationTypeIds?: string[];
        craftedFormIds?: string[];
        chakraIds?: string[];
        contraindicationIds?: string[];
    }
) {
    try {
        const whereConditions: any = {};
        
        // Gestion des deux formats d'appel (string ou objet)
        if (typeof queryOrOptions === 'string') {
            // Format ancien: searchStones(query)
            if (queryOrOptions) {
                whereConditions.name = { contains: queryOrOptions, mode: 'insensitive' };
            }
        } else {
            // Format nouveau: searchStones({ query, ...filters })
            const { 
                query, 
                bodyEffectIds, 
                spiritualEffectIds, 
                emotionalEffectIds,
                rechargementTypeIds,
                purificationTypeIds,
                craftedFormIds,
                chakraIds,
                contraindicationIds
            } = queryOrOptions;
            
            // Filtre par nom si query est fourni
            if (query) {
                whereConditions.name = { contains: query, mode: 'insensitive' };
            }
            
            // Ajouter les filtres pour chaque relation
            if (bodyEffectIds && bodyEffectIds.length > 0) {
                whereConditions.bodyEffectIds = { hasSome: bodyEffectIds };
            }
            
            if (spiritualEffectIds && spiritualEffectIds.length > 0) {
                whereConditions.spiritualEffectIds = { hasSome: spiritualEffectIds };
            }
            
            if (emotionalEffectIds && emotionalEffectIds.length > 0) {
                whereConditions.emotionalEffectIds = { hasSome: emotionalEffectIds };
            }
            
            if (rechargementTypeIds && rechargementTypeIds.length > 0) {
                whereConditions.rechargementTypeIds = { hasSome: rechargementTypeIds };
            }
            
            if (purificationTypeIds && purificationTypeIds.length > 0) {
                whereConditions.purificationTypeIds = { hasSome: purificationTypeIds };
            }
            
            if (craftedFormIds && craftedFormIds.length > 0) {
                whereConditions.craftedFormIds = { hasSome: craftedFormIds };
            }
            
            if (chakraIds && chakraIds.length > 0) {
                whereConditions.chakraIds = { hasSome: chakraIds };
            }
            
            if (contraindicationIds && contraindicationIds.length > 0) {
                whereConditions.contraindicationIds = { hasSome: contraindicationIds };
            }
        }
        
        // Support pour le format options en second paramètre (pour compatibilité)
        if (options) {
            const { 
                bodyEffectIds, 
                spiritualEffectIds, 
                emotionalEffectIds,
                rechargementTypeIds,
                purificationTypeIds,
                craftedFormIds,
                chakraIds,
                contraindicationIds
            } = options;
            
            if (bodyEffectIds && bodyEffectIds.length > 0) {
                whereConditions.bodyEffectIds = { hasSome: bodyEffectIds };
            }
            
            if (spiritualEffectIds && spiritualEffectIds.length > 0) {
                whereConditions.spiritualEffectIds = { hasSome: spiritualEffectIds };
            }
            
            if (emotionalEffectIds && emotionalEffectIds.length > 0) {
                whereConditions.emotionalEffectIds = { hasSome: emotionalEffectIds };
            }
            
            if (rechargementTypeIds && rechargementTypeIds.length > 0) {
                whereConditions.rechargementTypeIds = { hasSome: rechargementTypeIds };
            }
            
            if (purificationTypeIds && purificationTypeIds.length > 0) {
                whereConditions.purificationTypeIds = { hasSome: purificationTypeIds };
            }
            
            if (craftedFormIds && craftedFormIds.length > 0) {
                whereConditions.craftedFormIds = { hasSome: craftedFormIds };
            }
            
            if (chakraIds && chakraIds.length > 0) {
                whereConditions.chakraIds = { hasSome: chakraIds };
            }
            
            if (contraindicationIds && contraindicationIds.length > 0) {
                whereConditions.contraindicationIds = { hasSome: contraindicationIds };
            }
        }

        const stones = await prisma.stone.findMany({
            where: whereConditions,
            include: {
                pictures: true,
                bodyEffects: true,
                spiritualEffects: true,
                emotionalEffects: true,
                rechargementTypes: true,
                purificationTypes: true,
                craftedForms: true,
                chakras: true,
                contraindications: true
            }
        });
        
        return stones;
    } catch (error) {
        console.error("Erreur lors de la recherche des pierres:", error);
        throw new Error("Impossible de rechercher les pierres");
    }
}

