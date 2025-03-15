import prisma from '~/lib/prismaDb';


export async function getBodyEffects() {
  try {
    const bodyEffects = await prisma.bodyEffect.findMany({
      select: {
        id: true,
        effect: true,
      },
      orderBy: {
        effect: 'asc'
      }
    });

    return bodyEffects;
    
  } catch (error) {
    console.error("Erreur lors de la récupération des effets corporels:", error);
    throw new Error("Impossible de récupérer les effets corporels");
  }
}

export async function getBodyEffectById(id: string) {
  try {
    const bodyEffect = await prisma.bodyEffect.findUnique({
      where: { id },
    });
    return bodyEffect;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'effet corporel:", error);
    throw new Error("Impossible de récupérer l'effet corporel");
  }
}

export async function getBodyEffectsWithStones() {
  try {
    const bodyEffects = await prisma.bodyEffect.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les effets corporels liés à au moins une pierre
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

    return bodyEffects;
  } catch (error) {
    console.error("Erreur lors de la récupération des effets corporels liés aux pierres:", error);
    throw new Error("Impossible de récupérer les effets corporels liés aux pierres");
  }
}


