import prisma from '~/lib/prismaDb';

export const countEffects = async () => {
    const [bodyEffects, spiritualEffects, emotionalEffects] = await Promise.all([
        prisma.bodyEffect.findMany(),
        prisma.spiritualEffect.findMany(),
        prisma.emotionalEffect.findMany()
    ]);

    return {
        body: bodyEffects.length,
        spiritual: spiritualEffects.length,
        emotional: emotionalEffects.length,
    };
};
