CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT,
  total INT,
  address_Id INT,
  status VARCHAR(20) DEFAULT 'PENDING'
);