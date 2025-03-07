import { destroyChakra } from "./chakra/destroyChakra";
import { destroyContraindication } from "./contraindication/destroyContraindication";
import { destroyCraftedForm } from "./craftedForm/destroyCraftedForm";
import { OtherParamChoice } from "./createOther";


export const destroyOtherParam = async (type: OtherParamChoice, id: string) => {
    switch (type) {
        case 'chakra':
            return destroyChakra(id);
        case 'contraindication':
            return destroyContraindication(id);
        case 'craftedForm':
            return destroyCraftedForm(id);
    }
}
