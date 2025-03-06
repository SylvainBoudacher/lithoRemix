import prisma from '~/lib/prismaDb';

export async function createRechargementType(type: string) {
  try {
    const rechargementType = await prisma.rechargementType.create({
      data: {
        type,
      },
    });
    return rechargementType;
  } catch (error) {
    console.error("Erreur lors de la création du type de rechargement:", error);
    throw new Error("Impossible de créer le type de rechargement");
  }
}