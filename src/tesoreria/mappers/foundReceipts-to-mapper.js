import { Receipts } from "../models/found_receipts.js"
/**
 * 
 * @param {like<Receipts>} LocalReceipts
 * @return {Receipt}
 */

export const foundReceiptMapperToModel = ( localReceipts ) => {

    const {
        created_at,
        total,
        deductions
    } = localReceipts;

    return new Receipts({
        created_at,
        total,
        deductions
    });
}