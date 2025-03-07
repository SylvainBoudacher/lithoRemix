import { getChakraById, getChakras } from "./chakra/getChakra";
import { getContraindicationById, getContraindications } from "./contraindication/getContraindication";
import { getCraftedFormById, getCraftedForms } from "./craftedForm/getCraftedForm";
import { OtherParamChoice } from "./createTypes";

export const getOtherParams = async (type: OtherParamChoice) => {
    switch (type) {
        case 'chakra':
            return getChakras();
        case 'contraindication':
            return getContraindications();
        case 'craftedForm':
            return getCraftedForms();
    }
}

export const getOtherParamById = async (type: OtherParamChoice, id: string) => {
    switch (type) {
        case 'chakra':
            return getChakraById(id);
        case 'contraindication':
            return getContraindicationById(id);
        case 'craftedForm':
            return getCraftedFormById(id);
    }
}
