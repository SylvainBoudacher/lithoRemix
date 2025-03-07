import prisma from '~/lib/prismaDb';

export async function updateChakra(id: string, number: number) {
  try {
    const chakra = await prisma.chakra.update({
      where: { id },
      data: { number },
    });
    return chakra;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du chakra:", error);
    throw new Error("Impossible de mettre à jour le chakra");
  }
}
