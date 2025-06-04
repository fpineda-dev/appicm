export class Receipts {
    /**
     * 
     * @param {like<Receipts> dataReceipts}
     */

    constructor({ id_financial_statements, number, amount, receipt }) {
        this.id_financial_statements = id_financial_statements,
        this.number = number,
        this.amount = amount,
        this.receipt = receipt        
    }
}