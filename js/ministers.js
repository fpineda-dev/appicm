import { foundMinister } from '../src/tesoreria/use-cases/found-minister.js'

window.addEventListener('load', () => {
    findAllMinister();
})

async function findAllMinister() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    console.log(`This Id param ${id}`);
    

    const titleMinister = document.querySelector('h3')

    const data = await foundMinister(id);

    console.log(`Data in file ministers ${data[0]['id']}`);
    

    if (!isObjectEmpty(data)) {
        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value.id}`);
            

            switch (id) {
                case "1":
                    titleMinister.innerText = `Evangelismo`;
                    break;
                case "2":
                    titleMinister.innerText = `Escuela Biblica`;
                    break;
                case "3":
                    titleMinister.innerText = `Minísterio de Alabanzas`;
                    break;
                case "4":
                    titleMinister.innerText = `Minísterio de Danza`;
                    break;
                case "5":
                    titleMinister.innerText = `Minísterio de Diáconos`;
                    break;
                case "6":
                    titleMinister.innerText = `Minísterio de Damas`;
                    break;
                case "7":
                    titleMinister.innerText = `Minísterio de Caballeros`;
                    break;
                case "8":
                    titleMinister.innerText = `Minísterio de Jovenes`;
                    break;
                default:
                    titleMinister.innerText = `Minísterio no ha sido constituido por Dios`
                    break;
            }

            if (id == value.id) {
                console.log(`Entro a ${value.photo}`);

                const myImage = document.getElementById('imgMinister');
                myImage.src = value.photo;

                const fistParagraph = document.getElementById('paragraph');
                fistParagraph.innerText = value.paragraph;

                const secondParagraph = document.getElementById('block')
                secondParagraph.innerText = value.block;

                const thirdParagraph = document.getElementById('paragraphFooter')
                thirdParagraph.innerText = value.footer
                
            }
        }
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




