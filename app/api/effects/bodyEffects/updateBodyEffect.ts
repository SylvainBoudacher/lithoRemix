import prisma from '~/lib/prismaDb';

export async function updateBodyEffect(id: string, effect: string) {
  try {
    const bodyEffect = await prisma.bodyEffect.update({
      where: { id },
      data: { effect },
    });
    return bodyEffect;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'effet corporel:", error);
    throw new Error("Impossible de mettre à jour l'effet corporel");
  }
}
