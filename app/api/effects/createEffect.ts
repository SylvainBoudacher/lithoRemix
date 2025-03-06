import { createBodyEffect } from "./bodyEffects/createBodyEffect";
import { createEmotionalEffect } from "./emotionalEffect/createEmotionalEffect";
import { createSpiritualEffect } from "./spiritualEffect/createSpiritualEffect";

export type EffectChoice = 'body' | 'spiritual' | 'emotional';


export const createEffect = async (effect: EffectChoice, name: string) => {
    switch (effect) {
        case 'body':
            return createBodyEffect(name);
        case 'spiritual':
            return createSpiritualEffect(name);
        case 'emotional':
            return createEmotionalEffect(name);
    }
}