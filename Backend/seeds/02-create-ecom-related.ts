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
        { name: "Skateboard", description: "It doesn't matter if you're old. young, overweight, tall or skinny, skateboarding is a fun sport to master. Hardly anyone learns skateboarding at day one, it takes time, dedication and some guts.Come and get your first skateboard!", unit_price: 400.00, quantity: 200 },
        { name: "Fish board", description: "Fish Boards make excellent commuter boards. The fact that they're lightweight provides comfort and convenience. Also, because the board wheels are more extensive and soft than those on a typical skateboard park, they can handle more challenging terrain, including cracks, stones, and other obstacles.", unit_price: 250.00, quantity: 200 },
        { name: "Long board", description: "longboards are typically designed and optimized for cruising (covering distances at moderate speeds), commuting (as a practical means of personal transport), and downhill (racing). The act of riding on a longboard in general is known as longboarding, which can also include more specialized forms such as longboard dancing, which involves stepping up and down a board and other movements and motions performed on the board while riding, and freestyle, which can encompass trick skating and executing tricks often associated with street skateboards.", unit_price: 800.00, quantity: 200 },
        { name: "Surf skateboard", description: "A Surfskate is a skateboard for surfing on the street! The special front truck allows movements similar to surfing. The turning dynamics of the Surfskate truck allows short and manoeuvrable turns like surfing. Even if you have absolutely nothing to do with surfing: it doesn't matter. The movements are absolutely intuitive and easy to learn.", unit_price: 700.00, quantity: 200 }
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
        { user_id: users[4].id, product_id: products[0].id },
        { user_id: users[6].id, product_id: products[3].id },
        { user_id: users[7].id, product_id: products[2].id }
    ]);
    await knex("product_views").insert([
        { user_id: users[0].id, product_id: products[3].id },
        { user_id: users[0].id, product_id: products[3].id },
        { user_id: users[0].id, product_id: products[1].id },
        { user_id: users[0].id, product_id: products[1].id },
        { user_id: users[1].id, product_id: products[1].id },
        { user_id: users[2].id, product_id: products[1].id },
        { user_id: users[1].id, product_id: products[3].id },
        { user_id: users[2].id, product_id: products[0].id },
        { user_id: users[3].id, product_id: products[0].id},
        { user_id: users[3].id, product_id: products[0].id},
        { user_id: users[4].id, product_id: products[0].id},
        { user_id: users[4].id, product_id: products[0].id},
        { user_id: users[6].id, product_id: products[3].id},
        { user_id: users[7].id, product_id: products[2].id}
    ]);

    
    await knex("shopping_carts").insert([
        { size:8.25, quantity:1, user_id:users[3].id, product_id:products[0].id},
        { size:36, quantity:1, user_id:users[4].id, product_id:products[2].id},
    ]);
    
    await knex("order_history").insert([
        { total_amount:400 , pay_method:"paypal" ,status:"pending",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[3].id, pay_date:'2022-07-10 20:00:00'},
        { total_amount:650 , pay_method:"paypal" ,status:"success",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[3].id, pay_date:'2022-08-10 20:00:00'},
        { total_amount:1500 , pay_method:"paypal" ,status:"cancel",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[7].id, pay_date:'2022-06-15 20:00:00'},
        { total_amount:1500 , pay_method:"paypal" ,status:"pending",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[8].id, pay_date:'2022-08-20 20:00:00'},
        { total_amount:400 , pay_method:"paypal" ,status:"pending",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[9].id, pay_date:'2022-09-20 20:00:00'},
        { total_amount:250 , pay_method:"paypal" ,status:"pending",delivery_address:"YL",email:"jack@1.com",contact:"12345678", user_id:users[10].id, pay_date:'2022-09-20 20:00:00'},
    ]);

    const order_history = (await knex.raw(`SELECT * FROM order_history`)).rows
    await knex("order_details").insert([
        { product_id:products[0].id , order_quantity:1, order_unit_price:400, order_size:8.25,order_history_id:order_history[0].id},
        { product_id:products[1].id, order_quantity:1, order_unit_price:250,order_size:18, order_history_id:order_history[1].id},
        { product_id:products[0].id, order_quantity:1, order_unit_price:400,order_size:8.25, order_history_id:order_history[1].id},
        { product_id:products[2].id , order_quantity:1, order_unit_price:800, order_size:40,order_history_id:order_history[2].id},
        { product_id:products[3].id, order_quantity:1, order_unit_price:700,order_size:33, order_history_id:order_history[2].id},
        { product_id:products[2].id , order_quantity:1, order_unit_price:800, order_size:40,order_history_id:order_history[3].id},
        { product_id:products[3].id, order_quantity:1, order_unit_price:700,order_size:33, order_history_id:order_history[3].id},
        { product_id:products[0].id, order_quantity:1, order_unit_price:400,order_size:7.625, order_history_id:order_history[4].id},
        { product_id:products[1].id, order_quantity:1, order_unit_price:250,order_size:27, order_history_id:order_history[5].id}
    ]);

}
