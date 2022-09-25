import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class ProductService {
    constructor(private knex: Knex) {}
    async getAllProduct() {
        const allProduct = await this.knex("products").select(
            "products.id",
            "products.name",
            "products.description",
            "products.unit_price"
        );

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
            const allProduct = (
                await this.knex.raw(
                    `
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
        WHERE products.id = ?
        GROUP BY products.id
            `,
                    [productId]
                )
            ).rows[0];

            console.log(allProduct);
            return allProduct;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }

    async getAllCartItems(userId: number) {
        const cartItems = await this.knex.raw(
            `
        SELECT 
            shopping_carts.id,
            shopping_carts.size,
            shopping_carts.quantity,
            products.name,
            products.id AS product_id,
            products.unit_price
        FROM shopping_carts
        INNER JOIN products ON products.id = shopping_carts.product_id 
        WHERE shopping_carts.user_id = ?`,
            [userId]
        );
        return cartItems.rows;
    }

    async addToCart(user_id: number, product_id: number, size: number, quantity: number) {
        const trx = await this.knex.transaction();
        let qty = quantity;
        let cartId: number;
        try {
            const cartItem = await trx("shopping_carts")
                .select("id", "quantity", "size")
                .where("user_id", user_id)
                .andWhere("product_id", product_id)
                .andWhere("size", size)
                .first();

            if (cartItem) {
                cartId = cartItem.id;
                qty = cartItem.quantity + quantity;
                await trx("shopping_carts")
                    .update({ quantity: qty })
                    .where("user_id", user_id)
                    .andWhere("product_id", product_id)
                    .andWhere("size", size);
            } else {
                const [cart] = await trx("shopping_carts")
                    .insert({ user_id, product_id, quantity, size })
                    .returning("id");
                cartId = cart.id;
            }
            await trx.commit();
            return { quantity: qty, cartId };
        } catch (err) {
            await trx.rollback();
            throw err;
        }
    }

    async removeItem(id: number) {
        console.log(id);
        const deletedItem = await this.knex("shopping_carts").where("id", id).delete();
        return deletedItem;
    }

    async checkout(userId: number){
        const clearCart = await this.knex.raw(
            `
        DELETE *
        FROM shopping_carts,
        WHERE shopping_carts.user_id = ?`,
            [userId]
        );
        return clearCart;
    }
}


