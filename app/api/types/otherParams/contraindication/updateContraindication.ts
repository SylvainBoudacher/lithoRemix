import prisma from '~/lib/prismaDb';

export async function updateContraindication(id: string, contraindicationName: string) {
  try {
    const contraindication = await prisma.contraindication.update({
      where: { id },
      data: { contraindicationName },
    });
    return contraindication;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contraindication:", error);
    throw new Error("Impossible de mettre à jour le contraindication");
  }
}
