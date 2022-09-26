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

        // await this.knex.raw(
        //     `SELECT
        //     product_images.image,
        //     products.id,
        //     products.name,
        //     products.description,
        //     products.unit_price
        //     json_agg(DISTINCT product_images.image) image
        //     FROM products
        //     LEFT JOIN product_images.product_id = product.id
        //     GROUP BY products.id
        //     `)

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

    async checkout(userId: number) {
        const trx = await this.knex.transaction();
        try {
            const cartItems = await trx("shopping_carts")
                .innerJoin("products", "shopping_carts.product_id", "products.id")
                .where("user_id", userId)
                .select<
                    { product_id: number; size: string; quantity: number; unit_price: string }[]
                >(
                    "shopping_carts.product_id",
                    "shopping_carts.size",
                    "shopping_carts.quantity",
                    "products.unit_price"
                );
            const userDetail = (await trx("users")
                .where("id", userId)
                .select<{ email: string; default_contact: string }>("email", "default_contact")
                .first())!;
            let totalAmount = 0;
            for (let i = 0; i < cartItems.length; i++) {
                totalAmount += cartItems[i]["quantity"] * Number(cartItems[i]["unit_price"]);
            }

            const [orderHistory] = await trx("order_history").insert({
                total_amount: totalAmount, 
                pay_method: "Visa", 
                pay_date: new Date() , 
                status: "pending", 
                user_id: userId, 
                delivery_address: userDetail.default_contact,
                email: userDetail.email,
                contact: userDetail.default_contact
            })
                .returning("id");
                console.log(orderHistory)

            

            for (let i = 0; i < cartItems.length; i++) {
                const order = await trx("order_details").insert({
                    product_id: cartItems[i].product_id,
                    order_size: cartItems[i].size,
                    order_quantity: cartItems[i].quantity,
                    order_unit_price: cartItems[i].unit_price,
                    order_history_id: orderHistory.id
                }) 
                .returning("id")
                console.log(order)               
            }

            await trx("shopping_carts").where("id", userId).delete();
            
            await trx.commit();
       
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
}
