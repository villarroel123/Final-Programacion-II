var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Product } from "./Clases/Product.js";
import { User } from "./Clases/User.js";
import { fetchProduct } from "./Services/productService.js";
import { fetchUsers } from "./Services/usersService.js";
const form = document.getElementById("form");
const inputName = document.querySelector(".input-nombre");
const inputMail = document.querySelector(".input-email");
const inputPassword = document.querySelector(".input-password");
const adminPanel = document.getElementById("admin-panel");
const userError = document.getElementById("user-error");
const mailError = document.getElementById("mail-error");
const passwordError = document.getElementById("password-error");
////-----------------------------------------------FUNCIONES PARA ACCESO----------------------------------------------------////
//---FUNCION AL ENVIAR FORMULARIO---//
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); //para que no recargue
    //paso como parametro los valores ingresados en los inputs
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
//---FUNCION PARA AUTENTICACIÓN---//
//primero compruebo que los datos ingresados coincidad y si coinciden creo instancia de User
function loginUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers(); //traigo datos del json
        //compruebo si coinciden datos
        for (const data of users) {
            if (data.email === email && data.password === password && data.name === name) {
                return new User(data); //si coinciden creo instancia
            }
        }
        return null;
    });
}
//---FUNCION ACCESO PERMITIDO---//
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
    cardsUsers(); //muestro en primer lugar las cards de los usuarios
}
//---FUNCION ACCESO DENEGADO---//
function accesoDenegado() {
    const msjDenegado = document.createElement("h3");
    msjDenegado.textContent = "Acceso denegado, no eres administrador";
    sectBienvenida.appendChild(msjDenegado);
    //muestro informacion
    sectBienvenida === null || sectBienvenida === void 0 ? void 0 : sectBienvenida.classList.remove("hide"); //muestro mensaje de bienvenida
    form.classList.add("hide"); //escondo el formulario
}
//---FUNCION DATOS INGRESADOS INCORRECTOS---//
function datosIncorrectos() {
    const errorExistente = document.getElementById("datos-incorrectos");
    if (!errorExistente) { //para que no se repitan y creen mismos mensajes
        const msjIncorrecto = document.createElement("p");
        msjIncorrecto.textContent = "Datos incorrectos";
        msjIncorrecto.setAttribute("id", "datos-incorrectos");
        form.appendChild(msjIncorrecto); //lo agrego en el form
    }
}
////-------------------------------------FUNCIONES PARA MOSTRAR EL CONTENIDO--------------------------------------------------------/////
const panelUsuarios = document.getElementById("usuarios");
const panelProductos = document.getElementById("productos");
const panelAjustes = document.getElementById("ajustes");
const contenedorUsuarios = document.getElementById("cards-usuarios");
const contenedorProductos = document.getElementById("cards-productos");
//---FUNCION PARA CREAR INSTANCIAS PARA LAS CARDS DE USUARIOS---//
let stateUser = [];
function cargaUsuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield fetchUsers(); //traigo del JSON
        stateUser = []; // 
        for (const user of users) { //cada objeto lo convierto en instancia
            const userInstancia = new User(user);
            stateUser.push(userInstancia); //guardo instancia en array
        }
    });
}
//---FUNCION PARA LISTADO DE USUARIOS---//
function cardsUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield cargaUsuarios();
        contenedorUsuarios.innerHTML = "";
        stateUser.forEach(user => {
            const card = document.createElement("article");
            card.innerHTML = `
            <p>Nombre: ${user.getName()}</p>
            <p>Email: ${user.getEmail()}</p>
            <p>Rol: ${user.getIsAdmin() ? "Admin" : "Usuario"}</p>
            <button>Editar</button>
            <button>Eliminar</button>
        `;
            contenedorUsuarios.appendChild(card);
        });
    });
}
panelUsuarios.addEventListener("click", cardsUsers);
//---FUNCION PARA CREAR INSTANCIAS DE LAS CARDS DE PRODUCTOS---//
let stateProduct = [];
function cargarProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield fetchProduct(); //traigo JSON
        stateProduct = [];
        for (const product of products) {
            const productInstancia = new Product(product);
            stateProduct.push(productInstancia);
        }
    });
}
//---FUNCION PARA LISTADO DE PRODUCTOS---//
function productsCards() {
    return __awaiter(this, void 0, void 0, function* () {
        yield cargarProductos();
        contenedorProductos.innerHTML = "";
        stateProduct.forEach(product => {
            const card = document.createElement("article");
            const title = document.createElement("h4");
            const price = document.createElement("h5");
            const category = document.createElement("h5");
            const image = document.createElement("img");
            const description = document.createElement("p");
            const btn1 = document.createElement("button");
            const btn2 = document.createElement("button");
            //agrego contenido
            title.textContent = product.getName();
            price.textContent = product.getPrice();
            category.textContent = product.getCategory();
            image.src = product.getImage();
            description.textContent = product.getDescription();
            btn1.textContent = "Editar";
            btn2.textContent = "Eliminar";
            //agrego clases
            title.classList.add("ad-card-title");
            price.classList.add("ad-card-price");
            category.classList.add("ad-card-category");
            image.classList.add("ad-card-img");
            description.classList.add("ad-card-descrip");
            card.classList.add("ad-card");
            //agrego al contenedor
            card.appendChild(title);
            card.appendChild(price);
            card.appendChild(category);
            card.appendChild(image);
            card.appendChild(description);
            card.appendChild(btn1);
            card.appendChild(btn2);
            contenedorProductos.appendChild(card);
        });
    });
}
panelProductos.addEventListener("click", productsCards);
////------------------------------------------VALIDACION DE DATOS DEL FORMULARIO-------------------------------------////
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