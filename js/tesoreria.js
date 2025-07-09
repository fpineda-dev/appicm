// import Swal from '../node_modules/sweetalert2/dist/sweetalert2.js';
import { saveEntries } from '../src/tesoreria/use-cases/save-entries.js'
import { saveAnotherEntries } from '../src/tesoreria/use-cases/save-another-entries.js'
import { saveDeductions } from '../src/tesoreria/use-cases/save-deductions.js'

import { saveReceipts } from '../src/tesoreria/use-cases/save-receipts.js'

import { saveUpdateReceipts } from '../src/tesoreria/use-cases/save-update-receipts.js'

import { checkHealth } from '../src/tesoreria/use-cases/health-check.js'

//import Swal from '../node_modules/sweetalert2/src/sweetalert2.js';
// import Swal from 'sweetalert2';

let departamento = '';

window.addEventListener('load', (e) => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    departamento = urlParams.get('iddepa');

    if (departamento === '' || departamento === null) {
        const btnSave = document.querySelector('.boton--primario');

        btnSave.style.visibility = 'hidden';

        return
    }

    let titleDepa = document.querySelector('.campo')
    let p = document.createElement("p");
    titleDepa.appendChild(p);
    let span = document.createElement("span");
    p.setAttribute("id", "text_deparment")

    let paraDep = document.getElementById("text_deparment");

    //paraDep.style.fontSize = '5px'

    paraDep.setAttribute("style", "font-size: 12px; margin: 0; color: #1EE494")

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

    procesingEntries();
    procesingDeductions();
    procesingReceipts();

});

const btnSave = document.querySelector('.boton');
const service = document.querySelectorAll('#culto');

// #region Helper
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
})

function parseToFloatOrZero(value) {
    if (value === "") {
        return 0
    } else {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }
}

// #endregion Herlper

// #region VARIABLE PROCESSING DEDUCTIONS

/**
* Payment Pastor
*/
let sumTotalPas = 0;
let valueAmout1 = 0;
let valueAmout2 = 0;
let valueAmout3 = 0;
let valueAmout4 = 0;
let valueAmout5 = 0;
let valueAmout6 = 0;
let totalDeductions = 0;
let totalHelpDeductions = 0;

let allDeductions = [];
let pastorDeduction1 = {};
let pastorDeduction2 = {};
let pastorDeduction3 = {};
let pastorDeduction4 = {};
let pastorDeduction5 = {};
let pastorDeduction6 = {};

let helperDeduction1 = {};
let helperDeduction2 = {};
let helperDeduction3 = {};
let helperDeduction4 = {};
let helperDeduction5 = {};
let helperDeduction6 = {};

let titlePayPastor1 = document.querySelector("#p1");
let titlePayPastor2 = document.querySelector("#p2");
let titlePayPastor3 = document.querySelector("#p3");
let titlePayPastor4 = document.querySelector("#p4");
let titlePayPastor5 = document.querySelector("#p5");
let titlePayPastor6 = document.querySelector("#p6");

let paymentPastor1 = document.querySelector("#pg11");
let paymentPastor2 = document.querySelector("#pg12");
let paymentPastor3 = document.querySelector("#pg13");
let paymentPastor4 = document.querySelector("#pg14");
let paymentPastor5 = document.querySelector("#pg15");
let paymentPastor6 = document.querySelector("#pg16");


/**
 * Special Helper
 */

let sumTotalHelp = 0;
let valueAmoutHelp1 = 0;
let valueAmoutHelp2 = 0;
let valueAmoutHelp3 = 0;
let valueAmoutHelp4 = 0;
let valueAmoutHelp5 = 0;
let valueAmoutHelp6 = 0;

let titleNameHelper1 = document.querySelector("#e1");
let titleNameHelper2 = document.querySelector("#e2");
let titleNameHelper3 = document.querySelector("#e3");
let titleNameHelper4 = document.querySelector("#e4");
let titleNameHelper5 = document.querySelector("#e5");
let titleNameHelper6 = document.querySelector("#e6");

let paymenthelper1 = document.querySelector("#ep11");
let paymenthelper2 = document.querySelector("#ep12");
let paymenthelper3 = document.querySelector("#ep13");
let paymenthelper4 = document.querySelector("#ep14");
let paymenthelper5 = document.querySelector("#ep15");
let paymenthelper6 = document.querySelector("#ep16");

let totalPagoPastor = document.querySelector("#totalPagoPastor");

// #endregion VARIABLE PROCESSING DEDUCTIONS

const procesingDeductions = () => {

    paymentPastor1.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor1);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout1 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })

    paymentPastor2.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor2);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout2 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })

    paymentPastor3.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor3);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout3 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })

    paymentPastor4.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor4);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout4 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })

    paymentPastor5.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor5);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout5 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })

    paymentPastor6.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymentPastor6);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalPas = parseToFloatOrZero(inputNum.value);
        valueAmout6 = inputNum.value
        console.log(`SUM 1: ${sumTotalPas}`);
        sumarDeductions();
    })



    paymenthelper1.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper1);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp1 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })

    paymenthelper2.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper2);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp2 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })

    paymenthelper3.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper3);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp3 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })

    paymenthelper4.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper4);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp4 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })

    paymenthelper5.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper5);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp5 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })

    paymenthelper6.addEventListener('change', () => {
        let inputNum = procesingValueInput(paymenthelper6);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalHelp = parseToFloatOrZero(inputNum.value);
        valueAmoutHelp6 = inputNum.value
        console.log(`SUM 1: ${sumTotalHelp}`);
        sumarDeductions();
    })


    const sumarDeductions = () => {
        totalDeductions = parseToFloatOrZero(valueAmout1) + parseToFloatOrZero(valueAmout2) + parseToFloatOrZero(valueAmout3) + parseToFloatOrZero(valueAmout4) + parseToFloatOrZero(valueAmout5) + parseToFloatOrZero(valueAmout6)
        console.log(`Total deductions ${totalDeductions}`);

        totalHelpDeductions = parseToFloatOrZero(valueAmoutHelp1) + parseToFloatOrZero(valueAmoutHelp2) + parseToFloatOrZero(valueAmoutHelp3) + parseToFloatOrZero(valueAmoutHelp4) + parseToFloatOrZero(valueAmoutHelp5) + parseToFloatOrZero(valueAmoutHelp6)
        console.log(`Total deductions Helper ${totalHelpDeductions}`);

        totalPagoPastor.value = parseToFloatOrZero(valueAmout1) + parseToFloatOrZero(valueAmout2) + parseToFloatOrZero(valueAmout3) + parseToFloatOrZero(valueAmout4) + parseToFloatOrZero(valueAmout5) + parseToFloatOrZero(valueAmout6);
    }



}

