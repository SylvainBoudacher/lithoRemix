import prisma from '~/lib/prismaDb';


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

export async function getEmotionalEffectById(id: string) {
  try {
    const emotionalEffect = await prisma.emotionalEffect.findUnique({
      where: { id },
    });
    return emotionalEffect;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'effet émotionnel:", error);
    throw new Error("Impossible de récupérer l'effet émotionnel");
  }
}

export async function getEmotionalEffectsWithStones() {
  try {
    const emotionalEffects = await prisma.emotionalEffect.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les effets émotionnels liés à au moins une pierre
        }
      },
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
    console.error("Erreur lors de la récupération des effets émotionnels liés aux pierres:", error);
    throw new Error("Impossible de récupérer les effets émotionnels liés aux pierres");
  }
}
