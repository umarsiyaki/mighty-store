
CREATE DATABASE oladayo_enterprises;

USE oladayo_enterprises;

CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'cashier', 'user') NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE Product_Categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE Products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES Product_Categories(id)
);

CREATE TABLE Orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_date DATE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid', 'cancelled') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Order_Items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(id)
);

CREATE TABLE Inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('open', 'closed') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Product_Reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE Order_Status (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  status ENUM('pending', 'paid', 'cancelled') NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(id)
);

CREATE TABLE Dashboard (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_count INT NOT NULL,
  revenue DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Reporting (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  revenue DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Analytics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  revenue DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);


--adding coke product 
INSERT INTO Products (
  id,
  name,
  vendor,
  image,
  id_number,
  quantity,
  rating,
  offer_receipt,
  notify_admin,
  cart_button
) VALUES (
  NULL,
  'Coke',
  'Coca-Cola',
  'coke.jpeg',
  'coc101',
  200,
  4.4,
  TRUE,
  TRUE,
  TRUE
);

INSERT INTO Product_Variants (
  product_id,
  size,
  type
) VALUES (
  LAST_INSERT_ID(),
  '45cl',
  'plastic'
),
(
  LAST_INSERT_ID(),
  '35cl',
  'glass bottle'
),
(
  LAST_INSERT_ID(),
  '50cl',
  'can'
);

CREATE TABLE Products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  vendor VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  id_number VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  rating DECIMAL(10, 2) NOT NULL,
  offer_receipt BOOLEAN NOT NULL,
  notify_admin BOOLEAN NOT NULL,
  cart_button BOOLEAN NOT NULL
);

CREATE TABLE Product_Variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  size VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

--models/User.sql_

CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'cashier', 'user') NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL
);


--UserControllersql_

SELECT * FROM Users;
INSERT INTO Users (username, password, role, name, email, phone, address) VALUES ('john', 'password', 'user', 'John Doe', 'john@example.com', '1234567890', '123 Main St');
UPDATE Users SET username = 'jane' WHERE id = 1;
DELETE FROM Users WHERE id = 1;


--UserRoutesql_

CREATE VIEW UsersView AS SELECT * FROM Users;
CREATE PROCEDURE getUsers() SELECT * FROM Users;
CREATE PROCEDURE getUser(IN id INT) SELECT * FROM Users WHERE id = id;
CREATE PROCEDURE createUser(IN username VARCHAR(255), IN password VARCHAR(255), IN role ENUM('admin', 'cashier', 'user'), IN name VARCHAR(255), IN email VARCHAR(255), IN phone VARCHAR(20), IN address TEXT) INSERT INTO Users (username, password, role, name, email, phone, address) VALUES (username, password, role, name, email, phone, address);
CREATE PROCEDURE updateUser(IN id INT, IN username VARCHAR(255), IN password VARCHAR(255), IN role ENUM('admin', 'cashier', 'user'), IN name VARCHAR(255), IN email VARCHAR(255), IN phone VARCHAR(20), IN address TEXT) UPDATE Users SET username = username, password = password, role = role, name = name, email = email, phone = phone, address = address WHERE id = id;
CREATE PROCEDURE deleteUser(IN id INT) DELETE FROM Users WHERE id = id;

USE oladayo_enterprises;
SOURCE models/User.sql;
SOURCE controllers/UserController.sql;
SOURCE routes/UserRoute.sql;
USE oladayo_enterprises;
SOURCE app.sql;


--creat admin.
INSERT INTO Admins (
  first_name,
  middle_name,
  last_name,
  phone_number,
  email,
  address,
  username,
  password
) VALUES (
  'Imran',
  'Oladayo',
  'Muib',
  '07010033055, 080356885607',
  'muibiimranoladayo@gmail.com',
  'magiro',
  'oladayo',
  AES_ENCRYPT('Admin100?', 'secret_key')
);

--_fetch or interact with them_

SELECT * FROM Users;

INSERT INTO Users (username, password, role, name, email, phone, address) VALUECanS ('john', 'password', 'user', 'John Doe', 'john@example.com', '1234567890', '123 Main St');



-- Create tables
SOURCE models/User.sql;
SOURCE models/Product_Category.sql;
SOURCE models/Products.sql;
SOURCE models/Orders.sql;
SOURCE models/Order_Items.sql;
SOURCE models/Payments.sql;
SOURCE models/Inventory.sql;
SOURCE models/Tickets.sql;
SOURCE models/Product_Reviews.sql;
SOURCE models/Order_Status.sql;

-- Create views
SOURCE routes/UserView.sql;
SOURCE routes/ProductView.sql;
SOURCE routes/OrderView.sql;

-- Create procedures
SOURCE controllers/UserController.sql;
SOURCE controllers/ProductController.sql;
SOURCE controllers/OrderController.sql;

-- Create triggers
SOURCE triggers/UserTrigger.sql;
SOURCE triggers/ProductTrigger.sql;
SOURCE triggers/OrderTrigger.sql;


INSERT INTO Products (
  id,
  name,
  vendor,
  image,
  id_number,
  quantity,
  rating,
  offer_receipt,
  notify_admin,
  cart_button
) VALUES (
  NULL,
  'Coke',
  'Coca-Cola',
  'coke.jpeg',
  'coc101',
  200,
  4.4,
  TRUE,
  TRUE,
  TRUE
);

INSERT INTO Product_Variants (
  product_id,
  size,
  type
) VALUES (
  LAST_INSERT_ID(),
  '45cl',
  'plastic'
),
(
  LAST_INSERT_ID(),
  '35cl',
  'glass bottle'
),
(
  LAST_INSERT_ID(),
  '50cl',
  'can'
);

CREATE TABLE Products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  vendor VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  id_number VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  rating DECIMAL(10, 2) NOT NULL,
  offer_receipt BOOLEAN NOT NULL,
  notify_admin BOOLEAN NOT NULL,
  cart_button BOOLEAN NOT NULL
);

CREATE TABLE Product_Variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  size VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL, 
  FOREIGN KEY (product_id) REFERENCES Products(id)
);
 
 
  --product Fanta
INSERT INTO Products (
  id,
  name,
  vendor,
  image,
  id_number,
  quantity,
  rating,
  allow_tracking,
  tracking_number,
  offer_receipt,
  notify_admin,
  cart_button
) VALUES (
  NULL,
  'Fanta',
  'Coca-Cola',
  'fanta.jpeg',
  'coc101',
  200,
  4.4,
  TRUE,
  3424,
  TRUE,
  TRUE,
  TRUE
);

INSERT INTO Product_Variants (
  product_id,
  size,
  type
) VALUES (
  LAST_INSERT_ID(),
  '45cl',
  'plastic'
),
(
  LAST_INSERT_ID(),
  '35cl',
  'glass bottle'
),
(
  LAST_INSERT_ID(),
  '50cl',
  'can'
);

INSERT INTO Vendors (
  id,
  name
) VALUES
(1, 'Big'),
(2, 'Bigi'),
(3, 'Coca-Cola'),
(4, 'Viju'),
(5, 'Maltina'),
(6, 'Climax'),
(7, 'Slim'),
(8, 'Smoov'),
(9, 'Lucozade'),
(10, 'Pepsi'),
(11, 'Holandia');

INSERT INTO Product_Categories (
  product_id,
  vendor_id
) VALUES
(
  1, 3
),
(
  2, 3
);


CREATE TABLE Vendors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Product_Categories (
  product_id INT NOT NULL,
  vendor_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products(id),
  FOREIGN KEY (vendor_id) REFERENCES Vendors(id)
);

