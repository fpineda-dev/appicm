import { Receipts } from "../models/receipts.js"
/**
 * 
 * @param {like<Receipts>} LocalReceipt
 * @return {Receipt}
 */

export const receiptMapperToModel = ( localReceipt ) => {

    const {
        id_financial_statements,
        number,
        amount,
        receipt
    } = localReceipt;

    return new Receipts({
        id_financial_statements,
        number,
        amount,
        receipt
    });
}