import { getBodyEffects } from "./bodyEffects/getBodyEffects";
import { getEmotionalEffect } from "./emotionalEffect/getEmotionalEffect";
import { getSpiritualEffect } from "./spiritualEffect/getSpiritualEffect";

export type EffectChoice = 'body' | 'spiritual' | 'emotional';


export const getEffect = async (effect: EffectChoice) => {
    switch (effect) {
        case 'body':
            return getBodyEffects();
        case 'spiritual':
            return getSpiritualEffect();
        case 'emotional':
            return getEmotionalEffect();
    }
}