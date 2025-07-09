import { Mail } from "../models/mail.js"
/**
 * 
 * @param {like<Mail>} LocalMail
 * @return {Id}
 */

export const mailMapperToModel = ( localMail ) => {

    const {
        sendfrom, 
        sendto, 
        sendsubject, 
        textbody
    } = localMail;

    return new Mail({
        sendfrom, 
        sendto, 
        sendsubject, 
        textbody
    });
}