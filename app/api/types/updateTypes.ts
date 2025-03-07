import { TypeChoice } from "./createTypes";
import { updatePurificationType } from "./purification/updatePurificationType";
import { updateRechargementType } from "./rechargement/updateRechargementType";

export const updateType = async (type: TypeChoice, id: string, name: string) => {
    switch (type) {
        case 'purification':
            return updatePurificationType(id, name);
        case 'rechargement':
            return updateRechargementType(id, name);
    }
}