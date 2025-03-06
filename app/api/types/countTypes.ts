import prisma from '~/lib/prismaDb';

export const countTypes = async () => {
    const [purificationTypes, rechargementTypes] = await Promise.all([
        prisma.purificationType.findMany(),
        prisma.rechargementType.findMany()
    ]);

    return {
        rechargement: rechargementTypes.length,
        purification: purificationTypes.length,
    };
};
