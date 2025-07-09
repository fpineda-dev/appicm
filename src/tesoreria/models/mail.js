export class Mail {
    /**
     * 
     * @param {like<Mail> dataMail}
     */

    constructor({ sendfrom, sendto, sendsubject, textbody }) {
        this.sendfrom = sendfrom,
        this.sendto = sendto,
        this.sendsubject = sendsubject,
        this.textbody = textbody        
    }
}