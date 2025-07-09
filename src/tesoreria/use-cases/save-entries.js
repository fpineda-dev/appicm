import { entrieMapperToModel } from '../mappers/entrie-to-mapper.js';
import { Entries } from '../models/entries.js';
// import Swal from '/./node_modules/sweetalert2/src/sweetalert2';
//import Swal from 'sweetalert2'; 
// import Swal from '/../helper/sweetalert2.js';

/**
 * 
 * @param {like<Entries>} Entrieslike
 */

export const saveEntries = async (entriesLike) => {

    console.log(JSON.stringify(entriesLike));

    try {

        const entries = new Entries(entriesLike);
        if (entries.service === "") {
            throw 'the service is required';
        }

        console.log(`entries Obj: ${JSON.stringify(entries)}`);


        const entrieToSave = entrieMapperToModel(entries)
        //id_department
        if (entries.id_department === "") {
            throw 'No implementada la actualización'
        }

        console.log(`entries to Save Obj: ${JSON.stringify(entries)}`);

        const updateEntries = await createEntrie(entrieToSave);
        return updateEntries;

    } catch (error) {
        console.log(`[save-entries] Error Detail ${error}`);

    }


}

/**
 * 
 * @param {like<Entrie>} entrie
 */

const createEntrie = async (entrie) => {
    
   console.log(`create Obj entrie: ${JSON.stringify(entrie)}`);
    const uppercasedObject = convertKeysToUpperCase(entrie);
    console.log(uppercasedObject);

   const url = `https://apicm.onrender.com/api/financial_statements`;
   const res = await fetch(url, {
       method: 'POST', 
       body: JSON.stringify(uppercasedObject),
       headers: {
           'Content-Type': 'application/json'
       },
       mode: 'cors'
   },
   Swal.fire({
       position: "top-center",
       icon: "success",
       title: "La entrada ha sido guardada",
       showCancelButton: false,
       timer: 2000
   })
)


console.log(`Response of Save ${res}`);

const newEntrie = await res.json();
console.log({ newEntrie });
return newEntrie;


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
