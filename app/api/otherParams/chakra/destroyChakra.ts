import prisma from '~/lib/prismaDb';

export async function destroyChakra(id: string) {
  await prisma.chakra.delete({
    where: { id },
  });
}