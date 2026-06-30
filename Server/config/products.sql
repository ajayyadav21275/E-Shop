CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price INT,
  stock INT,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  parent_category_id INT REFERENCES categories(id)
);