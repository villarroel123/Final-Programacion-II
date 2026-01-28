import { Product } from "./Clases/Product.js";
import { User } from "./Clases/User.js";
import { fetchProduct } from "./Services/productService.js";
import { fetchUsers } from "./Services/usersService.js";
import { category } from "./Types/Category.js";

const form=document.getElementById("form") as HTMLFormElement;
const inputNames=document.querySelector(".input-nombre") as HTMLInputElement;
const inputMail=document.querySelector(".input-email") as HTMLInputElement;
const inputPassword=document.querySelector(".input-password")as HTMLInputElement;
const adminPanel=document.getElementById("admin-panel")as HTMLElement;
const userError=document.getElementById("user-error") as HTMLElement;
const mailError=document.getElementById("mail-error")as HTMLElement;
const passwordError=document.getElementById("password-error")as HTMLElement;
////-----------------------------------------------FUNCIONES PARA ACCESO----------------------------------------------------////
//---FUNCION AL ENVIAR FORMULARIO---//
form.addEventListener('submit',async(e)=>{
    e.preventDefault();//para que no recargue
    //paso como parametro los valores ingresados en los inputs
    const user=await loginUser(inputNames.value,inputMail.value,inputPassword.value)
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
//---FUNCION PARA AUTENTICACIÓN---//
//primero compruebo que los datos ingresados coincidad y si coinciden creo instancia de User
async function loginUser(name:string,email:string,password:string):Promise<User|null> {
    const users=await fetchUsers();//traigo datos del json
    //compruebo si coinciden datos
    for(const data of users){
        if(data.email===email && data.password===password && data.name===name){
            return new User(data);//si coinciden creo instancia
        }
    }
    return null;
}
//---FUNCION ACCESO PERMITIDO---//
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
    cardsUsers()//muestro en primer lugar las cards de los usuarios
}
//---FUNCION ACCESO DENEGADO---//
function accesoDenegado(){
    const msjDenegado=document.createElement("h3") as HTMLHeadingElement;
    msjDenegado.textContent="Acceso denegado, no eres administrador";
    sectBienvenida.appendChild(msjDenegado);
    //muestro informacion
    sectBienvenida?.classList.remove("hide")//muestro mensaje de bienvenida
    form.classList.add("hide")//escondo el formulario
}
//---FUNCION DATOS INGRESADOS INCORRECTOS---//
function datosIncorrectos(){
    const errorExistente=document.getElementById("datos-incorrectos")
    if(!errorExistente){//para que no se repitan y creen mismos mensajes
        const msjIncorrecto=document.createElement("p") as HTMLElement;
        msjIncorrecto.textContent="Datos incorrectos";
        msjIncorrecto.setAttribute("id", "datos-incorrectos")
        form.appendChild(msjIncorrecto);//lo agrego en el form
    }
}
////-------------------------------------FUNCIONES PARA MOSTRAR EL CONTENIDO--------------------------------------------------------/////
const panelUsuarios=document.getElementById("usuarios") as HTMLHeadingElement;
const panelProductos=document.getElementById("productos") as HTMLHeadingElement;
const contenedorUsuarios= document.getElementById("cards-usuarios") as HTMLElement;
const contenedorProductos=document.getElementById("cards-productos") as HTMLElement;
const overlayModal=document.querySelector(".container-modal") as HTMLElement;
//---FUNCION PARA CREAR INSTANCIAS PARA LAS CARDS DE USUARIOS---//
let stateUser: any[] =[];
async function cargaUsuarios() {
    if (stateUser.length > 0) return;//si hay cards, que no recargue
    const users=await fetchUsers()//traigo del JSON
    stateUser = []; // 
     for (const user of users) {//cada objeto lo convierto en instancia
        const userInstancia = new User(user);
        stateUser.push(userInstancia);//guardo instancia en array
        }
}
//---FUNCION PARA LISTADO DE USUARIOS---//
let userEditando: User | null = null;
async function cardsUsers(){
    await cargaUsuarios();
    contenedorUsuarios.innerHTML = "";
    stateUser.forEach(user=>{//recorro array de instancias
        const card=document.createElement("article");
        const btnEditarUser=document.createElement("button") as HTMLButtonElement;
        btnEditarUser.type = "button";
        btnEditarUser.textContent = "Editar";
        const btnEliminarUser=document.createElement("button") as HTMLButtonElement;
        btnEliminarUser.type = "button";
        btnEliminarUser.textContent = "Eliminar";
        card.innerHTML = `
            <p>Nombre: ${user.getName()}</p>
            <p>Email: ${user.getEmail()}</p>
            <p>Rol: ${user.getIsAdmin() ? "Admin" : "Usuario"}</p>
        `;
        card.appendChild(btnEditarUser);
        card.appendChild(btnEliminarUser);
        contenedorUsuarios.appendChild(card);
        contenedorUsuarios.classList.remove("hide")
        contenedorProductos.classList.add("hide")
         //conecto funcion para eliminar usuario
        btnEliminarUser.addEventListener("click",()=>{
            eliminarUserConfir(user)
        })
        //conecto funcion para editar
        btnEditarUser.addEventListener("click",() =>{
            editarUsuario(user)
        })
        })
}
panelUsuarios.addEventListener("click",cardsUsers)
//---FUNCION PARA CREAR INSTANCIAS DE LAS CARDS DE PRODUCTOS---//
let stateProduct:any[]=[];
async function cargarProductos (){
    if (stateProduct.length > 0) return;//si hay cards,que no recargue denevo
    const products=await fetchProduct();//traigo JSON
    stateProduct=[];
    for(const product of products){
        const productInstancia=new Product(product);
        stateProduct.push(productInstancia);
    }
}
//---FUNCION PARA LISTADO DE PRODUCTOS---//
async function productsCards() {
    await cargarProductos();
    contenedorProductos.innerHTML="";
    stateProduct.forEach(product=>{
        const card=document.createElement("article");
        const title=document.createElement("h4");
        const price=document.createElement("h5");
        const category=document.createElement("h5");
        const image=document.createElement("img");
        const description=document.createElement("p");
        const btn1=document.createElement("button");
        const btn2=document.createElement("button");
        //agrego contenido
        title.textContent=product.getName();
        price.textContent=product.getPrice();
        category.textContent=product.getCategory();
        image.src=product.getImage();
        description.textContent=product.getDescription();
        btn1.textContent="Editar";
        btn2.textContent="Eliminar";
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
        contenedorProductos.classList.remove("hide")
        contenedorUsuarios.classList.add("hide")
        //funciones para botones
        btn1.addEventListener("click",()=>{
            editarProducto(product);
        })
        btn2.addEventListener("click",()=>{
            eliminarProductConfi(product);
        })
    })
}
panelProductos.addEventListener("click",productsCards);
////---------------------------------------------------EDITAR O ELIMINAR CONTENIDO---------------------------------------------////
//---FUNCIONES PARA CARDS DE USUARIOS MODAL---//
const modalUser=document.getElementById("modal-form-usuarios") as HTMLFormElement;
const modalUsuarios=document.getElementById("modal-usuarios") as HTMLDialogElement;
const nameUserModal=document.getElementById("name-modal-user") as HTMLInputElement;
const emailUserModal=document.getElementById("email-modal-user") as HTMLInputElement;
const rolUserModal=document.getElementById("rol-modal-user") as HTMLInputElement;
const btnCancelarUser=document.getElementById("btn-cancelar-user") as HTMLButtonElement;

function mostrarModalUser(){
    modalUsuarios.showModal()
}
function cerrarModalUser(){
    modalUsuarios.close();
}
function editarUsuario(usuario:User){
    userEditando=usuario;
    mostrarModalUser();
    nameUserModal.value=usuario.getName();
    emailUserModal.value=usuario.getEmail();
    rolUserModal.checked=usuario.getIsAdmin();
}
//---FUNCION PARA EDITAR USUARIOS---//
modalUser.addEventListener("submit",(e)=>{
    e.preventDefault();
     if (!userEditando) return;
    userEditando.setName(nameUserModal.value);
    userEditando.setEmail(emailUserModal.value);
    userEditando.setIsadmin(rolUserModal.value === "admin");
    cerrarModalUser();
    cardsUsers(); 
    requestUserEdit(userEditando);
})
//para cerrar modal
        btnCancelarUser.addEventListener("click",()=>{
            cerrarModalUser();
        })
        overlayModal.addEventListener("click", (event)=>{
            if(event.target===overlayModal){
                modalUsuarios.close();
            }
        })
//-- FUNCION PARA CREAR OBJETO REQUEST AL EDITAR USUARIO---//
function requestUserEdit(usuario:User){
    const request=new Request("users.json",{
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:usuario.getName(),
            email:usuario.getEmail(),
            isAdmin:usuario.getIsAdmin()
        })
    })
    console.log("REQUEST EDIT USER:", request)
}
//---MODAL ELIMINAR- CONFIRMACION---//
const modalEliminar=document.getElementById("modal-eliminar-user") as HTMLDialogElement;
const btnCancelarEliminar=document.getElementById("btn-cancelar-user-eliminar") as HTMLButtonElement;
const btnEliminarconf=document.getElementById("btn-eliminar-user-conf") as HTMLButtonElement;
let userEliminando: User| null = null;
function eliminarUserConfir(usuario:User){
    modalEliminar.showModal();
    userEliminando=usuario;
}
btnEliminarconf.addEventListener("click",()=>{
    if(!userEliminando)return;
    eliminarUsuario(userEliminando);
    userEliminando=null;
})
btnCancelarEliminar.addEventListener("click",()=>{
    modalEliminar.close()
})
function eliminarUsuario(usuario:User){
    stateUser = stateUser.filter(u => u !== usuario);//elimino card
    cardsUsers();
    modalEliminar.close()
    requestUserDelete(usuario);
}
//---FUNCION PARA CREAR OBJETO REQUEST AL ELIMINAR USUARIO---//
function requestUserDelete(usuario:User){
    const request=new Request("users.json",{
        method:"DELETE",
         headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(usuario)
    })
    console.log("REQUEST DELETE USER:", request)
}
//---FUNCIONES PARA CARDS DE PRODUCTOS MODAL---//
const modalProductos= document.getElementById("modal-productos") as HTMLDialogElement;
const formProducts=document.getElementById("modal-form-productos") as HTMLFormElement;
const nameProductModal=document.getElementById("name-modal-product") as HTMLInputElement;
const priceProductModal=document.getElementById("price-modal-product") as HTMLInputElement;
const categoryProductModal=document.getElementById("category-modal-product") as HTMLSelectElement;
const descriptionProductModal=document.getElementById("description-modal-product") as HTMLTextAreaElement;
const cancelarProductModal=document.getElementById("btn-cancelar-product") as HTMLButtonElement;

