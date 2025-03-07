import { createChakra } from "./chakra/createChakra";
import { createContraindication } from "./contraindication/createContraindication";
import { createCraftedForm } from "./craftedForm/createCraftedForm";

export type OtherParamChoice = 'chakra' | 'contraindication' | 'craftedForm';

export const createOtherParam = async (type: OtherParamChoice, name: string) => {
    switch (type) {
        case 'chakra':
            return createChakra(Number(name));
        case 'contraindication':
            return createContraindication(name);
        case 'craftedForm':
            return createCraftedForm(name);
    }
}