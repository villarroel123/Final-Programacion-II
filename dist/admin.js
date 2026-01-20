var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchUsers } from "./Services/usersService";
const inputName = document.querySelector(".input-nombre");
const inputMail = document.querySelector(".input-email");
const inputPassword = document.querySelector(".input-password");
const btnSubmit = document.querySelector(".boton-form");
const adminLogin = document.getElementById("admin-login");
const adminPanel = document.getElementById("admin-panel");
const userError = document.getElementById("user-error");
const mailError = document.getElementById("mail-error");
const passwordError = document.getElementById("password-error");
function loginUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers();
        if ()
            ;
    });
}
btnSubmit.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    e.preventDefault(); //para que no recargue
    //Validacion de formulario
    if (!inputMail.value || !inputPassword.value || !inputName.value) {
        console.log("campos obligatorios");
    }
    if (!((_a = inputMail.ariaValueMax) === null || _a === void 0 ? void 0 : _a.includes("@"))) {
        console.log("email invalido");
    }
    const user = yield ;
}));
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
    if (value.length < 8) {
        passwordError.innerText = "La contraseña debe tener al menos 8 caracteres.";
    }
    if (value.length > 15) {
        passwordError.innerText = "Maximo 15 caracteres";
    }
});
//# sourceMappingURL=admin.js.map