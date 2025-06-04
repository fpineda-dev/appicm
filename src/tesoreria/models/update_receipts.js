export class updateReceipts {
    /**
     * 
     * @param {like<updateReceipts> dataUpdateReceipts}
     */

    constructor({ id_receipts, id_financial_statements }) {
        this.id_financial_statements = id_financial_statements,
        this.id_receipts = id_receipts
    }
}