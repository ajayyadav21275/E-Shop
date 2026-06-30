CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    Users_id INTEGER,
    product_id INTEGER,
    quantity INTEGER ,
    title TEXT,
    price INTEGER,
    FOREIGN KEY(user_Id) REFERENCES users(id),
    FOREIGN KEY(product_Id) REFERENCES product(id)
);