// #region VARIABLE PROCESING RECEIPTS

const factura1 = document.querySelector('.onereceipt');
factura1.readOnly = true;
const factura2 = document.querySelector('.tworeceipt');
factura2.readOnly = true;
const factura3 = document.querySelector('.treereceipt');
factura3.readOnly = true;
const factura4 = document.querySelector('.foureceipt');
factura4.readOnly = true;
const factura5 = document.querySelector('.fivereceipt');
factura5.readOnly = true;
const factura6 = document.querySelector('.sixreceipt');
factura6.readOnly = true;

let amountFac1 = document.querySelector('.amountFac1');
let amountFac2 = document.querySelector('.amountFac2');
let amountFac3 = document.querySelector('.amountFac3');
let amountFac4 = document.querySelector('.amountFac4');
let amountFac5 = document.querySelector('.amountFac5');
let amountFac6 = document.querySelector('.amountFac6');
let fileButton = document.querySelector('#archivo');
let styleButton = document.querySelector('.fancy-file__fancy-file-button');

let sumTotalReceips = 0;
let valueAmoutFact1 = 0;
let valueAmoutFact2 = 0;
let valueAmoutFact3 = 0;
let valueAmoutFact4 = 0;
let valueAmoutFact5 = 0;
let valueAmoutFact6 = 0;
let file64 = "";
let countImage = 0;
let allReceipts = [];
let receipt1 = {};
let receipt2 = {};
let receipt3 = {};
let receipt4 = {};
let receipt5 = {};
let receipt6 = {};

let fullTitleFac1 = "";
let fullTitleFac2 = "";
let fullTitleFac3 = "";
let fullTitleFac4 = "";
let fullTitleFac5 = "";
let fullTitleFac6 = "";

let imgComplete1 = "";
let imgComplete2 = "";
let imgComplete3 = "";
let imgComplete4 = "";
let imgComplete5 = "";
let imgComplete6 = "";

let mergeLetter = "";

let imbObj = {};
let imbObj1 = {};
let imbObj2 = {};
let imbObj3 = {};
let imbObj4 = {};
let imbObj5 = {};
let sequence = [];
let indexTitle = "";
const uniqueStrings = [];
let uniqueArray = [];

let countObj = {};
let countObj2 = {};
let countObj3 = {};
let countObj4 = {};
let countObj5 = {};
let countObj6 = {};
let allObj = [];
let idsReceipts = [];


