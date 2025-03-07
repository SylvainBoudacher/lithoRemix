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
