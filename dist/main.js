var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProduct } from "./Services/productService.js";
//funcion que reciba como parametro el array, llamo 4 veces con los distintos arrays creados, creo elementos y al final de todo se agregan a la secion que corresponden con ifs, evalua la categoria a la que pertencen y se agregan 
//separo informacion dependiendo la categoria
const cafeteria = [];
const bakery = [];
const bebidasCalientes = [];
const bebidasFrias = [];
//selecciono ids de las secciones
const setCafeteria = document.getElementById("cafeteria");
const setBebidasCalientes = document.getElementById("bebidas-calientes");
const setBebidasFrias = document.getElementById("bebidas-frias");
const setBakery = document.getElementById("bakery");
//cargo datos del json
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield fetchProduct();
        products.forEach(product => {
            if (product.category === "cafeteria") {
                cafeteria.push(product);
            }
            else if (product.category === "bebidas-calientes") {
                bebidasCalientes.push(product);
            }
            else if (product.category === "bebidas-frias") {
                bebidasFrias.push(product);
            }
            else {
                bakery.push(product);
            }
        });
        //llamo funciones
        createGalleries(cafeteria, setCafeteria);
        createGalleries(bebidasCalientes, setBebidasCalientes);
        createGalleries(bebidasFrias, setBebidasFrias);
        createGalleries(bakery, setBakery);
    });
}
init();
//funcion para crear cards
function createGalleries(products, section) {
    products.forEach(product => {
        const card = document.createElement("article");
        const img = document.createElement("img");
        const containerInfo = document.createElement("div");
        const title = document.createElement("h4");
        const prices = document.createElement("h5");
        const description = document.createElement("p");
        //creo boton
        const btn = document.createElement("button");
        //agrego clases diferentes segun categorias
        const categoryClass = product.category;
        card.classList.add("card", `card--${categoryClass}`);
        containerInfo.classList.add(`info--${categoryClass}`);
        title.classList.add("title", `title--${categoryClass}`);
        prices.classList.add("price", `price--${categoryClass}`);
        img.classList.add("image", `image--${categoryClass}`);
        description.classList.add("description", `description--${categoryClass}`);
        btn.classList.add("btn", `btn--${categoryClass}`);
        //agrego datos
        title.textContent = product.name;
        prices.textContent = `$${product.price}`;
        img.src = product.image;
        description.textContent = product.description;
        btn.textContent = "Agregar al carrito";
        card.appendChild(img);
        containerInfo.appendChild(title);
        containerInfo.appendChild(description);
        containerInfo.appendChild(prices);
        containerInfo.appendChild(btn);
        card.appendChild(containerInfo);
        //parametro de elemtto html que agrega la card a la section
        section.appendChild(card);
    });
}
//# sourceMappingURL=main.js.map