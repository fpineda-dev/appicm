export class Receipts {
    /**
     * 
     * @param {like<Receipts> dataReceipts}
     */

    constructor({ created_at, total, deductions }) {
        this.created_at = created_at,
        this.total = total,
        this.deductions = deductions 
    }
}