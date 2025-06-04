
import { ReceiptFiles } from "../models/filereceipts.js"
/**
 * 
 * @param {like<ImgFile>} LocalImg
 * @return {ReceiptFiles}
 */

export const imgMapperToModel = ( localImg ) => {

    const {
        id_financial_statements, 
        number, 
        amount, 
        receipt
    } = localImg;

    return new ReceiptFiles({
        id_financial_statements, 
        number, 
        amount, 
        receipt
    });
}