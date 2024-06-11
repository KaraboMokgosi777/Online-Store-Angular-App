import { Iproduct } from "./iproduct";   

type allowNull = number | string | null;

export class Product implements Iproduct {  
    ProductId!: number;           
    Price!: number;
    Image!: string; 
    Description!: string;
    ProductTypeId!: number;
    BrandId!: number;
    DateCreated!: Date;
}