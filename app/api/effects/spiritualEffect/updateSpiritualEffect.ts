import prisma from '~/lib/prismaDb';

export async function updateSpiritualEffect(id: string, effect: string) {
  try {
    const spiritualEffect = await prisma.spiritualEffect.update({
      where: { id },
      data: { effect },
    });
    return spiritualEffect;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'effet spirituel:", error);
    throw new Error("Impossible de mettre à jour l'effet spirituel");
  }
}
