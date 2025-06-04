import { Deductions } from "../models/deductions.js"
/**
 * 
 * @param {like<Deductions>} LocalDeduction
 * @return {Deduction}
 */

export const deductionMapperToModel = ( localDeduction ) => {

    const {
        name_help, 
        speccial_help, 
        name_pastor, 
        payment_pastor, 
        tithe_of_tithes,
        id_financial_statements, 
        id_department
    } = localDeduction;

    return new Deductions({
        name_help, 
        speccial_help, 
        name_pastor, 
        payment_pastor, 
        tithe_of_tithes,
        id_financial_statements, 
        id_department
    });
}