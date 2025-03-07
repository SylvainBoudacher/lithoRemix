import { TypeChoice } from "./createTypes";
import { destroyPurificationType } from "./purification/destroyPurificationType";
import { destroyRechargementType } from "./rechargement/destroyRechargementType";


export const destroyType = async (type: TypeChoice, id: string) => {
    switch (type) {
        case 'purification':
            return destroyPurificationType(id);
        case 'rechargement':
            return destroyRechargementType(id);
    }
}
