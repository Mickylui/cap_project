import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";

export class ProductService {
    constructor(private knex: Knex) {}
    async getAllProduct() {
        const allProduct = (
            await this.knex.raw(
                "SELECT image, size, products.id, name, description, unit_price, quantity FROM products JOIN product_images ON products.id = product_images.product_id JOIN product_sizes ON products.id = product_sizes.product_id"
            )
        ).rows;

        console.log("allProduct:", allProduct);
        return allProduct;
    }

    async addProduct() {}
    async deleteProduct(id: number) {
        await this.knex("product").where("id", id).del();
    }
    async updateProduct(id: number, body: any) {
        // const {name, description, unit_price, quantity, image, size } = body
        // await this.knex("products")
        // .where("id", id)
        // .join("image", "product_id", "=", "product_images")
        // .update({
        //     name, description, unit_price, quantity, image, size
        // })
        // .returning("id")
    }
}
