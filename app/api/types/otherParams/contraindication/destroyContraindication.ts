import prisma from '~/lib/prismaDb';

export async function destroyContraindication(id: string) {
  await prisma.contraindication.delete({
    where: { id },
  });
}