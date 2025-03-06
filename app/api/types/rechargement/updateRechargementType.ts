import prisma from '~/lib/prismaDb';

export async function updateRechargementType(id: string, type: string) {
  try {
    const rechargementType = await prisma.rechargementType.update({
      where: { id },
      data: { type },
    });
    return rechargementType;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du type de rechargement:", error);
    throw new Error("Impossible de mettre à jour le type de rechargement");
  }
}
