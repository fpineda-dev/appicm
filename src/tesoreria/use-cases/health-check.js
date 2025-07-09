export const checkHealth = async () => {

    const statementHealth = await requestConnection();

    let statusServer = statementHealth['data']

    if (statusServer === 0) {
        console.log(statementHealth);        
        return statementHealth
    }

    console.log(`STATEMENT HEALTH ${statementHealth['data']}`);

    return statementHealth['data'];
}

async function requestConnection() {
    let healthCheck = '';

    try {
        // http://localhost:3000/api/health_check
        const url = `https://apicm.onrender.com/api/health_check`;
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        },
        )

        //console.log(`Response of Save ${res}`);

        healthCheck = await res.json();
        console.log(`Response of Save ${healthCheck['data']}`);

        //return healthCheck['data'];

    } catch (error) {

        console.error(`The Error is: ${error}`);
        

        console.log(isObjectEmpty(error));
        
        if (isObjectEmpty(error)) {
            let erroJSON = { 'data': 0 }
            console.log(JSON.stringify(erroJSON));
            
            return erroJSON
        }
    }


    return healthCheck;
}

function isObjectEmpty(obj) {

    for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true    
}