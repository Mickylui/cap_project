import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class ProductService {
    constructor(private knex: Knex) {}
    async getAllProduct() {
        const allProduct = 
        await this.knex("products")
        .select(
            "products.id",
            "products.name",
            "products.description",
            "products.unit_price",
        )

        // (await this.knex.raw('SELECT image, size, products.id, name, description, unit_price, quantity FROM products JOIN product_images ON products.id = product_images.product_id JOIN product_sizes ON products.id = product_sizes.product_id')).rows

            
        console.log("allProduct:", allProduct);
        return allProduct;
    }

    async addProduct() {}

    // async deleteProduct(id:number) {
    //     await this.knex("product")
    //     .where("id", id)
    //     .del()
    // }
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

    async productDetailByProductId(productId: string) {
        try {
            const allProduct = 
            (await this.knex.raw (`
        SELECT products.id,
            products.name,
            products.description,
            products.unit_price,
            products.quantity,
            json_agg(DISTINCT product_images.image) image,
            json_agg(DISTINCT product_sizes.size) size,
            COUNT(product_likes.id)
        FROM products
            LEFT JOIN product_images ON product_images.product_id = products.id
            LEFT JOIN product_sizes ON product_sizes.product_id = products.id
            LEFT JOIN product_likes ON product_likes.product_id = products.id
        WHERE products.id = '${productId}'
        GROUP BY products.id
            `)
            ).rows[0]
        
            console.log(allProduct)
        return allProduct
        
        }
        catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
}
