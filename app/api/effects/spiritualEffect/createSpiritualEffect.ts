import prisma from '~/lib/prismaDb';

export async function createSpiritualEffect(effect: string) {
  try {
    const spiritualEffect = await prisma.spiritualEffect.create({
      data: {
        effect,
      },
    });
    return spiritualEffect;
  } catch (error) {
    console.error("Erreur lors de la création de l'effet spirituel:", error);
    throw new Error("Impossible de créer l'effet spirituel");
  }
}