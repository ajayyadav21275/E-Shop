CREATE TABLE Address (
    id Serial PRIMARY key,
    user_Id INT NOT NULL,
    Full Name VARCHAR(255) NOT NULL,
    phone INTEGER NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pin_code INTEGER NOT NULL,
    country VARCHAR(100) NOT NULL,
    

)