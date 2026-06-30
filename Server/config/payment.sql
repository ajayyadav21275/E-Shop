CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    amount INT NOT NULL,
    payment_method VARCHAR(10) NOT NULL,
    paymnet_status VARCHAR(10) DEFAULT 'pending',
    transaction_id VARCHAR(50),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);