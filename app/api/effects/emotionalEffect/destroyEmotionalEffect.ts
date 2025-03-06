import prisma from '~/lib/prismaDb';

export async function destroyEmotionalEffect(id: string) {
  await prisma.emotionalEffect.delete({
    where: { id },
  });
}