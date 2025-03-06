import prisma from '~/lib/prismaDb';

export async function destroyBodyEffect(id: string) {
  await prisma.bodyEffect.delete({
    where: { id },
  });
}