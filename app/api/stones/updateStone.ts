import prisma from '~/lib/prismaDb';

interface UpdateStoneInput {
    name?: string;
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

export async function updateStone(id: string, input: UpdateStoneInput) {

    try {
        const updatedStone = await prisma.stone.update({
            where: { id },
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
                    deleteMany: {},
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
        return updatedStone;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la pierre:", error);
        throw new Error("Impossible de mettre à jour la pierre");
    }
}
