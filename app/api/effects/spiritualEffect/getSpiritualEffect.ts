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

export async function getSpiritualEffectById(id: string) {
  try {
    const spiritualEffect = await prisma.spiritualEffect.findUnique({
      where: { id },
    });
    return spiritualEffect;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'effet spirituel:", error);
    throw new Error("Impossible de récupérer l'effet spirituel");
  }
}

export async function getSpiritualEffectsWithStones() {
  try {
    const spiritualEffects = await prisma.spiritualEffect.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les effets spirituels liés à au moins une pierre
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

    return spiritualEffects;
  } catch (error) {
    console.error("Erreur lors de la récupération des effets spirituels liés aux pierres:", error);
    throw new Error("Impossible de récupérer les effets spirituels liés aux pierres");
  }
}
