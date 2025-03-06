import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Création des effets corporels
    const bodyEffect = await prisma.bodyEffect.create({
      data: {
        effect: "Tête",
      },
    });

    // Création des effets spirituels
    const spiritualEffect = await prisma.spiritualEffect.create({
      data: {
        effect: "Méditation profonde",
      },
    });

    // Création des effets émotionnels
    const emotionalEffect = await prisma.emotionalEffect.create({
      data: {
        effect: "Apaisement",
      },
    });

    // Création des types de rechargement
    const rechargementType = await prisma.rechargementType.create({
      data: {
        type: "Lumière lunaire",
      },
    });

    // Création des types de purification
    const purificationType = await prisma.purificationType.create({
      data: {
        type: "Lune",
      },
    });

    // Création des formes travaillées
    const craftedForm = await prisma.craftedForm.create({
      data: {
        form: "Pendentif",
      },
    });

    // Création des chakras
    const chakra = await prisma.chakra.create({
      data: {
        number: 1,
        name: "Racine",
      },
    });

    // Création des contre-indications
    const contraindication = await prisma.contraindication.create({
      data: {
        contraindication: "Grossesse",
      },
    });

    // Création d'une pierre avec toutes les relations
    const stone = await prisma.stone.create({
      data: {
        name: "Quartz Rose",
        description: "Pierre de l'amour inconditionnel",
        bodyEffectIds: [bodyEffect.id],
        spiritualEffectIds: [spiritualEffect.id],
        emotionalEffectIds: [emotionalEffect.id],
        rechargementTypeIds: [rechargementType.id],
        purificationTypeIds: [purificationType.id],
        craftedFormIds: [craftedForm.id],
        chakraIds: [chakra.id],
        contraindicationIds: [contraindication.id],
      },
    });

    // Création d'une image pour la pierre
    const picture = await prisma.picture.create({
      data: {
        url: "https://letempleyogi.com/cdn/shop/articles/le-quartz-rose.jpg?v=1640799253",
        stoneId: stone.id,
      },
    });

    console.log('Seed réussi:', {
      stone,
      bodyEffect,
      spiritualEffect,
      emotionalEffect,
      rechargementType,
      purificationType,
      craftedForm,
      chakra,
      contraindication,
      picture,
    });
  } catch (error) {
    console.error('Erreur pendant le seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
  });