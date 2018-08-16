DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);

SELECt * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Salad Spring Mix", "Produce", 25.95, 100),
    ("Cucumbers", "Produce", 6.95, 20),
    ("Dyson Vacuum", "Electronics", 199.99, 4),
    ("70 Samsung OLED Smart TV", "Electronics", 1999.99, 2),
    ("Beef Jerky", "Snacks", 5.95, 20),
    ("Veggie Chips", "Snacks", 4.95, 50),
    ("Solo: A Star Wars Story (Blu-Ray)", "Movies", 29.96, 20),
    ("The Incredibles 2 (Blu-Ray)", "Movies", 24.99, 20);