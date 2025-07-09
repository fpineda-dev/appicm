import { Minister } from '../models/found-minister.js'

/**
 * 
 * @param {like<Minister>} Ministerlike
 */

export const foundMinister = async (id) => {
    console.log(id);

    try {

        const res = await fetch(`/helper/MOCK_DATA.json`, {
            method: 'GET',
            mode: 'cors'
        },
        ).then(response => response.json()).then(data => { 
            console.log(data[0]['id']);
            return data;
         })        

        const foundMinisters = await res;
        //const dataObj = JSON.parse(res).id
        //console.log(dataObj);
        
        console.log({ foundMinisters });
        return foundMinisters;

    } catch (error) {
         if (!(error instanceof Error)) {
            error = new Error(error);
        }
        console.log(`Name Error: ${error.name}`);        
        console.error(`Error: ${error.message}`);
        console.log(`Stack Error: ${error.stack}`);
    }

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