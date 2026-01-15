import { IuserData } from "../Interfaces/userData";

export async function fetchUsers():Promise<IuserData[]> {
    try{
        const response=await fetch("./data/products.json");

        if(!response.ok){
            throw new Error("Error");
        }
        //uso la intez de UserData para el fetch
        const data:IuserData[]=await response.json();
        return data;
    }catch(error){
        console.log(error)
        return[];
    }
}