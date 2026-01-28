import { IproductData } from "../Interfaces/productData";
import type {category} from "../Types/Category";

export class Product {
    #id:number;
    #name:string;
    #price:number;
    #category:category;
    #image:string;
    #description:string;
     //especifico propiedades
    constructor (data: IproductData){
        this.#id=data.id;
        this.#name=data.name;
        this.#price=data.price;
        this.#category=data.category;
        this.#image=data.image;
        this.#description=data.description;
    }

    //Getters
    getId():number{
        return this.#id;
    }
    getName():string{
        return this.#name;
    }
    getPrice():number{
        return this.#price;
    }
    getCategory():category{
        return this.#category;
    }
    getImage():string{
        return this.#image;
    }
    getDescription():string{
        return this.#description;
    }

    //Setters
    setId(value:number){
        this.#id=value;
    }
    setName(value:string){
        this.#name=value;
    }
    setPrice(value:number){
        this.#price=value;
    }
    setCategory(value:category){
        this.#category=value;
    }
    setImage(value:string){
        this.#image=value;
    }
    setDescription(value:string){
        this.#description=value;
    }
}