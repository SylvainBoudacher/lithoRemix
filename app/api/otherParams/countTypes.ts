import prisma from '~/lib/prismaDb';

export const countOtherParams = async () => {
    const [chakras, contraindications, craftedForms] = await Promise.all([
        prisma.chakra.findMany(),
        prisma.contraindication.findMany(),
        prisma.craftedForm.findMany()
    ]);

    return {
        craftedForms: craftedForms.length,
        chakras: chakras.length,
        contraindications: contraindications.length,
    };
};
