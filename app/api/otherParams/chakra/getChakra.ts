import prisma from '~/lib/prismaDb';

export async function getChakras() {
  try {
    const chakras = await prisma.chakra.findMany({
      select: {
        id: true,
        number: true,
      },
      orderBy: {
        number: 'asc'
      }
    });

    return chakras;

  } catch (error) {
    console.error("Erreur lors de la récupération des chakras:", error);
    throw new Error("Impossible de récupérer les chakras");
  }
}

export async function getChakraById(id: string) {
  try {
    const chakra = await prisma.chakra.findUnique({
      where: { id },
      select: {
        id: true,
        number: true,
      },
    });
    return chakra;
  } catch (error) {
    console.error("Erreur lors de la récupération du chakra:", error);
    throw new Error("Impossible de récupérer le chakra");
  }
}

export async function getChakrasWithStones() {
  try {
    const chakras = await prisma.chakra.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les effets spirituels liés à au moins une pierre
        }
      },
      select: {
        id: true,
        number: true,
      },
      orderBy: {
        number: 'asc'
      }
    });

    return chakras;
  } catch (error) {
    console.error("Erreur lors de la récupération des chakras liés aux pierres:", error);
    throw new Error("Impossible de récupérer les chakras liés aux pierres");
  }
}