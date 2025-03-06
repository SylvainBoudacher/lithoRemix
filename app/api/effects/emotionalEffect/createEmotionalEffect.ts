import prisma from '~/lib/prismaDb';

export async function createEmotionalEffect(effect: string) {
  try {
    const emotionalEffect = await prisma.emotionalEffect.create({
      data: {
        effect,
      },
    });
    return emotionalEffect;
  } catch (error) {
    console.error("Erreur lors de la création de l'effet émotionnel:", error);
    throw new Error("Impossible de créer l'effet émotionnel");
  }
}