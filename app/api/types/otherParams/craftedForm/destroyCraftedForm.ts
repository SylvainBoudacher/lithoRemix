import prisma from '~/lib/prismaDb';

export async function destroyCraftedForm(id: string) {
  await prisma.craftedForm.delete({
    where: { id },
  });
}