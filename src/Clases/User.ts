import { IuserData } from "../Interfaces/userData";

export class User{
    #id: number;
    #name: string;
    #password: string;
    #email: string;
    #isSubscribed: boolean;
    #isAdmin: boolean;
    #likedPostIDs: number[];

    constructor(data:IuserData){
        this.#id=data.id;
        this.#name=data.name;
        this.#password=data.password;
        this.#email=data.email;
        this.#isSubscribed=data.isSubscribed;
        this.#isAdmin=data.isAdmin;
        this.#likedPostIDs=data.likedPostIDs;
    }

    //Getters
    getId():number{
        return this.#id;
    }
    getName():string{
        return this.#name;
    }
    getPassword():string{
        return this.#password;
    }
    getEmail():string{
        return this.#email;
    }
    getIsSubscribed():boolean{
        return this.#isSubscribed;
    }
    getIsAdmin():boolean{
        return this.#isAdmin;
    }
    getLikedPostIds():number[]{
        return this.#likedPostIDs;
    }

    //Setters
    set id(value:number){
        this.#id=value;
    }
    set name(value:string){
        this.#name=value;
    }
    set password(value:string){
        this.#password=value;
    }
    set email(value:string){
        this.#email=value;
    }
    set issubscribed(value:boolean){
        this.#isSubscribed=value;
    }
    set isadmin(value:boolean){
        this.#isAdmin=value;
    }
    set likedPostIds(value:number[]){
        this.#likedPostIDs=value;
    }

}