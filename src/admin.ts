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
            console.log("Acceso permitido a "+ user.getName());
            //llamo funcion para mostrar informacion
        }else{
            console.log("Acceso denegado, no eres administrador")
        }
    }else{
        console.log("Datos incorrectos")
    }

})
async function loginUser(name:string,email:string,password:string):Promise<User|null> {
    const users=await fetchUsers();


    for(const data of users){
        if(data.email===email && data.password===password && data.name===name){
            return new User(data);
        }
    }
    return null;
}

//funcion para que se esconda el formulario



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
    if(value.length<8){
        passwordError.innerText="La contraseña debe tener al menos 3 caracteres."
    }
    if(value.length>15){
        passwordError.innerText="Maximo 15 caracteres";
      
    }
})