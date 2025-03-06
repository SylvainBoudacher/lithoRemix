import { destroyBodyEffect } from "./bodyEffects/destroyBodyEffect";
import { destroyEmotionalEffect } from "./emotionalEffect/destroyEmotionalEffect";
import { destroySpiritualEffect } from "./spiritualEffect/destroySpiritualEffect";

export type EffectChoice = 'body' | 'spiritual' | 'emotional';


export const destroyEffect = async (effect: EffectChoice, id: string) => {
    switch (effect) {
        case 'body':
            return destroyBodyEffect(id);
        case 'spiritual':
            return destroySpiritualEffect(id);
        case 'emotional':
            return destroyEmotionalEffect(id);
    }
}