// #endregion VARIABLE PROCESING RECEIPTS

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function procesingReceipts() {

    console.log(`Entro <~~> ${departamento}`);


    //styleButton.classList.add('.disable');
    styleButton.setAttribute('id', 'disable');
    fileButton.disabled = true;

    const files = document.querySelector('#archivo');


    amountFac1.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac1);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact1 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();
        console.log(factura1.value);

        if (valueAmoutFact1 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }

        countObj["number"] = `${factura1.value}`
        countObj["amount"] = valueAmoutFact1
        allObj[0] = countObj

    })

    amountFac2.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac2);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact2 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();

        if (valueAmoutFact2 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }

        countObj2["number"] = `${factura2.value}`
        countObj2["amount"] = valueAmoutFact2
        allObj[1] = countObj2

    })

    amountFac3.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac3);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact3 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();

        if (valueAmoutFact3 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }

        countObj3["number"] = `${factura3.value}`
        countObj3["amount"] = valueAmoutFact3
        allObj[2] = countObj3
    })

    amountFac4.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac4);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact4 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();

        if (valueAmoutFact4 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }

        countObj4["number"] = `${factura4.value}`
        countObj4["amount"] = valueAmoutFact4
        allObj[3] = countObj4
    })

    amountFac5.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac5);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact5 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();

        if (valueAmoutFact5 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }

        countObj5["number"] = `${factura5.value}`
        countObj5["amount"] = valueAmoutFact5
        allObj[4] = countObj5
    })

    amountFac6.addEventListener('change', () => {
        let inputNum = procesingValueInput(amountFac6);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotalReceips = parseToFloatOrZero(inputNum.value);
        valueAmoutFact6 = inputNum.value
        console.log(`SUM 1: ${sumTotalReceips}`);
        sumarDeductionsReceipts();

        if (valueAmoutFact6 != 0) {
            //styleButton.classList.remove('.disable');
            styleButton.removeAttribute('id');
            fileButton.disabled = false;
        }
        countObj6["number"] = `${factura6.value}`
        countObj6["amount"] = valueAmoutFact6
        allObj[5] = countObj6
    })



    const sumarDeductionsReceipts = () => {
        let totalDeductions = parseToFloatOrZero(valueAmoutFact1) + parseToFloatOrZero(valueAmoutFact2) + parseToFloatOrZero(valueAmoutFact3) + parseToFloatOrZero(valueAmoutFact4) + parseToFloatOrZero(valueAmoutFact5) + parseToFloatOrZero(valueAmoutFact6)
        console.log(`Total deductions ${totalDeductions}`);

    }


    /* Deductions fields  */

    files.addEventListener('change', handleFiles, false);





    function handleFiles() {
        const fileList = this.files;

        // Convert FileList to an array (optional, but often useful)
        const fileArray = Array.from(fileList);
        let keyIndex = "";
        let keyIndex1 = "";
        let keyIndex2 = "";
        let keyIndex3 = "";
        let keyIndex4 = "";
        let keyIndex5 = "";



        //countImage
        console.log(`Count image equal: ${fileArray.length}`);

        countImage = fileArray.length;

        console.log(`✈ The Count all receipt in field: ${allObj.length}`);

        Object.keys(fileArray).forEach(function (k) {
            console.log(k + ' - ' + fileArray[k]);
            if (k === "0") {
                keyIndex = k
            } else if (k === "1") {
                keyIndex1 = k
            } else if (k === "2") {
                keyIndex2 = k
            } else if (k === "3") {
                keyIndex3 = k
            } else if (k === "4") {
                keyIndex4 = k
            } else if (k === "5") {
                keyIndex5 = k
            }

        });

        fileArray.forEach(async file => {
            console.log('File Name:', file.name);
            //receiptFileName = file.name //&& factura1.value != receiptFileName
            console.log(typeof (k));
            if (keyIndex === "0") {
                factura1.value = file.name;
                keyIndex = ""
            } else if (keyIndex1 === "1") {
                factura2.value = file.name;
                keyIndex1 = ""
            } else if (keyIndex2 === "2") {
                factura3.value = file.name;
                keyIndex2 = ""
            } else if (keyIndex3 === "3") {
                factura4.value = file.name;
                keyIndex3 = ""
            } else if (keyIndex4 === "4") {
                factura5.value = file.name;
                keyIndex4 = ""
            } else if (keyIndex5 === "5") {
                factura6.value = file.name;
                keyIndex5 = ""
            }
        });



        // Process each file in the array
        fileArray.forEach(async file => {
            // Access file properties like name, size, type
            //console.log('File Name:', file.name);                
            //console.log('File Size:', file.size);
            //console.log('File Type:', file.type);
            //console.log(await toBase64(file));


            try {
                let imgBase64 = await toBase64(file)
                //console.log(`Full Image ${imgBase64}`);
                let output = imgBase64.substring(0, imgBase64.lastIndexOf(',') + 1);
                console.log(`Chunk Image ${output}`);

                let imgb64 = imgBase64.slice(output.length);

                let facSequence = getRandomIntInclusive(0, 20)
                console.log(`${"ICM"}-${facSequence}`);

                file64 = imgb64;

                if (indexTitle != facSequence) {


                    if (isObjectEmpty(imbObj)) {
                        imbObj["id_financial_statements"] = -1
                        imbObj["number"] = `A-${"ICM"}-${facSequence}-${factura1.value}`
                        imbObj["amount"] = valueAmoutFact1
                        imbObj["receipt"] = imgb64

                        sequence[0] = imbObj
                    } else if (isObjectEmpty(imbObj1)) {

                        imbObj1["id_financial_statements"] = -1
                        imbObj1["number"] = `B-${"ICM"}-${facSequence}-${factura2.value}`
                        imbObj1["amount"] = valueAmoutFact2
                        imbObj1["receipt"] = imgb64

                        sequence[1] = imbObj1
                    } else if (isObjectEmpty(imbObj2)) {

                        imbObj2["id_financial_statements"] = -1
                        imbObj2["number"] = `C-${"ICM"}-${facSequence}-${factura3.value}`
                        imbObj2["amount"] = valueAmoutFact3
                        imbObj2["receipt"] = imgb64

                        sequence[2] = imbObj2
                    } else if (isObjectEmpty(imbObj3)) {
                        imbObj3["id_financial_statements"] = -1
                        imbObj3["number"] = `D-${"ICM"}-${facSequence}-${factura4.value}`
                        imbObj3["amount"] = valueAmoutFact4
                        imbObj3["receipt"] = imgb64

                        sequence[3] = imbObj3
                    } else if (isObjectEmpty(imbObj4)) {
                        imbObj4["id_financial_statements"] = -1
                        imbObj4["number"] = `E-${"ICM"}-${facSequence}-${factura5.value}`
                        imbObj4["amount"] = valueAmoutFact5
                        imbObj4["receipt"] = imgb64

                        sequence[4] = imbObj4
                    } else if (isObjectEmpty(imbObj5)) {

                        imbObj5["id_financial_statements"] = -1
                        imbObj5["number"] = `F-${"ICM"}-${facSequence}-${factura6.value}`
                        imbObj5["amount"] = valueAmoutFact6
                        imbObj5["receipt"] = imgb64


                        sequence[5] = imbObj5
                    }

                    indexTitle = facSequence
                    imgb64 = "";
                }

                //console.log(`uno ${fullTitleFac1} - ${imgComplete1}`);

                //console.log(`Full Image ${file64}`);

                uniqueArray = sequence.filter(o => {
                    const s = JSON.stringify(o);
                    if (!uniqueStrings.includes(s)) {
                        uniqueStrings.push(s);
                        return true;
                    }
                    return false;
                });


                /* console.log(`The Receipt is: ${JSON.         stringify(uniqueArray, null, 4)}` );*/

                console.log(typeof (uniqueArray[0]));

                console.log(`Count Image ${countImage} - Count Object ${uniqueArray.length}`);


                if (countImage === allObj.length) {
                    const saveAllReceipts = await saveReceipts(uniqueArray[0]);
                    console.log(saveAllReceipts["data"]);
                    idsReceipts.push(saveAllReceipts["data"])
                    console.log(`All Receipts: ${idsReceipts}`);


                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        position: 'top-center',
                        text: "La catidad de recibos debe ser igual a la digítada",
                        width: '200px'
                    });


                }











                /* console.log(`Part JSON: ${Object.values(uniqueArray[0]["id"][0])}`);
             
                 mergeLetter = Object.values(uniqueArray[0]["id"][0]);*/



                /* uniqueArray.find((value, index) => {
                     console.log("Visited index", index, "with value", value["id"]);
                     console.log(`The image ${value["img"]}`);
                     
                     return false;
                 });*/

                /*for (const [key, value] of Object.entries(uniqueArray[0])) {
                   // console.log(`${key}: ${value}`);  
                   
                    if (key === "id" && mergeLetter === "A"){
                        fullTitleFac1 = `${value}+${factura1.value}`
                     }
                   
                   let sameLetter = "";
                   if(key != "img") {
                       sameLetter = value.substring(0, 1) 
                   }    
                    
            
                    if (key === "id"){            
                        console.log(`${mergeLetter}=${sameLetter}`);
                        if (mergeLetter === "A" && sameLetter === "A") {
                            fullTitleFac1 = `${value}+${factura1.value}`
                            console.log(`DEBUG: [${fullTitleFac1}]`);
                            
                            mergeLetter = ""
                        }
                        if (mergeLetter === "B" && sameLetter === "B") {
                            fullTitleFac2 = `${value}+${factura2.value}`
                            mergeLetter = ""
                        }   
                        if (mergeLetter === "C" && sameLetter === "C") {
                            fullTitleFac3 = `${value}+${factura3.value}`
                            mergeLetter = ""
                        }   
                        if (mergeLetter === "D" && sameLetter === "D") {
                            fullTitleFac4 = `${value}+${factura4.value}`
                            mergeLetter = ""
                        }   
                        if (mergeLetter === "E" && sameLetter === "E") {
                            fullTitleFac5 = `${value}+${factura5.value}`
                            mergeLetter = ""
                        }
                        if (mergeLetter === "F" && sameLetter === "F") {
                            fullTitleFac6 = `${value}+${factura6.value}`
                            mergeLetter = ""
                        }       
                    } else if(key === "img"){
                        if (mergeLetter === "A" && sameLetter === "A") { 
                            imgComplete1 = value
                            mergeLetter = ""
                        }
                        if (mergeLetter === "B" && sameLetter === "B") { 
                            imgComplete2 = value
                            mergeLetter = ""
                        }
                        if (mergeLetter === "C" && sameLetter === "C") { 
                            imgComplete3 = value
                            mergeLetter = ""
                        }
                        if (mergeLetter === "D" && sameLetter === "D") { 
                            imgComplete4 = value
                            mergeLetter = ""
                        }
                        if (mergeLetter === "E" && sameLetter === "E") { 
                            imgComplete5 = value
                            mergeLetter = ""
                        }
                        if (mergeLetter === "F" && sameLetter === "F") { 
                            imgComplete6 = value
                            mergeLetter = ""
                        }
                        
                    }
                     
                }*/


            } catch (error) {
                if (!(error instanceof Error)) {
                    error = new Error(error);
                }
                console.log(`Name Error: ${error.name}`);
                console.error(`Error: ${error.message}`);
                console.log(`Stack Error: ${error.stack}`);
                return;
            }

            /*console.log(`The Receipt is: ${JSON.stringify(uniqueArray, null, 4)}` );*/


            // Perform further actions, like reading file content or uploading
        });  // <-- Termina loop           




    }



}


