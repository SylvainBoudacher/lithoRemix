import { updateBodyEffect } from "./bodyEffects/updateBodyEffect";
import { updateEmotionalEffect } from "./emotionalEffect/updateEmotionalEffect";
import { updateSpiritualEffect } from "./spiritualEffect/updateSpiritualEffect";

export type EffectChoice = 'body' | 'spiritual' | 'emotional';


export const updateEffect = async (effect: EffectChoice, id: string, effectName: string) => {
    switch (effect) {
        case 'body':
            return updateBodyEffect(id, effectName);
        case 'spiritual':
            return updateSpiritualEffect(id, effectName);
        case 'emotional':
            return updateEmotionalEffect(id, effectName);
    }
}

