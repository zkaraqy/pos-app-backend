CREATE TABLE `user`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'cashier') NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
ALTER TABLE
    `user` ADD UNIQUE `user_email_unique`(`email`);
CREATE TABLE `product`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(8, 2) NULL,
    `stock` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
CREATE TABLE `category`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
CREATE TABLE `product_category`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_product` INT NOT NULL,
    `id_category` INT NOT NULL
);
CREATE TABLE `image`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL,
    `image_link` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
CREATE TABLE `linked_image`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_product` INT NULL,
    `id_product_varian` INT NULL,
    `id_image` INT NOT NULL
);
CREATE TABLE `product_varian`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_product` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `stock` INT NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
CREATE TABLE `transactions`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_cashier` INT NOT NULL,
    `ref` VARCHAR(255) NOT NULL,
    `type` ENUM('makan_ditempat', 'bawa_pulang') NOT NULL,
    `table_number` INT NULL,
    `customer_name` VARCHAR(255) NULL,
    `customer_email` VARCHAR(255) NULL,
    `payment_method` ENUM('qris', 'cash') NOT NULL,
    `status` ENUM(
        'waiting_payment',
        'canceled',
        'completed'
    ) NOT NULL DEFAULT 'waiting_payment',
    `created_at` VARCHAR(255) NOT NULL,
    `updated_at` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `transactions` ADD UNIQUE `transactions_ref_unique`(`ref`);
CREATE TABLE `transaction_details`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_transaction` INT NOT NULL,
    `id_product` INT NULL,
    `id_product_varian` INT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `quantity` INT NOT NULL
);
ALTER TABLE
    `transaction_details` ADD CONSTRAINT `transaction_details_id_product_varian_foreign` FOREIGN KEY(`id_product_varian`) REFERENCES `product_varian`(`id`);
ALTER TABLE
    `linked_image` ADD CONSTRAINT `linked_image_id_image_foreign` FOREIGN KEY(`id_image`) REFERENCES `image`(`id`);
ALTER TABLE
    `transaction_details` ADD CONSTRAINT `transaction_details_id_transaction_foreign` FOREIGN KEY(`id_transaction`) REFERENCES `transactions`(`id`);
ALTER TABLE
    `product_category` ADD CONSTRAINT `product_category_id_category_foreign` FOREIGN KEY(`id_category`) REFERENCES `category`(`id`);
ALTER TABLE
    `linked_image` ADD CONSTRAINT `linked_image_id_product_varian_foreign` FOREIGN KEY(`id_product_varian`) REFERENCES `product_varian`(`id`);
ALTER TABLE
    `product_category` ADD CONSTRAINT `product_category_id_product_foreign` FOREIGN KEY(`id_product`) REFERENCES `product`(`id`);
ALTER TABLE
    `transaction_details` ADD CONSTRAINT `transaction_details_id_product_foreign` FOREIGN KEY(`id_product`) REFERENCES `product`(`id`);
ALTER TABLE
    `linked_image` ADD CONSTRAINT `linked_image_id_product_foreign` FOREIGN KEY(`id_product`) REFERENCES `product`(`id`);
ALTER TABLE
    `transactions` ADD CONSTRAINT `transactions_id_cashier_foreign` FOREIGN KEY(`id_cashier`) REFERENCES `user`(`id`);
ALTER TABLE
    `product_varian` ADD CONSTRAINT `product_varian_id_product_foreign` FOREIGN KEY(`id_product`) REFERENCES `product`(`id`);