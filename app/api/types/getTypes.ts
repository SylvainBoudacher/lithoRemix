import { TypeChoice } from "./createTypes";
import { getPurificationTypeById, getPurificationTypes } from "./purification/getPurificationType";
import { getRechargementTypeById, getRechargementTypes } from "./rechargement/getRechargementType";

export const getTypes = async (type: TypeChoice) => {
    switch (type) {
        case 'purification':
            return getPurificationTypes();
        case 'rechargement':
            return getRechargementTypes();
    }
}

export const getTypesById = async (type: TypeChoice, id: string) => {
    switch (type) {
        case 'purification':
            return getPurificationTypeById(id);
        case 'rechargement':
            return getRechargementTypeById(id);
    }
}
