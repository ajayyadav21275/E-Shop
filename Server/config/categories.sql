CREATE TABLE categories (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    slug VARCHAR(100) UNIQUE,

    image TEXT,

    description TEXT,

    status BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);