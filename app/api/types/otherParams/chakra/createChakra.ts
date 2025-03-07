import prisma from '~/lib/prismaDb';

export async function createChakra(number: number) {
  try {
    const chakra = await prisma.chakra.create({
      data: {
        number,
      },
    });
    return chakra;
  } catch (error) {
    console.error("Erreur lors de la création du chakra:", error);
    throw new Error("Impossible de créer le chakra");
  }
}