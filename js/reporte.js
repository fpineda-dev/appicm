import { foundReceipts } from '../src/tesoreria/use-cases/found-receipts.js'

 window.onload = function() {
    getDate();
    findAllReceipts();
 }

 // #region date

  function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy + '-' + mm + '-' + dd; //mm + '-' + dd + '-' + yyyy;
        console.log(today);
        document.getElementById("fecha").value = today;
        

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const month = new Date();
        const lastmonth = month.getMonth()-1;
         
        console.log(`El dia de hoy ${lastmonth}`);

        document.getElementById("mes").value = monthNames[lastmonth]
        

  }

  // #endregion date

 const findAllReceipts = async () => {

    try {

        let objDate = {}        
        let sumEntrada = 0;
        let sumDeductions = 0;
        
        
    
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const since = urlParams.get('from');
        const when = urlParams.get('to');
        const departamento = urlParams.get('iddepa');
        console.log(`desde ${since} hasta ${when} Depa ${departamento}`);

        if ((since === '' || since === null) && (when === '' || when === null) && (departamento === '' || departamento === null)) {
            return
        }

    let titleDepa = document.querySelector('#logoTitle')
    let p = document.createElement("p");
    titleDepa.appendChild(p);
     let span = document.createElement("span");
     p.setAttribute("id", "text_deparment")

     let paraDep =  document.getElementById("text_deparment");

     //paraDep.style.fontSize = '5px'

     paraDep.setAttribute("style", "font-size: 12px; margin: 0; color: #FF0133")

     if (departamento === '2') {
        paraDep.innerText = "Evangelismo"
     } else if (departamento === '3') {
        paraDep.innerText = "Iglesia Infantil"
     } else if (departamento === '4') {
        paraDep.innerText = "Danza y Artes"
     } else if (departamento === '5') {
        paraDep.innerText = "Alabanzas"
     } else if (departamento === '6') {
        paraDep.innerText = "Díaconos"
     } else if (departamento === '7') {
        paraDep.innerText = "Damas"
     } else if (departamento === '8') {
        paraDep.innerText = "Caballeros"
     } else if (departamento === '9') {
        paraDep.innerText = "Jovenes"
     }

        objDate["from"] = since;
        objDate["to"] = when;
        objDate["iddepa"] = departamento;

        const entrie = await foundReceipts(objDate);        
        console.log(`[ALL DATA: ]${JSON.stringify(entrie["data"])}`); 
        
        
        if (!isObjectEmpty(entrie)) {           
         
            for (const [key, value] of Object.entries(entrie)) {
                console.log(`${key}: ${value}`);
                
                let output = value.substring(0, value.lastIndexOf('],') + 1);

                let arrReceipt = value.substring(1, 86);
                let ObjReceipts = value.slice(output.length);
                let fullObj = output.substring(1, output.length);
                let rowSalida = 0;
                
                console.log(output);
                console.log(ObjReceipts);
                console.log(fullObj);
                let rowDate = ``;
                let rowTotal = ``;
                let rowDeduction = ``;
                
                

                let objVal = JSON.parse(ObjReceipts)
                const keys = Object.keys(objVal);
                console.log(Object.values(objVal).length);                
                for (let i = 0; i < keys.length; i++) {
                  // console.log(`${key}: ${value}`);
                  /*console.log(`Fecha: ${objVal[key].created_at} Total: ${objVal[key].total} Deductions: ${objVal[key].Deductions}`);/*/
                  let fechaEnvio = '';
                  let totalVal = 0;
                  

                  const key = keys[i];
                  console.log(key, objVal[key].created_at);
                  
                   fechaEnvio = objVal[key].created_at; //new Date([key][value])
                                    
                  console.log(fechaEnvio);
                  
                  totalVal = objVal[key].total
                  
                  
              
                    if (objVal[key].deductions === null) {
                         rowSalida = 0
                    } else {
                     rowSalida = objVal[key].deductions                     
                    } 
                  

                
                 if (objVal[key].created_at != null) {
                    rowDate = `<tbody><tr><td>`+fechaEnvio
                 } 
                 if (objVal[key].total != null) {
                    rowTotal = `</td><td>`+totalVal
                 } 
                 if (objVal[key].deductions != null) {
                     rowDeduction = `</td><td>`+rowSalida
                 }
                  

                if (rowDate != `` && rowTotal != `` && rowDeduction != ``) {
                    document.getElementsByTagName("table")[0].innerHTML+= `${rowDate}`+rowTotal+rowDeduction+`</td></tr></tbody>`
                }
                  
                 

                 
                
                 
                    if (objVal[key].deductions != null) {
                        sumDeductions += parseToFloatOrZero(objVal[key].deductions);
                    } 
                 
                 

                 sumEntrada += parseToFloatOrZero(totalVal)

                 console.log(sumEntrada);
                 console.log(sumDeductions);

                 /*estado = sumEntrada - sumDeductions;
                 

                 document.getElementById("total") = document.body.innerHTML+= "<tbody><tr><td>"+sumEntrada+"</td><td>"+sumDeductions+"</td><td>"+estado+"</td></tr></tbody>"*/

                }
             

                
            }

            const tableMath = document.getElementById('total');

            let rows = tableMath.querySelector("#total_entradas")
            rows.innerHTML = `₡${parseToFloatOrZero(sumEntrada)}`;

            let rowSalida = tableMath.querySelector("#total_salidas")
            rowSalida.innerHTML = `₡${parseToFloatOrZero(sumDeductions)}`            

            let rowEstado = tableMath.querySelector("#estado")
            let diferent = `${parseToFloatOrZero(sumEntrada) - parseToFloatOrZero(sumDeductions)}`            
            
            rowEstado.innerHTML = `₡${diferent}`
            
        }
} catch (error) {
    if (!(error instanceof Error)) {
            error = new Error(error);
        }
        console.log(`Name Error: ${error.name}`);        
        console.error(`Error: ${error.message}`);
        console.log(`Stack Error: ${error.stack}`);
}
    
 }

 function isObjectEmpty(obj) {

    for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true    
}

function parseToFloatOrZero(value) {
    if (value === "" || value === null) {
        return 0
    } else {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }
}

const formatDateISO = (date) => {
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};


