import type{Product} from "../Interfaces/Product.js";

export async function fetchProduct():Promise<Product[]> {
    try{
        const response=await fetch("./data/products.json");

        if(!response.ok){
            throw new Error("Error");
        }
        const data:Product[]=await response.json();
        return data;
    }catch(error){
        console.log(error)
        return[];
    }
}