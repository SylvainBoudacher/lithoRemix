import { createPurificationType } from "./purification/createPurificationType";
import { createRechargementType } from "./rechargement/createRechargementType";

export type TypeChoice = 'purification' | 'rechargement';

export const createType = async (type: TypeChoice, name: string) => {
    switch (type) {
        case 'purification':
            return createPurificationType(name);
        case 'rechargement':
            return createRechargementType(name);
    }
}