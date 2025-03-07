import { updateChakra } from "./chakra/updateChakra";
import { updateContraindication } from "./contraindication/updateContraindication";
import { updateCraftedForm } from "./craftedForm/updateCraftedForm";
import { OtherParamChoice } from "./createTypes";

export const updateOtherParam = async (type: OtherParamChoice, id: string, name: string) => {
    switch (type) {
        case 'chakra':
            return updateChakra(id, Number(name));
        case 'contraindication':
            return updateContraindication(id, name);
        case 'craftedForm':
            return updateCraftedForm(id, name);
    }
}