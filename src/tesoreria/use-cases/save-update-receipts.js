import { receiptMapperToModel  } from '../mappers/updateReceipts-to-mapper.js';
import { updateReceipts } from '../models/update_receipts.js';
// import Swal from '/./node_modules/sweetalert2/src/sweetalert2';
//import Swal from 'sweetalert2'; 
// import Swal from '/../helper/sweetalert2.js';

/**
 * 
 * @param {like<Receipts>} Receiptslike
 */

export const saveUpdateReceipts = async( receiptsLike ) => {

    console.log(JSON.stringify(receiptsLike));    

    try {

        const receipts = new updateReceipts( receiptsLike );
        if (receipts.id_receipts < 0) {
            throw 'the id_receipts is required';
        }

        console.log(`receipts Obj: ${JSON.stringify(receipts)}`);
        

        const receiptToSave = receiptMapperToModel( receipts )
                  //id_department
        if (receipts.id_financial_statements < 0) {
           throw 'No implementada la actualización'
        }

         console.log(`receipts to Save Obj: ${JSON.stringify(receipts)}`);

        const updateObjReceipts = await updateAllReceipts( receiptToSave);
        return updateObjReceipts;
        
    } catch (error) {
        console.log(`[save-entries] Error Detail ${error}`);
        
    }
    
    
}

/**
 * 
 * @param {like<updateAllReceipts>} Idreceipts
 */

const updateAllReceipts = async(objUpdateReceipts) => {

    let bodyJSON = {}

    const { id_receipts, id_financial_statements } = objUpdateReceipts;

    bodyJSON["ID_FINANCIAL_STATEMENTS"] = id_financial_statements
     
     console.log(`create Obj entrie: ${JSON.stringify(bodyJSON)}`);
     const uppercasedObject = convertKeysToUpperCase(objUpdateReceipts);
     console.log(uppercasedObject);

    const url = `http://localhost:3000/api/update_receipts/${id_receipts}`;
    const res = await fetch(url, {
        method: 'PUT', 
        body: JSON.stringify(bodyJSON),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    },
   /* Swal.fire({
        position: "top-end",
        icon: "success",
        title: "La entrada ha sido guardada",
        showCancelButton: false,
        timer: 2000
    })*/
)


console.log(`Response of Save ${res}`);

const newUpdateReceipts = await res.json();
console.log({ newUpdateReceipts });
return newUpdateReceipts;


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