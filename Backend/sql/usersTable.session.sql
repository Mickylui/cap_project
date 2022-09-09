SELECT *
FROM users;
DROP TABLE users;
CREATE TABLE IF NOT EXISTS users(
    id SERIAL primary key,
    name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    is_admin BOOLEAN not null,
    created_at TIMESTAMP not null default NOW(),
    updated_at TIMESTAMP not null default NOW(),
    last_login_at TIMESTAMP not null default NOW()
);
-- create user
INSERT INTO users(
        name,
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
        name,
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
-- create admin
INSERT INTO users(
        name,
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
-- can update last_login_at
UPDATE users
SET last_login_at = Now()
WHERE name = 'jack';