import prisma from '~/lib/prismaDb';

export async function updateEmotionalEffect(id: string, effect: string) {
  try {
    const emotionalEffect = await prisma.emotionalEffect.update({
      where: { id },
      data: { effect },
    });
    return emotionalEffect;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'effet émotionnel:", error);
    throw new Error("Impossible de mettre à jour l'effet émotionnel");
  }
}
