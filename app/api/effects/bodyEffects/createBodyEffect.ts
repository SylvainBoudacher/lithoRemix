import prisma from '~/lib/prismaDb';

export async function createBodyEffect(effect: string) {
  try {
    const bodyEffect = await prisma.bodyEffect.create({
      data: {
        effect,
      },
    });
    return bodyEffect;
  } catch (error) {
    console.error("Erreur lors de la création de l'effet corporel:", error);
    throw new Error("Impossible de créer l'effet corporel");
  }
}