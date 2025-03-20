import prisma from '~/lib/prismaDb';


export async function getCraftedForms() {
  try {
    const craftedForms = await prisma.craftedForm.findMany({
      select: {
        id: true,
        form: true,
      },
      orderBy: {
        form: 'asc'
      }
    });

    return craftedForms;

  } catch (error) {
    console.error("Erreur lors de la récupération des formes artisanales:", error);
    throw new Error("Impossible de récupérer les formes artisanales");
  }
}

export async function getCraftedFormById(id: string) {
  try {
    const craftedForm = await prisma.craftedForm.findUnique({
      where: { id },
      select: {
        id: true,
        form: true,
      },
    });
    return craftedForm;
  } catch (error) {
    console.error("Erreur lors de la récupération de la forme artisanale:", error);
    throw new Error("Impossible de récupérer la forme artisanale");
  }
}

export async function getCraftedFormsWithStones() {
  try {
    const craftedForms = await prisma.craftedForm.findMany({
      where: {
        stones: {
          some: {} // Filtre pour ne récupérer que les formes artisanales liés à au moins une pierre
        }
      },
      select: {
        id: true,
        form: true,
      },
      orderBy: {
        form: 'asc'
      }
    });

    return craftedForms;
  } catch (error) {
    console.error("Erreur lors de la récupération des formes artisanales liés aux pierres:", error);
    throw new Error("Impossible de récupérer les formes artisanales liés aux pierres");
  }
}
