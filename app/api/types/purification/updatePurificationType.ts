import prisma from '~/lib/prismaDb';

export async function updatePurificationType(id: string, type: string) {
  try {
    const purificationType = await prisma.purificationType.update({
      where: { id },
      data: { type },
    });
    return purificationType;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du type de purification:", error);
    throw new Error("Impossible de mettre à jour le type de purification");
  }
}
