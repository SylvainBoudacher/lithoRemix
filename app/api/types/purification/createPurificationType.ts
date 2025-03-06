import prisma from '~/lib/prismaDb';

export async function createPurificationType(type: string) {
  try {
    const purificationType = await prisma.purificationType.create({
      data: {
        type,
      },
    });
    return purificationType;
  } catch (error) {
    console.error("Erreur lors de la création du type de purification:", error);
    throw new Error("Impossible de créer le type de purification");
  }
}