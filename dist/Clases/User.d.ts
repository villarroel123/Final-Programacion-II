import { IuserData } from "../Interfaces/userData";
export declare class User {
    #private;
    constructor(data: IuserData);
    getId(): number;
    getName(): string;
    getPassword(): string;
    getEmail(): string;
    getIsSubscribed(): boolean;
    getIsAdmin(): boolean;
    getLikedPostIds(): number[];
    set id(value: number);
    set name(value: string);
    set password(value: string);
    set email(value: string);
    set issubscribed(value: boolean);
    set isadmin(value: boolean);
    set likedPostIds(value: number[]);
}
//# sourceMappingURL=User.d.ts.map