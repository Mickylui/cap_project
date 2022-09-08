CREATE TABLE IF NOT EXISTS users(
    id SERIAL primary key,
    name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    icon VARCHAR(255),
    district TEXT not null,
    phone_number INTEGER not null,
    slogan TEXT,
    age_range VARCHAR(255),
    gender VARCHAR(255),
    reason TEXT,
    learning_level VARCHAR(255) not null,
    created_at TIMESTAMP not null default NOW(),
    updated_at TIMESTAMP default NOW(),
    last_login_at TIMESTAMP default NOW(),
    accumulation INTEGER not null,
    is_admin BOOLEAN not null
);

SELECT * FROM users;
DROP TABLE users;
INSERT INTO users(
        name,
        email,
        icon,
        district,
        phone_number,
        slogan,
        age_range,
        gender,
        reason,
        learning_level,
        accumulation,
        is_admin
    )
VALUES   (
        'jack',
        'jack@1.com',
        'eee.img',
        'TW',
        1234567,
        'Hi',
        'below 12',
        'F',
        'wanna play with friend',
        'new',
        100,
        false
    );

UPDATE users SET slogan = 'bye';


CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
after UPDATE of name,
    email,
    icon,
    district,
    phone_number,
    slogan on users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();