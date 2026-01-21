import { User } from "./Clases/User.js";
import { fetchUsers } from "./Services/usersService.js";

const form=document.getElementById("form") as HTMLFormElement;
const inputName=document.querySelector(".input-nombre") as HTMLInputElement;
const inputMail=document.querySelector(".input-email") as HTMLInputElement;
const inputPassword=document.querySelector(".input-password")as HTMLInputElement;

const btnSubmit=document.querySelector(".boton-form")as HTMLElement;
const adminLogin=document.getElementById("admin-login")as HTMLElement;
const adminPanel=document.getElementById("admin-panel")as HTMLElement;

const userError=document.getElementById("user-error") as HTMLElement;
const mailError=document.getElementById("mail-error")as HTMLElement;
const passwordError=document.getElementById("password-error")as HTMLElement;




form.addEventListener('submit',async(e)=>{
    e.preventDefault();//para que no recargue
    const user=await loginUser(inputName.value,inputMail.value,inputPassword.value)
    if(user){
        if(user.getIsAdmin()){
            //llamo funcion para mostrar informacion
            inicioUsuario(user.getName())//obtengo dato con el metodo de la clase
        }else{
            accesoDenegado();
        }
    }else{
        datosIncorrectos();
    }
})
async function loginUser(name:string,email:string,password:string):Promise<User|null> {
    const users=await fetchUsers();
    
    // if (!inputMail.value || !inputPassword.value || !inputName.value) {
    //     console.log("Campos obligatorios");
    //     return null; 
    // }
    for(const data of users){
        if(data.email===email && data.password===password && data.name===name){
            return new User(data);
        }
    }
    return null;
    
}
//----FUNCIONES PARA ACCESO-----
//funcion para que se esconda el formulario
const sectBienvenida=document.getElementById("sect-bienvenida")as HTMLElement;
const bienvenida=document.getElementById("bienvenida") as HTMLElement;
function inicioUsuario(nombre:string|null){
    const msjBienvenida=document.createElement("h2") as HTMLHeadingElement;
    msjBienvenida.textContent= `Bienvenido ${nombre} (Administrador)`;
    bienvenida.appendChild(msjBienvenida);
    //muestro informacion
    sectBienvenida?.classList.remove("hide")//muestro mensaje de bienvenida
    form.classList.add("hide")//escondo el formulario
    adminPanel.classList.remove("hide")//muestro panel de opciones
}
//Funcion para acceso denegado
function accesoDenegado(){
    const msjDenegado=document.createElement("h3") as HTMLHeadingElement;
    msjDenegado.textContent="Acceso denegado, no eres administrador";
    sectBienvenida.appendChild(msjDenegado);
    //muestro informacion
    sectBienvenida?.classList.remove("hide")//muestro mensaje de bienvenida
    form.classList.add("hide")//escondo el formulario
}
//funcion datos incorrectos
function datosIncorrectos(){
    const errorExistente=document.getElementById("datos-incorrectos")
    if(!errorExistente){//para que no se repitan y creen mismos mensajes
        const msjIncorrecto=document.createElement("p") as HTMLElement;
        msjIncorrecto.textContent="Datos incorrectos";
        msjIncorrecto.setAttribute("id", "datos-incorrectos")
        form.appendChild(msjIncorrecto);//lo agrego en el form
    }
    
}


//----FUNCIONES PARA EL CONTENIDO----

//funcion para que aparezcan listado de usuarios





//funcion para que aparezcan  productos











//----------Validacion de datos--------------
//Verifico nombre
inputName.addEventListener("input",()=>{
    const value=inputName.value;
    userError.innerText="";
    if(value.length<3){
        userError.innerText="El usuario debe tener al menos 3 caracteres"
        return;
    }
    if(value.length>15){
        userError.innerText="Maximo 15 caracteres";
        return;
    }
    const nombreDeg = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (value.length > 0 && !nombreDeg.test(value)) {
        userError.innerText = "El nombre no puede contener números ni símbolos.";
    }
})
//Verifico email
inputMail.addEventListener("input",()=>{
    const value=inputMail.value;
    mailError.innerText=""
     if (!value.includes("@") || !value.includes(".")) {
        mailError.innerText = "Mail no válido";
    }
    if (value.indexOf(".") < value.indexOf("@")) {
        mailError.innerText = "Mail no válido";
    }
})
//verifico contraseña
inputPassword.addEventListener("input",()=>{
    const value=inputPassword.value;
    passwordError.innerText="";
    if(value.length<3){
        passwordError.innerText="La contraseña debe tener al menos 3 caracteres."
    }
    if(value.length>15){
        passwordError.innerText="Maximo 15 caracteres";
      
    }
})