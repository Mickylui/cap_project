import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";

export class ProductService {
    constructor(private knex: Knex) {}
    async getAllProduct() {
        const allProduct = await this.knex("products")
            .select(
                "id",
                // "products.image",
                "name",
                "description",
                // "size",
                "unit_price",
                "quantity",
            )
            
        console.log("allProduct:", allProduct);
        return allProduct;
    }
    
    async addProduct() {}
    async deleteProduct() {}
    async updateProduct() {}
}
