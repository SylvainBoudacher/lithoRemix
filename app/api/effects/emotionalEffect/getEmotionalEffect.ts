import prisma from '~/lib/prismadb';


export async function getEmotionalEffect() {
  try {
    const emotionalEffects = await prisma.emotionalEffect.findMany({
      select: {
        id: true,
        effect: true,
      },
      orderBy: {
        effect: 'asc'
      }
    });

    return emotionalEffects;
    
  } catch (error) {
    console.error("Erreur lors de la récupération des effets émotionnels:", error);
    throw new Error("Impossible de récupérer les effets émotionnels");
  }
}
