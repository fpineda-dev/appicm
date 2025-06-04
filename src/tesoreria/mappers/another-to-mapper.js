import { AnotherEntries } from "../models/another-entries.js";
/**
 * 
 * @param {like<Another>} LocalAnother
 * @return {Another}
 */

export const anotherMapperToModel = ( localAnother ) => {

    const {
        id_financial_statements, 
        decimator_number, 
        amount_tithes, 
        another_number_concept, 
        amount_another_concept,                  
    } = localAnother;

    return new AnotherEntries({
        id_financial_statements, 
        decimator_number, 
        amount_tithes, 
        another_number_concept, 
        amount_another_concept,                  
    });
}