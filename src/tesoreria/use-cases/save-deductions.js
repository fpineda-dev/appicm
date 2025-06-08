import { deductionMapperToModel  } from '../mappers/deduction-to-mapper.js';
import { Deductions } from '../models/deductions.js';
// import Swal from '/./node_modules/sweetalert2/src/sweetalert2';
//import Swal from 'sweetalert2'; 
// import Swal from '/../helper/sweetalert2.js';

/**
 * 
 * @param {like<Deductions>} Deductionslike
 */

export const saveDeductions = async( deductionsLike ) => {

    console.log(JSON.stringify(deductionsLike));    

    try {

        const deductions = new Deductions( deductionsLike );
        /*if (deductions.tithe_of_tithes === 0) {
            throw 'the tithe is required';
        }*/

        console.log(`deductions Obj: ${JSON.stringify(deductions)}`);
        

        const deductionToSave = deductionMapperToModel( deductions )
                  //id_department
        if (deductions.id_department === 0) {
           throw 'No implementada la actualización'
        }

         console.log(`deductions to Save Obj: ${JSON.stringify(deductions)}`);

        const updateDeductions = await createDeduction( deductionToSave );
        return updateDeductions;
        
    } catch (error) {
        console.log(`[save-entries] Error Detail ${error}`);
        
    }
    
    
}

/**
 * 
 * @param {like<Entrie>} entrie
 */

const createDeduction = async(deduction) => {
     
     console.log(`create Obj deduction: ${JSON.stringify(deduction)}`);
     const uppercasedObject = convertKeysToUpperCase(deduction);
     console.log(uppercasedObject);

    const url = `https://apicm.onrender.com/api/deductions`;
    const res = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(uppercasedObject),
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

const newDeduction = await res.json();
console.log({ newDeduction });
return newDeduction;


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