// #region BLOCK VARIABLE PROCESING ENTRIES



const entrieLike = {};
let entries = [];
let anotherEntrie = {};
let anotherEntrie1 = {};
let anotherEntrie2 = {};
let anotherEntrie3 = {};
let anotherEntrie4 = {};
let anotherEntrie5 = {};
let anotherEntrie6 = {};
let anotherEntrie7 = {};
let anotherEntrie8 = {};
let anotherEntrie9 = {};
// const typeService = '';
let isVisita = '';
let isLocal = '';
let markService = '';


const nameChurch = document.querySelector('#nombre');
const dateEntrie = document.querySelector('#fecha');
const inputVisita = document.querySelector('input[placeholder="Visita"]');
const inputLocal = document.querySelector('input[placeholder="Local"]')

/* Fields Ofrenda Secction */
const dailyOffering = document.querySelector('#diaria');
const misionOffering = document.querySelector('#misionera');
const specialOffering = document.querySelectorAll('#especial');



inputLocal.addEventListener('change', () => {
    // console.log(`Servicio en la posicion Local ${typeService[1]}`);      
    inputVisita.disabled = false
    if (inputVisita.value === "" && inputLocal.value === "X") {
        inputVisita.disabled = true
        // isLocal = typeService[1]                     
    }
})

inputVisita.addEventListener('change', () => {
    // console.log(`Servicio en la posicion Visita ${typeService[0]}`);        
    inputLocal.disabled = false
    if (inputLocal.value === "" && inputVisita.value === "X") {
        inputLocal.disabled = true
        // isVisita = typeService[0]                       
    }
})

/*if (typeService[1] === "X") {
    console.log(`Servicio en la posicion 1 ${typeService[1]}`);
    inputLocal.disabled = true
}*/

// console.log(`All files: ${files.value} - type: ${typeof(files.value)}`);
const fieldsSpecialOffering = Array.from(specialOffering).map(input => input.value);


let totalSpecialOffering = parseFloat(fieldsSpecialOffering[0]) + parseFloat(fieldsSpecialOffering[1]) + parseFloat(fieldsSpecialOffering[2]) + parseFloat(fieldsSpecialOffering[3]);


if (isNaN(totalSpecialOffering)) {
    totalSpecialOffering = 0;
    console.log(`AFTER SPECIAL OFFERING ${totalSpecialOffering}`);
}


// console.log(`Especial1 ${fieldsSpecialOffering[0]} - Especial2 ${fieldsSpecialOffering[1]} - Especial3 ${fieldsSpecialOffering[2]} - Especial4 ${fieldsSpecialOffering[3]}`);

/* Entries --> Fields diezmadores and other concept */
const diezmador1 = document.querySelector('#d1');
const diezmador2 = document.querySelector('#d2');
const diezmador3 = document.querySelector('#d3');
const diezmador4 = document.querySelector('#d4');
const diezmador5 = document.querySelector('#d5');
const diezmador6 = document.querySelector('#d6');
const diezmador7 = document.querySelector('#d7');
const diezmador8 = document.querySelector('#d8');
const diezmador9 = document.querySelector('#d9');
const diezmador10 = document.querySelector('#d10');

const diezmador11 = document.querySelector('#d11');
const diezmador12 = document.querySelector('#d12');
const diezmador13 = document.querySelector('#d13');
const diezmador14 = document.querySelector('#d14');
const diezmador15 = document.querySelector('#d15');
const diezmador16 = document.querySelector('#d16');
const diezmador17 = document.querySelector('#d17');
const diezmador18 = document.querySelector('#d18');
const diezmador19 = document.querySelector('#d19');
const diezmador20 = document.querySelector('#d20');


const tithes = parseToFloatOrZero(diezmador11.value) + parseToFloatOrZero(diezmador12.value) + parseToFloatOrZero(diezmador13.value) + parseToFloatOrZero(diezmador14.value) + parseToFloatOrZero(diezmador15.value) + parseToFloatOrZero(diezmador16.value) + parseToFloatOrZero(diezmador17.value) + parseToFloatOrZero(diezmador18.value) + parseToFloatOrZero(diezmador19.value) + parseToFloatOrZero(diezmador20.value)


const concept1 = document.querySelector('#c1');
const concept2 = document.querySelector('#c2');
const concept3 = document.querySelector('#c3');
const concept4 = document.querySelector('#c4');
const concept5 = document.querySelector('#c5');
const concept6 = document.querySelector('#c6');
const concept7 = document.querySelector('#c7');
const concept8 = document.querySelector('#c8');
const concept9 = document.querySelector('#c9');
const concept10 = document.querySelector('#c10');

const concept11 = document.querySelector('#v11');
const concept12 = document.querySelector('#v12');
const concept13 = document.querySelector('#v13');
const concept14 = document.querySelector('#v14');
const concept15 = document.querySelector('#v15');
const concept16 = document.querySelector('#v16');
const concept17 = document.querySelector('#v17');
const concept18 = document.querySelector('#v18');
const concept19 = document.querySelector('#v19');
const concept20 = document.querySelector('#v20');

const anotherConcept = parseToFloatOrZero(concept11.value) + parseToFloatOrZero(concept12.value) + parseToFloatOrZero(concept13.value) + parseToFloatOrZero(concept14.value) + parseToFloatOrZero(concept15.value) + parseToFloatOrZero(concept16.value) + parseToFloatOrZero(concept17.value) + parseToFloatOrZero(concept18.value) + parseToFloatOrZero(concept19.value) + parseToFloatOrZero(concept20.value)

