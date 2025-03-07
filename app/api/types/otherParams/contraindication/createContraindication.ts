import prisma from '~/lib/prismaDb';

export async function createContraindication(contraindicationName: string) {
  try {
    const contraindication = await prisma.contraindication.create({
      data: {
        contraindicationName,
      },
    });
    return contraindication;
  } catch (error) {
    console.error("Erreur lors de la création du contraindication:", error);
    throw new Error("Impossible de créer le contraindication");
  }
}