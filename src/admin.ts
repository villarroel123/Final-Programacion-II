import { User } from "./Clases/User";
import { IuserData } from "./Interfaces/userData";
import { fetchUsers } from "./Services/usersService";

const inputName=document.querySelector(".input-nombre") as HTMLInputElement;
const inputMail=document.querySelector(".input-email") as HTMLInputElement;
const inputPassword=document.querySelector(".input-password")as HTMLInputElement;

const btnSubmit=document.querySelector(".boton-form")as HTMLElement;
const adminLogin=document.getElementById("admin-login")as HTMLElement;
const adminPanel=document.getElementById("admin-panel")as HTMLElement;

const userError=document.getElementById("user-error") as HTMLInputElement;
const mailError=document.getElementById("mail-error")as HTMLInputElement;
const passwordError=document.getElementById("password-error")as HTMLInputElement;


async function loginUser(name:string,email:string,password:string):Promise<User> {
    const users=await fetchUsers();

    if()

}




btnSubmit.addEventListener('submit',async(e)=>{
    e.preventDefault();//para que no recargue

    //Validacion de formulario
    if(!inputMail.value||!inputPassword.value||!inputName.value){
        console.log("campos obligatorios")
    }
    if(!inputMail.ariaValueMax?.includes("@")){
        console.log("email invalido")
    }

    const user=await 
})




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
        passwordError.innerText="La contraseña debe tener al menos 8 caracteres."
    }
    if(value.length>15){
        passwordError.innerText="Maximo 15 caracteres";
      
    }
})