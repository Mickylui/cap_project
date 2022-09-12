SELECT *
FROM users;
SELECT *
FROM user_info;
SELECT *
FROM admin_info;
SELECT *
FROM accumulation;
DROP TABLE users;
DROP TABLE user_info;
DROP TABLE admin_info;
DROP TABLE accumulation;
CREATE TABLE IF NOT EXISTS users(
    id SERIAL primary key,
    account_name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    is_admin BOOLEAN not null,
    created_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS user_info(
    id SERIAL primary key,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    icon VARCHAR(255),
    slogan TEXT,
    address TEXT,
    contact VARCHAR(255),
    gender VARCHAR(255),
    age_range VARCHAR(255),
    reasons TEXT,
    learning_level VARCHAR(255),
    updated_at TIMESTAMP not null default NOW(),
    last_login_at TIMESTAMP not null default NOW(),
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS admin_info(
    id SERIAL primary key,
    tier INTEGER not null,
    in_charage VARCHAR(255) not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS accumulation(
    id SERIAL primary key,
    accumulation INTEGER not null,
    date TIMESTAMP not null default NOW(),
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
-- create user
INSERT INTO users(
        account_name,
        email,
        password,
        is_admin
    )
VALUES (
        'jack',
        'jack@1.com',
        '1234',
        false
    );
INSERT INTO users(
        account_name,
        email,
        password,
        is_admin
    )
VALUES (
        'mary',
        'mary@1.com',
        '1234',
        false
    );
INSERT INTO user_info(
        first_name,
        last_name,
        icon,
        slogan,
        address,
        contact,
        gender,
        age_range,
        reasons,
        learning_level,
        user_id
    )
VALUES (
        'Y',
        'M',
        'jack.img',
        'I am jack',
        'TW',
        '12345678',
        'M',
        '15-20',
        'Friend',
        '2',
        1
    );
-- create admin
INSERT INTO users(
        account_name,
        email,
        password,
        is_admin
    )
VALUES (
        'admin',
        'admin@1.com',
        '1234',
        true
    );
INSERT INTO admin_info(
        tier,
        in_charage,
        user_id
    )
VALUES (1, 'hi', 3);
-- can update last_login_at
UPDATE users
SET last_login_at = Now()
WHERE name = 'jack';
-- insert accumulation
INSERT INTO accumulation(
        accumulation,
        user_id
    )
VALUES (20,1);
