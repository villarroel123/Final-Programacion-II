import { IproductData } from "../Interfaces/productData";
import type { category } from "../Types/Category";
export declare class Product {
    #private;
    constructor(data: IproductData);
    getId(): number;
    getName(): string;
    getPrice(): number;
    getCategory(): category;
    getImage(): string;
    getDescription(): string;
    set id(value: number);
    set name(value: string);
    set price(value: number);
    set category(value: category);
    set image(value: string);
    set description(value: string);
}
//# sourceMappingURL=Product.d.ts.map