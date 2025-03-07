import prisma from '~/lib/prismaDb';

export async function createCraftedForm(form: string) {
  try {
    const craftedForm = await prisma.craftedForm.create({
      data: {
        form,
      },
    });
    return craftedForm;
  } catch (error) {
    console.error("Erreur lors de la création de la forme artisanale:", error);
    throw new Error("Impossible de créer la forme artisanale");
  }
}