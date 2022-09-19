import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order_details").del();
    await knex("order_history").del();
    await knex("shopping_carts").del();
    await knex("product_views").del();
    await knex("product_likes").del();
    await knex("product_sizes").del();
    await knex("product_images").del();
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        { name: "Skateboard", description: "Number 1", unit_price: 300.00, quantity: 200 },
        { name: "Fish board", description: "Number 2", unit_price: 300.00, quantity: 200 },
        { name: "Long board", description: "Number 3", unit_price: 400.00, quantity: 200 },
        { name: "Surf skateboard", description: "Number 4", unit_price: 350.00, quantity: 200 }
    ]);

    const products = (await knex.raw(`SELECT * FROM products`)).rows

    await knex("product_images").insert([
        {
            image: "image01.img",
            product_id: products[0].id,
        },
        {
            image: "image02.img",
            product_id: products[0].id,
        },
        {
            image: "image03.img",
            product_id: products[0].id,
        },
        {
            image: "image11.img",
            product_id: products[1].id,
        },
        {
            image: "image12.img",
            product_id: products[1].id,
        },
        {
            image: "image13.img",
            product_id: products[1].id,
        },
        {
            image: "image21.img",
            product_id: products[2].id,
        },
        {
            image: "image22.img",
            product_id: products[2].id,
        },
        {
            image: "image23.img",
            product_id: products[2].id,
        },
        {
            image: "image31.img",
            product_id: products[3].id,
        },
        {
            image: "image32.img",
            product_id: products[3].id,
        },
        {
            image: "image33.img",
            product_id: products[3].id,
        }
    ]);

    await knex("product_sizes").insert([
        { size: 7.625, product_id: products[0].id },
        { size: 8.0, product_id: products[0].id},
        { size: 8.25, product_id: products[0].id},
        { size: 18, product_id: products[1].id},
        { size: 22, product_id: products[1].id },
        { size: 27, product_id: products[1].id },
        { size: 36, product_id: products[2].id },
        { size: 40, product_id: products[2].id },
        { size: 44, product_id: products[2].id },
        { size: 32, product_id: products[3].id },
        { size: 33, product_id: products[3].id },
        { size: 34, product_id: products[3].id}
    ]);

    const users = (await knex.raw(`SELECT * FROM users`)).rows
    await knex("product_likes").insert([
        { user_id: users[3].id, product_id: products[1].id },
        { user_id: users[3].id, product_id: products[0].id },
        { user_id: users[4].id, product_id: products[2].id },
        { user_id: users[4].id, product_id: products[0].id }
    ]);
    await knex("product_views").insert([
        { user_id:users[3].id, product_id:products[0].id},
        { user_id:users[3].id, product_id:products[0].id},
        { user_id:users[4].id, product_id:products[0].id},
        { user_id:users[4].id, product_id:products[0].id},
    ]);

    
    await knex("shopping_carts").insert([
        { size:8.25, quantity:1, user_id:users[3].id, product_id:products[0].id},
        { size:8.25, quantity:1, user_id:users[3].id, product_id:products[0].id},
        { size:36, quantity:1, user_id:users[4].id, product_id:products[2].id},
    ]);
    
    await knex("order_history").insert([
        { total_amount:300 , pay_method:"paypal" ,status:"shipping",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[3].id},
        { total_amount:600 , pay_method:"paypal" ,status:"shipping",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[3].id}
    ]);

    const order_historys = (await knex.raw(`SELECT * FROM order_history`)).rows
    await knex("order_details").insert([
        { product_id:products[0].id , order_quantity:1, order_unit_price:300, order_size:8.25,order_history_id:order_historys[0].id},
        { product_id:products[1].id, order_quantity:1, order_unit_price:300,order_size:18, order_history_id:order_historys[1].id},
        { product_id:products[0].id, order_quantity:1, order_unit_price:300,order_size:8.25, order_history_id:order_historys[1].id}
    ]);

}
