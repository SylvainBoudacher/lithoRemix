import prisma from '~/lib/prismaDb';

interface CreateStoneInput {
    name: string;
    description?: string;
    bodyEffectIds?: string[];
    spiritualEffectIds?: string[];
    emotionalEffectIds?: string[];
    rechargementTypeIds?: string[];
    purificationTypeIds?: string[];
    craftedFormIds?: string[];
    chakraIds?: string[];
    contraindicationIds?: string[];
    pictures?: { url: string }[];
}

export async function createStone(input: CreateStoneInput) {
    try {
        const newStone = await prisma.stone.create({
            data: {
                name: input.name,
                description: input.description,
                bodyEffectIds: input.bodyEffectIds || [],
                spiritualEffectIds: input.spiritualEffectIds || [],
                emotionalEffectIds: input.emotionalEffectIds || [],
                rechargementTypeIds: input.rechargementTypeIds || [],
                purificationTypeIds: input.purificationTypeIds || [],
                craftedFormIds: input.craftedFormIds || [],
                chakraIds: input.chakraIds || [],
                contraindicationIds: input.contraindicationIds || [],
                pictures: input.pictures ? {
                    create: input.pictures
                } : undefined
            },
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
        return newStone;
    } catch (error) {
        console.error("Erreur lors de la création de la pierre:", error);
        throw new Error("Impossible de créer la pierre");
    }
}