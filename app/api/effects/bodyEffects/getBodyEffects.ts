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
