import { mailMapperToModel } from '../mappers/mail-to-mapper.js';
import { Mail } from '../models/mail.js';


/**
 * 
 * @param {like<Mails>} maillike
 */

export const sendMail = async( mailLike ) => {      

    try {

        let ObjResult = JSON.stringify(mailLike, null, 4);

        const mails = new Mail( mailLike );
        if (mails.sendto === "" ) {
            throw 'the destinatary is required';
        }

        console.log(`mail Covert ${JSON.stringify(mails)}`);
        

    const mailToSend = mailMapperToModel( mails )

      console.log(`[sendMail] The Object is: ${JSON.stringify(mailLike, null, 4)}` );
    

    const mailSend = await createMail( mailToSend );
    return mailSend
        
    } catch (error) {
        if (!(error instanceof Error)) {
           error = new Error(error);
        }
        console.log(`Name Error: ${error.name}`);        
        console.error(`Error: ${error.message}`);
        console.log(`Stack Error: ${error.stack}`);
        
    }

    
}

/**
 * 
 * @param {like<Mail>} mail
 */

const createMail = async(mailBody) => {

    const uppercasedObject = convertKeysToUpperCase(mailBody);
     console.log(uppercasedObject); 

    

        const url = `http://localhost:3000/api/send_mail`; // https://apicm.onrender.com/api/receipts
        const res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(uppercasedObject),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        },
        //console.info("Los recibos han sido guardados 🧾")
        /*Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El correo ha sido enviado",
            showCancelButton: false,
            timer: 2000
        })*/
       )
        
    
    


console.log(`Response of Save ${res}`);

const newMail = await res.json();
console.log({ newMail });
return newMail;


}


function convertKeysToUpperCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toUpperCase()] = obj[key];
    return acc;
  }, {});
}