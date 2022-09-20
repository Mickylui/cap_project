SELECT *
FROM posts;
SELECT *
FROM tags;
SELECT *
FROM post_tags;
SELECT *
FROM post_images;
SELECT *
FROM post_views;
SELECT *
FROM post_likes;
SELECT *
FROM complaints;
DROP TABLE posts;
DROP TABLE tags;
DROP TABLE post_tags;
DROP TABLE post_images;
DROP TABLE post_views;
DROP TABLE post_likes;
DROP TABLE complaints;
CREATE TABLE IF NOT EXISTS posts(
    id SERIAL primary key,
    title VARCHAR(255) not null,
    event_date VARCHAR(255),
    event_time VARCHAR(255),
    event_location VARCHAR(255),
    description TEXT,
    contact VARCHAR(255),
    is_complain boolean not null,
    is_ordinary boolean not null,
    is_third_party boolean not null,
    is_event boolean not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    created_at TIMESTAMP not null default NOW(),
    updated_at TIMESTAMP not null default NOW()
);
CREATE TABLE IF NOT EXISTS tags(
    id SERIAL primary key,
    tag VARCHAR(255) not null unique
);
CREATE TABLE IF NOT EXISTS post_tags(
    id SERIAL primary key,
    post_id INTEGER not null,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    tag_id INTEGER not null,
    FOREIGN KEY(tag_id) REFERENCES tags(id)
);
CREATE TABLE IF NOT EXISTS post_images(
    id SERIAL primary key,
    image TEXT not null,
    product_id INTEGER not null,
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE IF NOT EXISTS post_views(
    id SERIAL primary key,
    view_begin TIMESTAMP not null,
    view_end TIMESTAMP not null,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    post_id INTEGER not null,
    FOREIGN KEY(post_id) REFERENCES posts(id)
);
CREATE TABLE IF NOT EXISTS post_likes(
    id SERIAL primary key,
    user_id INTEGER not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    post_id INTEGER not null,
    FOREIGN KEY(post_id) REFERENCES posts(id)
);
CREATE TABLE IF NOT EXISTS complaints(
    id SERIAL primary key,
    reason VARCHAR(255) not null,
    description TEXT,
    complainant_id INTEGER not null,
    FOREIGN KEY(complainant_id) REFERENCES users(id),
    complainee_id INTEGER,
    FOREIGN KEY(complainee_id) REFERENCES users(id),
    post_id INTEGER,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    complained_at TIMESTAMP not null default NOW(),
    solved_at TIMESTAMP
);
SELECT posts.id,
    posts.title,
    posts.event_date,
    posts.event_time,
    posts.event_location,
    posts.description,
    posts.contact,
    posts.created_at,
    posts.updated_at,
    posts.is_ordinary,
    posts.is_event,
    posts.display_push,
    users.account_name,
    json_agg(DISTINCT post_images.image) image,
    json_agg(DISTINCT tags.tag) tag
FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN post_images ON post_images.post_id = posts.id
    LEFT JOIN post_tags ON post_tags.post_id = posts.id
    LEFT JOIN tags ON tags.id = post_tags.tag_id
GROUP BY (posts.id, users.account_name)
ORDER BY posts.display_push DESC;
SELECT posts.id,
    posts.title,
    posts.event_date,
    posts.event_time,
    posts.event_location,
    posts.description,
    posts.contact,
    posts.created_at,
    posts.updated_at,
    posts.is_ordinary,
    posts.is_event,
    posts.display_push,
    users.account_name,
    json_agg(DISTINCT post_images.image) image,
    json_agg(DISTINCT tags.tag) tag,
    COUNT(post_likes.id)
FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN post_images ON post_images.post_id = posts.id
    LEFT JOIN post_tags ON post_tags.post_id = posts.id
    LEFT JOIN tags ON tags.id = post_tags.tag_id
    LEFT JOIN post_likes ON post_likes.post_id = posts.id
GROUP BY (posts.id, users.account_name)
ORDER BY posts.display_push DESC;
WITH tmp AS (
    SELECT *
    FROM tags
    WHERE tags.tag SIMILAR TO 'b'
)
SELECT posts.id,
    posts.title,
    posts.event_date,
    posts.event_time,
    posts.event_location,
    posts.description,
    posts.contact,
    posts.created_at,
    posts.updated_at,
    posts.is_ordinary,
    posts.is_event,
    posts.display_push,
    users.account_name,
    json_agg(DISTINCT post_images.image) image,
    json_agg(DISTINCT tmp.tag) tag,
    COUNT(post_likes.id)
FROM posts
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN post_images ON post_images.post_id = posts.id
    LEFT JOIN post_tags ON post_tags.post_id = posts.id
    RIGHT JOIN tmp ON tmp.id = post_tags.tag_id
    LEFT JOIN post_likes ON post_likes.post_id = posts.id
GROUP BY (posts.id, users.account_name)
ORDER BY posts.display_push DESC;

-- wanna get with specific posts.user_id
WITH tmp AS (
    SELECT *
    FROM tags
    WHERE tags.tag SIMILAR TO 'q'
)
SELECT posts.id,
    posts.title,
    posts.event_date,
    posts.event_time,
    posts.event_location,
    posts.description,
    posts.contact,
    posts.created_at,
    posts.updated_at,
    posts.is_ordinary,
    posts.is_event,
    posts.display_push,
    users.account_name,
    json_agg(DISTINCT post_images.image) image,
    json_agg(DISTINCT tmp.tag) tag,
    COUNT(post_likes.id)
FROM posts
HAVING post.user_id = '28'
    LEFT JOIN users ON users.id = posts.user_id
    LEFT JOIN post_images ON post_images.post_id = posts.id
    LEFT JOIN post_tags ON post_tags.post_id = posts.id
    RIGHT JOIN tmp ON tmp.id = post_tags.tag_id
    LEFT JOIN post_likes ON post_likes.post_id = posts.id
GROUP BY (posts.id, users.account_name)
ORDER BY posts.display_push DESC;