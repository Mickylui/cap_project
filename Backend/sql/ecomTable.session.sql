SELECT *
FROM products;
SELECT *
FROM product_images;
SELECT *
FROM product_sizes;
SELECT *
FROM product_likes;
SELECT *
FROM product_views;
SELECT *
FROM shopping_carts;
SELECT *
FROM order_histories;
SELECT *
FROM order_details;
DROP TABLE products;
DROP TABLE product_images;
DROP TABLE product_sizes;
DROP TABLE product_likes;
DROP TABLE product_views;
DROP TABLE shopping_carts;
DROP TABLE order_histories;
DROP TABLE order_details;
CREATE TABLE IF NOT EXISTS products(
    id SERIAL primary key,
    name VARCHAR(255) not null,
    description TEXT not null,
    unit_price INTEGER not null,
    quantity INTEGER not null,
    created_at TIMESTAMP not null default NOW(),
    updated_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS product_images(
    id SERIAL primary key,
    image TEXT not null,
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE IF NOT EXISTS product_sizes(
    id SERIAL primary key,
    size INTEGER not null,
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE IF NOT EXISTS product_likes(
    id SERIAL primary key,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id),
    like_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS product_views(
    id SERIAL primary key,
    view_begin TIMESTAMP not null,
    view_end TIMESTAMP not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS shopping_carts(
    id SERIAL primary key,
    quantity INTEGER not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id),
    created_at TIMESTAMP not null default NOW(),
    updated_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS order_histories(
    id SERIAL primary key,
    total_amount INTEGER not null,
    pay_method VARCHAR(255) not null,
    status VARCHAR(255) not null,
    delivery_address VARCHAR(255) not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    shopping_cart_id INTEGER not null,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_carts(id),
    created_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS order_details(
    id SERIAL primary key,
    shopping_cart_id INTEGER not null,
    FOREIGN KEY(shopping_cart_id) REFERENCES shopping_carts(id),
    order_history_id INTEGER not null,
    FOREIGN KEY(order_history_id) REFERENCES order_histories(id)
);