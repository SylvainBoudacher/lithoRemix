import prisma from '~/lib/prismaDb';

export async function destroySpiritualEffect(id: string) {
  await prisma.spiritualEffect.delete({
    where: { id },
  });
}