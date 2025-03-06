import prisma from '~/lib/prismaDb';

export async function destroyRechargementType(id: string) {
  await prisma.rechargementType.delete({
    where: { id },
  });
}