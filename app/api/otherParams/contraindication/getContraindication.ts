import prisma from '~/lib/prismaDb';


export async function getContraindications() {
  try {
    const contraindications = await prisma.contraindication.findMany({
      select: {
        id: true,
        contraindicationName: true,
      },
      orderBy: {
        contraindicationName: 'asc'
      }
    });

    return contraindications;

  } catch (error) {
    console.error("Erreur lors de la récupération des contraindications:", error);
    throw new Error("Impossible de récupérer les contraindications");
  }
}

export async function getContraindicationById(id: string) {
  try {
    const contraindication = await prisma.contraindication.findUnique({
      where: { id },
      select: {
        id: true,
        contraindicationName: true,
      },
    });
    return contraindication;
  } catch (error) {
    console.error("Erreur lors de la récupération du contraindication:", error);
    throw new Error("Impossible de récupérer le contraindication");
  }
}

export async function getContraindicationsWithStones() {
  try {
    const contraindications = await prisma.contraindication.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les contraindications liés à au moins une pierre
        }
      },
      select: {
        id: true,
        contraindicationName: true,
      },
      orderBy: {
        contraindicationName: 'asc'
      }
    });

    return contraindications;
  } catch (error) {
    console.error("Erreur lors de la récupération des contraindications liés aux pierres:", error);
    throw new Error("Impossible de récupérer les contraindications liés aux pierres");
  }
}
