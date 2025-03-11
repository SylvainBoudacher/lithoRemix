import prisma from '~/lib/prismaDb';

export async function destroyStone(id: string) {
    await prisma.stone.delete({
        where: { id }
    });
}