let entradaTotal = document.querySelector("#f17");
let totalEntrada = document.querySelector("#f21");
let totalTiches = document.querySelector("#f18");
let tichesOfTiches = document.querySelector("#f19")
// entradaTotal.value = `${tithes}`;
console.log(totalPagoPastor.value);


let sumTotal = 0;
let subTotal = 0;
let valor1 = 0;
let valor2 = 0;
let valor3 = 0;
let valor4 = 0;
let valor5 = 0;
let valor6 = 0;
let valor7 = 0;
let valor8 = 0;
let valor9 = 0;
let valor10 = 0;
let valor11 = 0;
let valor12 = 0;
let valor13 = 0;
let valor14 = 0;
let valor15 = 0;
let valor16 = 0;
let valor17 = 0;
let valor18 = 0;
let valor19 = 0;
let valor20 = 0;
let valor21 = 0;
let valor22 = 0;
let valor23 = 0;
let valor24 = 0;
let valor25 = 0;
let valor26 = 0;
let sumSpecialOffering = 0;
let idEntrie = 0;

/* Sum special offering */
const special1 = document.querySelector('.special1')
const special2 = document.querySelector('.special2')
const special3 = document.querySelector('.special3')
const special4 = document.querySelector('.entradas__field')
let ultimateDailyOffering = 0;
let ultimateMissionOffering = 0;
let ultimateValue = 0;
let ultimateValueSpecial2 = 0;
let ultimateValueSpecial3 = 0;
let ultimateValueSpecial4 = 0;
let ultimateValueDiezmador11 = 0;
let ultimateValueDiezmador12 = 0;
let ultimateValueDiezmador13 = 0;



// #endregion BLOCK VARIABLE PROCESING ENTRIES



const procesingEntries = async () => {

    dailyOffering.addEventListener('change', () => {
        let inputNum = procesingValueInput(dailyOffering);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor1 = inputNum.value
        console.log(`SUM 1: ${sumTotal}`);
        sumar();
    })

    misionOffering.addEventListener('change', () => {
        let inputNum = procesingValueInput(misionOffering);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor2 = inputNum.value
        console.log(`SUM 2: ${sumTotal}`);
        sumar();
    })

    special1.addEventListener('change', () => {
        // ultimateValue += parseToFloatOrZero(special2.value)    
        let inputNum = procesingValueInput(special1);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal += parseToFloatOrZero(inputNum.value);
        valor3 = inputNum.value // - ultimateValue;
        console.log(`SUM 3: ${sumTotal}`);
        //entradaTotal.value = sumTotal;
        sumar();
        //entradaTotal.value = parseToFloatOrZero(valor1) + parseToFloatOrZero(valor2) + parseToFloatOrZero(valor3);
        //console.log(`Entrada Total: ${entradaTotal.value}`);
    })


    special2.addEventListener('change', () => {
        let inputNum = procesingValueInput(special2);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor4 = inputNum.value
        console.log(`SUM 4: ${sumTotal}`);
        sumar();
    })

    special3.addEventListener('change', () => {
        let inputNum = procesingValueInput(special3);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor5 = inputNum.value
        console.log(`SUM 5: ${sumTotal}`);
        sumar();
    })

    special4.addEventListener('change', () => {
        let inputNum = procesingValueInput(special4);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor6 = inputNum.value
        console.log(`SUM 6: ${sumTotal}`);
        sumar();
    })

    diezmador11.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador11);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor7 = inputNum.value
        console.log(`SUM 7: ${sumTotal}`);
        sumar();
    })


    diezmador12.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador12);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor8 = inputNum.value
        console.log(`SUM 8: ${sumTotal}`);
        sumar();
    })

    diezmador13.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador13);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor9 = inputNum.value
        console.log(`SUM 9: ${sumTotal}`);
        sumar();
    })

    diezmador14.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador14);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor10 = inputNum.value
        console.log(`SUM 10: ${sumTotal}`);
        sumar();
    })

    diezmador15.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador15);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor11 = inputNum.value
        console.log(`SUM 12: ${sumTotal}`);
        sumar();
    })

    diezmador16.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador16);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor12 = inputNum.value
        console.log(`SUM 13: ${sumTotal}`);
        sumar();
    })

    diezmador17.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador17);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor13 = inputNum.value
        console.log(`SUM 14: ${sumTotal}`);
        sumar();
    })

    diezmador18.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador18);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor14 = inputNum.value
        console.log(`SUM 15: ${sumTotal}`);
        sumar();
    })

    diezmador19.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador19);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor15 = inputNum.value
        console.log(`SUM 16: ${sumTotal}`);
        sumar();
    })

    diezmador20.addEventListener('change', () => {
        let inputNum = procesingValueInput(diezmador20);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor16 = inputNum.value
        console.log(`SUM 17: ${sumTotal}`);
        sumar();
    })

    concept11.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept11);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor17 = inputNum.value
        console.log(`SUM 18: ${sumTotal}`);
        sumar();
    })

    concept12.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept12);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor18 = inputNum.value
        console.log(`SUM 19: ${sumTotal}`);
        sumar();
    })

    concept13.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept13);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor19 = inputNum.value
        console.log(`SUM 20: ${sumTotal}`);
        sumar();
    })

    concept14.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept14);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor20 = inputNum.value
        console.log(`SUM 21: ${sumTotal}`);
        sumar();
    })

    concept15.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept15);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor21 = inputNum.value
        console.log(`SUM 22: ${sumTotal}`);
        sumar();
    })

    concept16.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept16);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor22 = inputNum.value
        console.log(`SUM 23: ${sumTotal}`);
        sumar();
    })

    concept17.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept17);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor23 = inputNum.value
        console.log(`SUM 24: ${sumTotal}`);
        sumar();
    })

    concept18.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept18);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor24 = inputNum.value
        console.log(`SUM 25: ${sumTotal}`);
        sumar();
    })

    concept19.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept19);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor25 = inputNum.value
        console.log(`SUM 26: ${sumTotal}`);
        sumar();
    })

    concept20.addEventListener('change', () => {
        let inputNum = procesingValueInput(concept20);
        console.log(`Value input: ~~> ${inputNum.value}`);
        sumTotal = parseToFloatOrZero(inputNum.value);
        valor26 = inputNum.value
        console.log(`SUM 27: ${sumTotal}`);
        sumar();
    })

    const sumar = () => {
        entradaTotal.value = parseToFloatOrZero(valor1) + parseToFloatOrZero(valor2) + parseToFloatOrZero(valor3) + parseToFloatOrZero(valor4) + parseToFloatOrZero(valor5) + parseToFloatOrZero(valor6);

        totalEntrada.value = parseToFloatOrZero(valor1) + parseToFloatOrZero(valor2) + parseToFloatOrZero(valor3) + parseToFloatOrZero(valor4) + parseToFloatOrZero(valor5) + parseToFloatOrZero(valor6) + parseToFloatOrZero(valor7) + parseToFloatOrZero(valor8) + parseToFloatOrZero(valor9) + parseToFloatOrZero(valor10) + parseToFloatOrZero(valor11) + parseToFloatOrZero(valor12) + parseToFloatOrZero(valor13) + parseToFloatOrZero(valor14) + parseToFloatOrZero(valor15) + parseToFloatOrZero(valor16) + parseToFloatOrZero(valor17) + parseToFloatOrZero(valor18) + parseToFloatOrZero(valor19) + parseToFloatOrZero(valor20) + parseToFloatOrZero(valor21) + parseToFloatOrZero(valor22) + parseToFloatOrZero(valor23) + parseToFloatOrZero(valor24) + parseToFloatOrZero(valor25) + parseToFloatOrZero(valor26);

        totalTiches.value = parseToFloatOrZero(valor7) + parseToFloatOrZero(valor8) + parseToFloatOrZero(valor9) + parseToFloatOrZero(valor10) + parseToFloatOrZero(valor11) + parseToFloatOrZero(valor12) + parseToFloatOrZero(valor13) + parseToFloatOrZero(valor14) + parseToFloatOrZero(valor15) + parseToFloatOrZero(valor16);
        sumSpecialOffering = parseToFloatOrZero(valor3) + parseToFloatOrZero(valor4) + parseToFloatOrZero(valor5) + parseToFloatOrZero(valor6);
        tichesOfTiches.value = totalTiches.value * 0.10
    }
}


