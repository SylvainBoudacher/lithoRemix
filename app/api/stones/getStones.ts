import prisma from '~/lib/prismaDb';

export async function getStones() {
    try {
        const stones = await prisma.stone.findMany();
        return stones;
    } catch (error) {
        console.error("Erreur lors de la récupération des pierres:", error);
        throw new Error("Impossible de récupérer les pierres");
    }
}

export async function getStoneById(id: string) {
    try {
        const stone = await prisma.stone.findUnique({ where: { id } });
        return stone;
    } catch (error) {
        console.error("Erreur lors de la récupération de la pierre:", error);
        throw new Error("Impossible de récupérer la pierre");
    }
}
