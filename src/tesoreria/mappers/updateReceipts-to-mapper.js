import { updateReceipts } from "../models/update_receipts.js"
/**
 * 
 * @param {like<updateReceipts>} LocalUpdateReceipts
 * @return {Receipt}
 */

export const receiptMapperToModel = ( localUpdateReceipts ) => {

    const {
        id_receipts,
        id_financial_statements
    } = localUpdateReceipts;

    return new updateReceipts({
        id_receipts,
        id_financial_statements
    });
}