btnSave.addEventListener('click', async (e) => {
    e.preventDefault();

    /*if((amountFac1 != 0 && amountFac2 != 0 && amountFac3 != 0 && amountFac4 != 0 && amountFac5 != 0 && amountFac6 != 0) && countImage <= 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            position: 'top-center',
            text: "No puede guardar la factura si no cargado ningun recibo",
            width: '200px'                      
        });

        return
    }*/

    const typeService = Array.from(service).map(input => input.value);
    if (typeService[1] === "X") {
        console.log(`Servicio en la posicion 1 ${typeService[1]}`);
        isLocal = typeService[1]
        isVisita = "";
    } else if (typeService[0] === "X") {
        isVisita = typeService[0]
        isLocal = "";
    }

    if (isLocal != "") {
        markService = 'Local'
    }

    if (isVisita != "") {
        markService = 'Visita'
    }

    if (typeService[1] != "X" && typeService[0] != "X") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe de digitar la letra X en el campo de culto",
            width: '200px'
        });
    }


    console.log(`name: ${nameChurch.value} - fecha: ${dateEntrie.value} - culto: ${markService} - specialOffering: ${totalSpecialOffering} - tithes: ${tithes} - anotherConcept: ${anotherConcept}`);

    entrieLike["name"] = nameChurch.value
    entrieLike["service"] = markService
    entrieLike["dayly_offering"] = valor1
    entrieLike["mission_offering"] = valor2
    entrieLike["special_offering"] = sumSpecialOffering
    entrieLike["total_tithes"] = totalTiches.value
    entrieLike["total"] = entradaTotal.value
    entrieLike["id_department"] = parseToFloatOrZero(departamento)
    entrieLike["created_on"] = dateEntrie.value
    //saveEntries

    try {

        let reviewServer = 0;

        let divImg = document.getElementById('fieldsImg');
        let wirelesImg = document.createElement('IMG');
        //wirelesImg.setAttribute('class', 'conected')
        wirelesImg.setAttribute("width", "50");
        wirelesImg.setAttribute("height", "50");
        wirelesImg.setAttribute('alt', 'wireles');
        wirelesImg.setAttribute('class', 'conected')
        // wirelesImg.src = '/img/WirelesSignal.png';       

        //divImg.appendChild(wirelesImg);
        

        // CheckConnection
        //const idInterval = setInterval( async() => { 



        const serverConection = await checkHealth();

        let allData = 0; //serverConection['data'];

        if (serverConection > 0) {
            allData = serverConection;
        } else {
            allData = serverConection['data'];
        }

        console.log(`All Data is Equal: ${allData}`);


        if (allData === 0) {
            console.log(allData);
            const imgConected = document.querySelector('.conected');

            let conexImg = document.querySelector('img[src="/img/WirelesSignal.png"]')
            
            console.log(`IS CONECTED ${isObjectEmpty(conexImg)}`);
            

            if (!isObjectEmpty(conexImg)) {
                divImg.removeChild(conexImg);
            } else {
             //wirelesImg.setAttribute('class', 'unconected');
             wirelesImg.setAttribute('src', '/img/WirelesUnSignal.png');
             divImg.appendChild(wirelesImg);              
            }
            return;
        } else {
            const myImage = document.querySelector('.conected');          

            console.log(`type img ${typeof(myImage)}`);
            console.log(`is img ${isObjectEmpty(myImage)}`);
            if (isObjectEmpty(myImage)) {
                divImg.removeChild(myImage);
            }            
            
            //idEntrie = allData['ID_FINANCIAL_STATEMENTS']
            wirelesImg.setAttribute('src', '/img/WirelesSignal.png');    
            divImg.appendChild(wirelesImg);        
            // wirelesImg.src = '/img/WirelesSignal.png';
            reviewServer = allData;
            console.log(`BEFORE All DATA: --> :${reviewServer}`);
        }

        //}, 1000)

        console.log(`AFTER All DATA: --> :${reviewServer}`);

        //setTimeout(async () => {
        //}, 5000);
        console.log(`All DATA: --> :${reviewServer}`);

        if (reviewServer > 0) {
            console.log(reviewServer);
            //clearInterval(idInterval)


            console.log(`Before Review Chech ${reviewServer}`);


            const entrie = await saveEntries(entrieLike);
            idEntrie = entrie['data']['ID_FINANCIAL_STATEMENTS'];


            console.log(`[INSERTED ENTRIE EQUAL: ]${idEntrie}`);

            /**
             * hacer un arreglo de objeto y luego un loop para irlos guardando
             */

            if (idEntrie != 0) { // === 0

                console.log(`Diezmador ${parseToFloatOrZero(diezmador1.value)}`);
                console.log(`Value Diezmador ${valor7}`);
                console.log(`Concepto ${parseToFloatOrZero(concept1.value)}`);
                console.log(`Value Concepto ${valor17}`);



                if ((parseToFloatOrZero(diezmador1.value) > 0 && valor7 > 0) || (concept1.value > 0 && valor17 > 0)) {

                    anotherEntrie["id_financial_statements"] = idEntrie;
                    anotherEntrie["decimator_number"] = parseToFloatOrZero(diezmador1.value);
                    anotherEntrie["amount_tithes"] = valor7;
                    anotherEntrie["another_number_concept"] = concept1.value;
                    anotherEntrie["amount_another_concept"] = valor17;
                    entries[0] = anotherEntrie;

                }

                if ((parseToFloatOrZero(diezmador2.value) > 0 && valor8 > 0) || (concept2.value != "" && valor18 > 0)) {

                    anotherEntrie1["id_financial_statements"] = idEntrie;
                    anotherEntrie1["decimator_number"] = parseToFloatOrZero(diezmador2.value);
                    anotherEntrie1["amount_tithes"] = valor8;
                    anotherEntrie1["another_number_concept"] = concept2.value;
                    anotherEntrie1["amount_another_concept"] = valor18;

                    entries[1] = anotherEntrie1;
                }

                if ((parseToFloatOrZero(diezmador3.value) > 0 && valor9 > 0) || (concept3.value != "" && valor19 > 0)) {

                    anotherEntrie2["id_financial_statements"] = idEntrie;
                    anotherEntrie2["decimator_number"] = parseToFloatOrZero(diezmador3.value);
                    anotherEntrie2["amount_tithes"] = valor9;
                    anotherEntrie2["another_number_concept"] = concept3.value;
                    anotherEntrie2["amount_another_concept"] = valor19;

                    entries[2] = anotherEntrie2;
                }

                if ((parseToFloatOrZero(diezmador4.value) > 0 && valor10 > 0) || (concept4.value != "" && valor20 > 0)) {

                    anotherEntrie3["id_financial_statements"] = idEntrie;
                    anotherEntrie3["decimator_number"] = parseToFloatOrZero(diezmador4.value);
                    anotherEntrie3["amount_tithes"] = valor10;
                    anotherEntrie3["another_number_concept"] = concept4.value;
                    anotherEntrie3["amount_another_concept"] = valor20;

                    entries[3] = anotherEntrie3;
                }


                if ((parseToFloatOrZero(diezmador5.value) > 0 && valor11 > 0) || (concept5.value != "" && valor21 > 0)) {

                    anotherEntrie4["id_financial_statements"] = idEntrie;
                    anotherEntrie4["decimator_number"] = parseToFloatOrZero(diezmador5.value);
                    anotherEntrie4["amount_tithes"] = valor11;
                    anotherEntrie4["another_number_concept"] = concept5.value;
                    anotherEntrie4["amount_another_concept"] = valor21;

                    entries[4] = anotherEntrie4;
                }

                if ((parseToFloatOrZero(diezmador6.value) > 0 && valor12 > 0) || (concept6.value != "" && valor22 > 0)) {

                    anotherEntrie5["id_financial_statements"] = idEntrie;
                    anotherEntrie5["decimator_number"] = parseToFloatOrZero(diezmador6.value);
                    anotherEntrie5["amount_tithes"] = valor12;
                    anotherEntrie5["another_number_concept"] = concept6.value;
                    anotherEntrie5["amount_another_concept"] = valor22;

                    entries[5] = anotherEntrie5;
                }

                if ((parseToFloatOrZero(diezmador7.value) > 0 && valor13 > 0) || (concept7.value != "" && valor23 > 0)) {

                    anotherEntrie6["id_financial_statements"] = idEntrie;
                    anotherEntrie6["decimator_number"] = parseToFloatOrZero(diezmador7.value);
                    anotherEntrie6["amount_tithes"] = valor13;
                    anotherEntrie6["another_number_concept"] = concept7.value;
                    anotherEntrie6["amount_another_concept"] = valor23;

                    entries[6] = anotherEntrie6;
                }

                if ((parseToFloatOrZero(diezmador8.value) > 0 && valor14 > 0) || (concept8.value != "" && valor24 > 0)) {

                    anotherEntrie7["id_financial_statements"] = idEntrie;
                    anotherEntrie7["decimator_number"] = parseToFloatOrZero(diezmador8.value);
                    anotherEntrie7["amount_tithes"] = valor14;
                    anotherEntrie7["another_number_concept"] = concept8.value;
                    anotherEntrie7["amount_another_concept"] = valor24;

                    entries[7] = anotherEntrie7;
                }


                if ((parseToFloatOrZero(diezmador9.value) > 0 && valor15 > 0) || (concept9.value != "" && valor25 > 0)) {

                    anotherEntrie8["id_financial_statements"] = idEntrie;
                    anotherEntrie8["decimator_number"] = parseToFloatOrZero(diezmador9.value);
                    anotherEntrie8["amount_tithes"] = valor15;
                    anotherEntrie8["another_number_concept"] = concept9.value;
                    anotherEntrie8["amount_another_concept"] = valor25;

                    entries[8] = anotherEntrie8;
                }

                if ((parseToFloatOrZero(diezmador10.value) > 0 && valor16 > 0) || (concept10.value != "" && valor26 > 0)) {

                    anotherEntrie9["id_financial_statements"] = idEntrie;
                    anotherEntrie9["decimator_number"] = parseToFloatOrZero(diezmador10.value);
                    anotherEntrie9["amount_tithes"] = valor16;
                    anotherEntrie9["another_number_concept"] = concept10.value;
                    anotherEntrie9["amount_another_concept"] = valor26;

                    entries[9] = anotherEntrie9;
                }


                entries.forEach(async entrie => {

                    console.log(`The LEN Entrie ${Object.keys(entries[0]).length}`);


                    if (Object.keys(entries[0]).length > 0) {
                        console.log(`The entrie value is: ${JSON.stringify(entrie, null, 4)}`);
                        const saveAnotherEntrie = await saveAnotherEntries(entrie);
                        console.log(saveAnotherEntrie);
                    }



                })
            }

        } // End reviewServer

        // #region Deductions

        if ((titleNameHelper1.value != "" && parseToFloatOrZero(valueAmoutHelp1) > 0) || (titlePayPastor1.value != "" && parseToFloatOrZero(valueAmout1) > 0)) {

            pastorDeduction1["name_help"] = titleNameHelper1.value;
            pastorDeduction1["speccial_help"] = parseToFloatOrZero(valueAmoutHelp1);
            pastorDeduction1["name_pastor"] = titlePayPastor1.value;
            pastorDeduction1["payment_pastor"] = parseToFloatOrZero(valueAmout1);
            pastorDeduction1["tithe_of_tithes"] = 0;
            pastorDeduction1["id_financial_statements"] = idEntrie;
            pastorDeduction1["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[0] = pastorDeduction1;

        }

        if ((titleNameHelper2.value != "" && parseToFloatOrZero(valueAmoutHelp2) > 0) || (titlePayPastor2.value != "" && parseToFloatOrZero(valueAmout2) > 0)) {

            pastorDeduction2["name_help"] = titleNameHelper2.value;
            pastorDeduction2["speccial_help"] = parseToFloatOrZero(valueAmoutHelp2);
            pastorDeduction2["name_pastor"] = titlePayPastor2.value;
            pastorDeduction2["payment_pastor"] = parseToFloatOrZero(valueAmout2);
            pastorDeduction2["tithe_of_tithes"] = 0;
            pastorDeduction2["id_financial_statements"] = idEntrie;
            pastorDeduction2["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[1] = pastorDeduction2;

        }

        if ((titleNameHelper3.value != "" && parseToFloatOrZero(valueAmoutHelp3) > 0) || (titlePayPastor3.value != "" && parseToFloatOrZero(valueAmout3) > 0)) {

            pastorDeduction3["name_help"] = titleNameHelper3.value;
            pastorDeduction3["speccial_help"] = parseToFloatOrZero(valueAmoutHelp3);
            pastorDeduction3["name_pastor"] = titlePayPastor3.value;
            pastorDeduction3["payment_pastor"] = parseToFloatOrZero(valueAmout3);
            pastorDeduction3["tithe_of_tithes"] = 0;
            pastorDeduction3["id_financial_statements"] = idEntrie;
            pastorDeduction3["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[2] = pastorDeduction3;

        }

        if ((titleNameHelper4.value != "" && parseToFloatOrZero(valueAmoutHelp4) > 0) || (titlePayPastor4.value != "" && parseToFloatOrZero(valueAmout4) > 0)) {

            pastorDeduction4["name_help"] = titleNameHelper4.value;
            pastorDeduction4["speccial_help"] = parseToFloatOrZero(valueAmoutHelp4);
            pastorDeduction4["name_pastor"] = titlePayPastor4.value;
            pastorDeduction4["payment_pastor"] = parseToFloatOrZero(valueAmout4);
            pastorDeduction4["tithe_of_tithes"] = 0;
            pastorDeduction4["id_financial_statements"] = idEntrie;
            pastorDeduction4["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[3] = pastorDeduction4;

        }

        if ((titleNameHelper5.value != "" && parseToFloatOrZero(valueAmoutHelp5) > 0) || (titlePayPastor5.value != "" && parseToFloatOrZero(valueAmout5) > 0)) {

            pastorDeduction5["name_help"] = titleNameHelper5.value;
            pastorDeduction5["speccial_help"] = parseToFloatOrZero(valueAmoutHelp5);
            pastorDeduction5["name_pastor"] = titlePayPastor5.value;
            pastorDeduction5["payment_pastor"] = parseToFloatOrZero(valueAmout5);
            pastorDeduction5["tithe_of_tithes"] = 0;
            pastorDeduction5["id_financial_statements"] = idEntrie;
            pastorDeduction5["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[4] = pastorDeduction5;

        }

        if ((titleNameHelper6.value != "" && parseToFloatOrZero(valueAmoutHelp6) > 0) ||
            (titlePayPastor6.value != "" && parseToFloatOrZero(valueAmout6)) ||
            (parseToFloatOrZero(tichesOfTiches.value) != 0)) {

            pastorDeduction6["name_help"] = titleNameHelper6.value;
            pastorDeduction6["speccial_help"] = parseToFloatOrZero(valueAmoutHelp6);
            pastorDeduction6["name_pastor"] = titlePayPastor6.value;
            pastorDeduction6["payment_pastor"] = parseToFloatOrZero(valueAmout6);
            pastorDeduction6["tithe_of_tithes"] = parseToFloatOrZero(tichesOfTiches.value);
            pastorDeduction6["id_financial_statements"] = idEntrie;
            pastorDeduction6["id_department"] = parseToFloatOrZero(departamento)

            allDeductions[5] = pastorDeduction6;
        }

        allDeductions.forEach(async deduction => {
            console.log(`The LEN Deduction ${allDeductions.length}`);

            if (allDeductions.length > 0 && idEntrie != 0) {
                console.log(`The Deduction value is: ${JSON.stringify(deduction, null, 4)}`);
                const saveAllDeductions = await saveDeductions(deduction);
                console.log(saveAllDeductions);

            }
        })


        // #endregion Deductions

        // #region Block of Receipts  

        if (idEntrie > 0 && idsReceipts.length > 0) {

            for (let i = 0; i < idsReceipts.length; i++) {

                /*console.log(`The Receipt is: ${JSON.stringify(receipt, null, 4)}` ); */

                const UpdateReceipts = await saveUpdateReceipts({ "id_receipts": idsReceipts[i], "id_financial_statements": idEntrie });
                console.log(UpdateReceipts);

            }

        }








        // #endregion Block of Receipts




    } catch (error) {
        if (!(error instanceof Error)) {
            error = new Error(error);
        }
        console.log(`Name Error: ${error.name}`);
        console.error(`Error: ${error.message}`);
        console.log(`Stack Error: ${error.stack}`);


    }

});


const procesingValueInput = function (inputText) {

    let total = 0;
    let previousValue = '';
    let previousSelectionStart = 0;

    inputText.addEventListener('input', (e) => {
        const currentValue = e.target.value;
        const currentSelectionStart = e.target.selectionStart;

        if (currentValue.length > previousValue.length) {
            // Text was inserted
            const insertedText = currentValue.slice(
                currentSelectionStart - (currentValue.length - previousValue.length),
                currentSelectionStart
            );
            const insertedNumber = parseFloat(insertedText) || 0;
            total += insertedNumber;
        } else if (currentValue.length < previousValue.length) {
            // Text was deleted
            const deletedText = previousValue.slice(
                currentSelectionStart,
                currentSelectionStart + (previousValue.length - currentValue.length)
            );
            const deletedNumber = parseFloat(deletedText) || 0;
            total -= deletedNumber;
        }

        //entradaTotal.value = currentValue;
        previousValue = currentValue;
        previousSelectionStart = currentSelectionStart;

        console.log(`Total: ${total} \n ValorPrevio: ${previousValue} \n SelectionStart: ${previousSelectionStart}`);

    });

    return inputText;
}

function isEmpty(str) {
    return !str.trim().length;
}

function isObjectEmpty(obj) {

    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }
    return true
}