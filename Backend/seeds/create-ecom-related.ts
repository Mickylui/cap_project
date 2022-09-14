import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("order_details").del();
    // await knex("order_histories").del();
    // await knex("shopping_carts").del();
    // await knex("product_views").del();
    // await knex("product_likes").del();
    // await knex("product_sizes").del();
    // await knex("product_images").del();
    // await knex("products").del();

    // // Inserts seed entries
    // await knex("products").insert([
    //     { name: "S1", description: "Number 1", unit_price: 190, quantity: 20 },
    //     { name: "S2", description: "Number 2", unit_price: 190, quantity: 20 },
    //     { name: "S3", description: "Number 3", unit_price: 190, quantity: 20 },
    // ]);

    // await knex("product_images").insert([
    //     {
    //         image: "image1.img",
    //         product_id: 1,
    //     },
    //     {
    //         image: "image1-1.img",
    //         product_id: 1,
    //     },
    //     {
    //         image: "image2.img",
    //         product_id: 2,
    //     },
    // ]);

    // await knex("product_sizes").insert([
    //     { size: 7.5, product_id: 1 },
    //     { size: 7.8, product_id: 1 }
    // ]);
    // await knex("product_likes").insert([
    //     { user_id: 1, product_id: 1 },
    //     { user_id: 1, product_id: 2 }
    // ]);
    // await knex("product_views").insert([
    //     { view_begin: , view_end: ,user_id:1, product_id:1},
    //     { view_begin: , view_end: ,user_id:1, product_id:1}
    // ]);
    // await knex("shopping_carts").insert([
    //     { quantity:2 , user_id:1 ,product_id:1},
    //     { quantity:1 , user_id:1 ,product_id:2},
    // ]);
    // await knex("order_histories").insert([
    //     { total_amount:3 , pay_method:"paypal" ,status:"shipping",delivery_address:"TW", user_id:1},
    // ]);
    
    // await knex("order_details").insert([
    //     { shopping_cart_id:1 , order_history_id:1},
    //     { shopping_cart_id:2 , order_history_id:1}
    // ]);

}
