import { anotherMapperToModel  } from '../mappers/another-to-mapper.js';
import { AnotherEntries } from '../models/another-entries.js';


/**
 * 
 * @param {like<AnotherEntries>} Anotherlike
 */

export const saveAnotherEntries = async( anotherLike ) => {    

    try {

        const anothers = new AnotherEntries( anotherLike );
        if (anothers.id_financial_statements === "") {
            throw 'the entrie is required';
        }

        const anotherToSave = anotherMapperToModel( anothers )

        const updateAnother = await createAnotherEntrie( anotherToSave );
        return updateAnother;
        
    } catch (error) {
        console.log(`[save-another-entries] Error Detail ${error}`);
        
    }
    
    
}

/**
 * 
 * @param {like<Entrie>} entrie
 */

const createAnotherEntrie = async(entrie) => {
     
     console.log(`create Obj another entrie: ${JSON.stringify(entrie)}`);
     const uppercasedObject = convertKeysToUpperCase(entrie);
     console.log(uppercasedObject);

    const url = `http://localhost:3000/api/another_entries`;
    const res = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(uppercasedObject),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    },
   Swal.fire({
        position: "top-end",
        icon: "success",
        title: "La entrada ha sido guardada",
        showCancelButton: false,
        timer: 2000
    })
)


console.log(`Response of Save ${res}`);

const newAnotherEntries = await res.json();
console.log({ newAnotherEntries });
return newAnotherEntries;


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