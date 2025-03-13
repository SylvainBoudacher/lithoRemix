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
