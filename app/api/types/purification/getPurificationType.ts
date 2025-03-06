import prisma from '~/lib/prismaDb';


export async function getPurificationTypes() {
  try {
    const purificationTypes = await prisma.purificationType.findMany({
      select: {
        id: true,
        type: true,
      },
      orderBy: {
        type: 'asc'
      }
    });

    return purificationTypes;

  } catch (error) {
    console.error("Erreur lors de la récupération des types de purification:", error);
    throw new Error("Impossible de récupérer les types de purification");
  }
}

export async function getPurificationTypeById(id: string) {
  try {
    const purificationType = await prisma.purificationType.findUnique({
      where: { id },
    });
    return purificationType;
  } catch (error) {
    console.error("Erreur lors de la récupération du type de purification:", error);
    throw new Error("Impossible de récupérer le type de purification");
  }
}
