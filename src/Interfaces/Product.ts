import type {category} from "../Types/Category";

export class Product {
    #id:number;
    #name:string;
    #price:number;
    #category:category;
    #image:string;
    #description:string;
     //especifico propiedades
    constructor (id:number,name:string,price:number,category:category,image:string,description:string){
        this.#id=id;
        this.#name=name;
        this.#price=price;
        this.#category=category;
        this.#image=image;
        this.#description=description;
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
    set id(value:number){
        this.#id=value;
    }
    set name(value:string){
        this.#name=value;
    }
    set price(value:number){
        this.#price=value;
    }
    set category(value:category){
        this.#category=value;
    }
    set image(value:string){
        this.#image=value;
    }
    set description(value:string){
        this.#description=value;
    }
}