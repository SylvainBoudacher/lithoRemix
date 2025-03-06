import { getBodyEffectById, getBodyEffects } from "./bodyEffects/getBodyEffects";
import { getEmotionalEffect, getEmotionalEffectById } from "./emotionalEffect/getEmotionalEffect";
import { getSpiritualEffect, getSpiritualEffectById } from "./spiritualEffect/getSpiritualEffect";

export type EffectChoice = 'body' | 'spiritual' | 'emotional';


export const getEffects = async (effect: EffectChoice) => {
    switch (effect) {
        case 'body':
            return getBodyEffects();
        case 'spiritual':
            return getSpiritualEffect();
        case 'emotional':
            return getEmotionalEffect();
    }
}

export const getEffectById = async (effect: EffectChoice, id: string) => {
    switch (effect) {
        case 'body':
            return getBodyEffectById(id);
        case 'spiritual':
            return getSpiritualEffectById(id);
        case 'emotional':
            return getEmotionalEffectById(id);
    }
}
