import { sendMail } from '../src/tesoreria/use-cases/mail.js'

window.onload = (e) => {
    e.preventDefault();
    console.log(`A quien concierne`);
    mailSend();
}

function mailSend() {
    const form = document.querySelector('.formulario');
    const name = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const bodyMessage = document.querySelector('#mensaje');
    const feedbackElement = document.getElementById('emailFeedback');
    const btnSend = document.querySelector('.boton')

    const parentDiv = document.querySelector('#idmail');
    const parentDivName = document.querySelector('#idname')

    const textarea = document.getElementById('mensaje');
    const counterArea = document.getElementById('countletter');

    textarea.addEventListener('input', () => {
        counterArea.textContent = `minimo 10 caracteres, maximo 500, usted a digitado:${textarea.value.length}`;
        if (textarea.value.length > 500) {
            counterArea.setAttribute('style', 'color:red; font-weight: bold;')
        } else {
            counterArea.setAttribute('style', 'color:green;')
        }
    })


    btnSend.addEventListener('click', async (event) => {
        event.preventDefault()
        console.log('Correo enviado!:🤞');

        if (name.value === '') {
            setTimeout(() => {
                //feedbackElement.textContent = "Por favor ingrese un email correcto.";                
                spanValidate.remove();
            }, 2000)
            const spanValidate = document.createElement('span');
            spanValidate.id = "spanameid";
            spanValidate.classList.add("spanameclass");
            spanValidate.setAttribute('style', 'font-size: 12px');
            spanValidate.textContent = "Por favor ingrese su nombre.";
            spanValidate.style.color = "red";
            parentDivName.appendChild(spanValidate);

            return
        }


        if (validateEmail(email.value)) {
            //feedbackElement.textContent = "";
            console.log(`Ready! send mail`);

        } else {
            setTimeout(() => {
                //feedbackElement.textContent = "Por favor ingrese un email correcto.";                
                spanValidate.remove();
            }, 2000)
            const spanValidate = document.createElement('span');
            spanValidate.id = "spanid";
            spanValidate.classList.add("spanclass");
            spanValidate.setAttribute('style', 'font-size: 12px');
            spanValidate.textContent = "Por favor ingrese un email correcto.";
            spanValidate.style.color = "red";
            parentDiv.appendChild(spanValidate);

            return

            /*email.addEventListener('invalid', () => {
                email.setCustomValidity('Por favor ingrese un email correcto.');
            })*/
        }

        // console.log(`Validate lenght ${validateTextareaLength()}`);


        if (!validateTextareaLength()) {
            event.preventDefault();
            return 
        }

        let mailObj = {};
        // let sequence = [];

        mailObj["sendfrom"] = 'iglesiacristo.mi@gmail.com';
        mailObj["sendto"] = email.value;
        mailObj["sendsubject"] = `${name.value} ✔`;
        mailObj["textbody"] = bodyMessage.value;

        const send = await sendMail(mailObj)
        console.log(send);

        counterArea.textContent = "";
        form.reset();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "El correo ha sido enviado",
            showCancelButton: false,
            timer: 2000
        })


    })

}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validateTextareaLength() {
    const textareadiv = document.getElementById('idmessage');
    const textarea = document.getElementById('mensaje');
    const minLength = 10; // Example minimum length
    const maxLength = 500; // Example maximum length


    if (textarea.value.length < minLength) {
        //alert(`Please enter at least ${minLength} characters.`);

        setTimeout(() => {
            //feedbackElement.textContent = "Por favor ingrese un email correcto.";                
            spanValidate.remove();
        }, 2000)
        const spanValidate = document.createElement('span');
        spanValidate.id = "spanmessageid";
        spanValidate.classList.add("spanmessageclass");
        spanValidate.setAttribute('style', 'font-size: 12px');
        spanValidate.textContent = `Por favor ingrese al menos ${minLength} caracteres`;
        spanValidate.style.color = "red";
        textareadiv.appendChild(spanValidate);

        return false;
    }

    if (textarea.value.length > maxLength) {
        // alert(`Please enter no more than ${maxLength} characters.`);
        setTimeout(() => {
            //feedbackElement.textContent = "Por favor ingrese un email correcto.";                
            spanValidate.remove();
        }, 2000)
        const spanValidate = document.createElement('span');
        spanValidate.id = "spanmessageid";
        spanValidate.classList.add("spanmessageclass");
        spanValidate.setAttribute('style', 'font-size: 12px');
        spanValidate.textContent = `Por favor no introduzca más de ${maxLength} caracteres`;
        spanValidate.style.color = "red";
        textareadiv.appendChild(spanValidate);

        return false;
    }

    return true; // Validation passed
}