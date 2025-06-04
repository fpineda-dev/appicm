import { receiptMapperToModel  } from '../mappers/receipt-to-mapper.js';
import { Receipts } from '../models/receipts.js';
//import Swal from 'sweetalert2'

/**
 * 
 * @param {like<Receipts>} Receiptslike
 */

export const saveReceipts = async( receiptsLike ) => {  
    let receipt = {};
    let allReceipts = [];

    try {

        for (const [key, value] of Object.entries(receiptsLike)) {
           if (key === "id_financial_statements") {
              receipt["id_financial_statements"] = value;
           } else if (key === "number") {
                receipt["number"] = value;
           } else if (key === "amount") {
                receipt["amount"] = value;
           }else if (key === "receipt") {
                 receipt["receipt"] = value;
           }
            allReceipts[0] = receipt;
        }

        let ObjResult = JSON.stringify(receiptsLike, null, 4);

        const receipts = new Receipts( allReceipts[0] );
    if (receipts.number === "" ) {
        throw 'the number is required';
    }

    const receiptToSave = receiptMapperToModel( receipts )

      console.log(`[saveReceipts] The Object is: ${JSON.stringify(receiptsLike, null, 4)}` );

    if (receipts.amount < 0) {
       throw 'No implementada la actualización'
    }

    const updateReceipts = await createReceipt( receiptToSave );
    return updateReceipts
        
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
 * @param {like<Receipt>} receipt
 */

const createReceipt = async(receipt) => {

    const uppercasedObject = convertKeysToUpperCase(receipt);
     console.log(uppercasedObject);

    

        const url = `http://localhost:3000/api/receipts`;
        const res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(uppercasedObject),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        },
        console.info("Los recibos han sido guardados 🧾")
        /*Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Los recibos han sido guardada",
            showCancelButton: false,
            timer: 2000
        })*/
       )
        
    
    


console.log(`Response of Save ${res}`);

const newReceipt = await res.json();
console.log({ newReceipt });
return newReceipt;


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