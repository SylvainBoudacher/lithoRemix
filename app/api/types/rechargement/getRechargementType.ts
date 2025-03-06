import prisma from '~/lib/prismaDb';


export async function getRechargementTypes() {
  try {
    const rechargementTypes = await prisma.rechargementType.findMany({
      select: {
        id: true,
        type: true,
      },
      orderBy: {
        type: 'asc'
      }
    });

    return rechargementTypes;

  } catch (error) {
    console.error("Erreur lors de la récupération des types de rechargement:", error);
    throw new Error("Impossible de récupérer les types de rechargement");
  }
}

export async function getRechargementTypeById(id: string) {
  try {
    const rechargementType = await prisma.rechargementType.findUnique({
      where: { id },
    });
    return rechargementType;
  } catch (error) {
    console.error("Erreur lors de la récupération du type de rechargement:", error);
    throw new Error("Impossible de récupérer le type de rechargement");
  }
}