let productoEditando: Product | null = null;
function editarProducto(product:Product){
    productoEditando=product;
    modalProductos.showModal();
    nameProductModal.value=product.getName();
    priceProductModal.value=String(product.getPrice());
    categoryProductModal.value=product.getCategory();
    descriptionProductModal.value=product.getDescription();
}
//---FUNCION PARA EDITAR USUARIOS---//
modalProductos.addEventListener("submit",(e)=>{
    e.preventDefault();
     if (!productoEditando) return;
    productoEditando.setName(nameProductModal.value);
    productoEditando.setPrice(Number(priceProductModal.value));
    productoEditando.setCategory(categoryProductModal.value as category);
    productoEditando.setDescription(descriptionProductModal.value);
    modalProductos.close();
    productsCards()
    requestProdustEdit(productoEditando);
})
cancelarProductModal.addEventListener("click",()=>{
    modalProductos.close()
})
function requestProdustEdit(producto:Product){
    const request=new Request("products.json",{
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:producto.getName(),
            price:producto.getPrice(),
            category:producto.getCategory(),
            description:producto.getDescription()
        })
    })
    console.log("REQUEST EDIT PRODUCT:", request)
}
//---MODAL ELIMINAR PRODUCTO CONFIRMACION---//
const modalEliminarProducto=document.getElementById("modal-eliminar-product") as HTMLDialogElement;
const btnEliminarProductConf=document.getElementById("btn-eliminar-product-conf") as HTMLButtonElement;
const cancelarEliminarProduct=document.getElementById("btn-cancelar-product-eliminar") as HTMLButtonElement;
let productEliminando:Product|null=null;
function eliminarProductConfi(producto:Product){
    modalEliminarProducto.showModal();
    productEliminando=producto;
}
btnEliminarProductConf.addEventListener("click",()=>{
    if(!productEliminando)return;
    eliminarProducto(productEliminando);
    productEliminando=null;
})
function eliminarProducto(producto:Product){
    stateProduct = stateProduct.filter(u => u !== producto);//elimino card
    productsCards();
    modalEliminarProducto.close()
    requestProductDelete(producto);
}
function requestProductDelete(product:Product){
    const request=new Request("products.json",{
        method:"DELETE",
         headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(product)
    })
    console.log("REQUEST DELETE PRODUCT:", request)
}
cancelarEliminarProduct.addEventListener("click",()=>{
    modalEliminarProducto.close()
})

////-----------------------------------------------------VALIDACION DE DATOS DEL FORMULARIO---------------------------------------////
//Verifico nombre
inputNames.addEventListener("input",()=>{
    const value=inputNames.value;
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