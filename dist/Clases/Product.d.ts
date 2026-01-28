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
    setId(value: number): void;
    setName(value: string): void;
    setPrice(value: number): void;
    setCategory(value: category): void;
    setImage(value: string): void;
    setDescription(value: string): void;
}
//# sourceMappingURL=Product.d.ts.map