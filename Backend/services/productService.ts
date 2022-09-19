import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";

export class ProductService {
    constructor(private knex: Knex) {}
    async getAllProduct() {
        const allProduct = await this.knex("products")
            .select(
                "products.id",
                // "products.image",
                "products.name",
                "products.description",
                "products.unit_price",
            )
            
        console.log("allProduct:", allProduct);
        return allProduct;
    }
    
    async addProduct() {}
    async deleteProduct() {}
    async updateProduct() {}
}
