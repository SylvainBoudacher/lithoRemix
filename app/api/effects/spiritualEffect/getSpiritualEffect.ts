import prisma from '~/lib/prismaDb';


export async function getSpiritualEffect() {
  try {
    const spiritualEffects = await prisma.spiritualEffect.findMany({
      select: {
        id: true,
        effect: true,
      },
      orderBy: {
        effect: 'asc'
      }
    });

    return spiritualEffects;
    
  } catch (error) {
    console.error("Erreur lors de la récupération des effets spirituels:", error);
    throw new Error("Impossible de récupérer les effets spirituels");
  }
}
