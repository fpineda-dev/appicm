export class Deductions {
    /**
     * 
     * @param {like<Deductions> dataDeductions}
     */

    constructor({ name_help, speccial_help, name_pastor, payment_pastor, tithe_of_tithes, id_financial_statements, id_department}) {
        this.name_help = name_help,
        this.speccial_help = speccial_help,
        this.name_pastor = name_pastor,
        this.payment_pastor = payment_pastor,
        this.tithe_of_tithes = tithe_of_tithes,
        this.id_financial_statements = id_financial_statements, 
        this.id_department = id_department        
    }
    
    
    
}