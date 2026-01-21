var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "./Clases/User.js";
import { fetchUsers } from "./Services/usersService.js";
const form = document.getElementById("form");
const inputName = document.querySelector(".input-nombre");
const inputMail = document.querySelector(".input-email");
const inputPassword = document.querySelector(".input-password");
const btnSubmit = document.querySelector(".boton-form");
const adminLogin = document.getElementById("admin-login");
const adminPanel = document.getElementById("admin-panel");
const userError = document.getElementById("user-error");
const mailError = document.getElementById("mail-error");
const passwordError = document.getElementById("password-error");
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); //para que no recargue
    const user = yield loginUser(inputName.value, inputMail.value, inputPassword.value);
    if (user) {
        if (user.getIsAdmin()) {
            //llamo funcion para mostrar informacion
            inicioUsuario(user.getName()); //obtengo dato con el metodo de la clase
        }
        else {
            accesoDenegado();
        }
    }
    else {
        datosIncorrectos();
    }
}));
function loginUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers();
        // if (!inputMail.value || !inputPassword.value || !inputName.value) {
        //     console.log("Campos obligatorios");
        //     return null; 
        // }
        for (const data of users) {
            if (data.email === email && data.password === password && data.name === name) {
                return new User(data);
            }
        }
        return null;
    });
}
//----FUNCIONES PARA ACCESO-----
//funcion para que se esconda el formulario
const sectBienvenida = document.getElementById("sect-bienvenida");
const bienvenida = document.getElementById("bienvenida");
function inicioUsuario(nombre) {
    const msjBienvenida = document.createElement("h2");
    msjBienvenida.textContent = `Bienvenido ${nombre} (Administrador)`;
    bienvenida.appendChild(msjBienvenida);
    //muestro informacion
    sectBienvenida === null || sectBienvenida === void 0 ? void 0 : sectBienvenida.classList.remove("hide"); //muestro mensaje de bienvenida
    form.classList.add("hide"); //escondo el formulario
    adminPanel.classList.remove("hide"); //muestro panel de opciones
}
//Funcion para acceso denegado
function accesoDenegado() {
    const msjDenegado = document.createElement("h3");
    msjDenegado.textContent = "Acceso denegado, no eres administrador";
    sectBienvenida.appendChild(msjDenegado);
    //muestro informacion
    sectBienvenida === null || sectBienvenida === void 0 ? void 0 : sectBienvenida.classList.remove("hide"); //muestro mensaje de bienvenida
    form.classList.add("hide"); //escondo el formulario
}
//funcion datos incorrectos
function datosIncorrectos() {
    const errorExistente = document.getElementById("datos-incorrectos");
    if (!errorExistente) { //para que no se repitan y creen mismos mensajes
        const msjIncorrecto = document.createElement("p");
        msjIncorrecto.textContent = "Datos incorrectos";
        msjIncorrecto.setAttribute("id", "datos-incorrectos");
        form.appendChild(msjIncorrecto); //lo agrego en el form
    }
}
//----FUNCIONES PARA EL CONTENIDO----
//funcion para que aparezcan listado de usuarios
//funcion para que aparezcan  productos
//----------Validacion de datos--------------
//Verifico nombre
inputName.addEventListener("input", () => {
    const value = inputName.value;
    userError.innerText = "";
    if (value.length < 3) {
        userError.innerText = "El usuario debe tener al menos 3 caracteres";
        return;
    }
    if (value.length > 15) {
        userError.innerText = "Maximo 15 caracteres";
        return;
    }
    const nombreDeg = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (value.length > 0 && !nombreDeg.test(value)) {
        userError.innerText = "El nombre no puede contener números ni símbolos.";
    }
});
//Verifico email
inputMail.addEventListener("input", () => {
    const value = inputMail.value;
    mailError.innerText = "";
    if (!value.includes("@") || !value.includes(".")) {
        mailError.innerText = "Mail no válido";
    }
    if (value.indexOf(".") < value.indexOf("@")) {
        mailError.innerText = "Mail no válido";
    }
});
//verifico contraseña
inputPassword.addEventListener("input", () => {
    const value = inputPassword.value;
    passwordError.innerText = "";
    if (value.length < 3) {
        passwordError.innerText = "La contraseña debe tener al menos 3 caracteres.";
    }
    if (value.length > 15) {
        passwordError.innerText = "Maximo 15 caracteres";
    }
});
//# sourceMappingURL=admin.js.map