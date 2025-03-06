import prisma from '~/lib/prismaDb';

export async function destroyPurificationType(id: string) {
  await prisma.purificationType.delete({
    where: { id },
  });
}