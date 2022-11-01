export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput,input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"

];


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },

    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },

    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años"
    },

    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },

    direccion: {
        valueMissing: "Este campo no puede estar vacio",
    },

    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
    },

    provincias: {
        valueMissing: "Este campo no puede estar vacio",
    },
}

const validadores = {
    nacimiento:(input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoInput,input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoInput,error)
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoInput][error]);
            mensaje = mensajesDeError[tipoInput][error];
        }
    });


    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fechaActual.getUTCFullYear() + 18, fechaActual.getUTCMonth(), fechaActual.getUTCDate())
    console.log(diferenciaFechas <= fechaActual);
    return diferenciaFechas < fechaActual;
}

