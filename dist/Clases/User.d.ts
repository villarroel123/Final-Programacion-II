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
    setId(value: number): void;
    setName(value: string): void;
    setPassword(value: string): void;
    setEmail(value: string): void;
    setIssubscribed(value: boolean): void;
    setIsadmin(value: boolean): void;
    setLikedPostIds(value: number[]): void;
}
//# sourceMappingURL=User.d.ts.map