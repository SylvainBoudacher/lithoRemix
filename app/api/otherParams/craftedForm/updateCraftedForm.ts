import prisma from '~/lib/prismaDb';

export async function updateCraftedForm(id: string, form: string) {
  try {
    const craftedForm = await prisma.craftedForm.update({
      where: { id },
      data: { form },
    });
    return craftedForm;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la forme artisanale:", error);
    throw new Error("Impossible de mettre à jour la forme artisanale");
  }
}
