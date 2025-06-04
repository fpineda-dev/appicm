import { foundReceiptMapperToModel  } from '../mappers/foundReceipts-to-mapper.js';
import { Receipts } from '../models/found_receipts.js';


/**
 * 
 * @param {like<Receipts>} Receiptslike
 */

export const foundReceipts = async( receiptsLike ) => {

    console.log(JSON.stringify(receiptsLike));    

    try {

       

        const foundObjReceipts = await AllReceipts( receiptsLike);
        return foundObjReceipts;
        
    } catch (error) {
        console.log(`[save-entries] Error Detail ${error}`);
        
    }
    
    
}

/**
 * 
 * @param {like<AllReceipts>} Idreceipts
 */

const AllReceipts = async(objUpdateReceipts) => {    

    const { from, to, iddepa } = objUpdateReceipts; 
     
     const uppercasedObject = convertKeysToUpperCase(objUpdateReceipts);
     console.log(uppercasedObject);

    const url = `http://localhost:3000/api/search_receipts/${from}/${to}/${iddepa}`;
    const res = await fetch(url, {
        method: 'GET',         
        mode: 'cors'
    },   
)


console.log(`Response of Save ${res}`);

const foundReceipts = await res.json();
console.log({ foundReceipts });
return foundReceipts;


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