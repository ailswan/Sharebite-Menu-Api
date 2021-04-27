CREATE TABLE `section`(
    `section_id` INT UNSIGNED NOT NULL,
    `section_name` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    PRIMARY KEY (`section_id`)
);

CREATE TABLE `items`(
    `item_id` INT UNSIGNED NOT NULL,
    `item_name` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `price` TEXT,
    `section_id` INT,
    PRIMARY KEY (`item_id`)
);

CREATE TABLE `modifiers`(
    `modifiers_id` INT UNSIGNED NOT NULL,
    `description` LONGTEXT NOT NULL,
    PRIMARY KEY (`modifiers_id`)
);

CREATE TABLE `junction`(
    `junction_id` INT UNSIGNED NOT NULL,
    `modifiers_id` INT,
    `item_id` INT,
    PRIMARY KEY (`junction_id`)
);


INSERT INTO section (section_id, section_name, description)
VALUES ("1", "Lunch Specials", "This is description of Lunch Specials.")


INSERT INTO items (item_id, item_name, description, price, section_id)
VALUES ("1", "Soup Lunch", "This is description of Soup Lunch.", "8.5", "1")

 
INSERT INTO modifiers (modifiers_id, description)
VALUES ("1", "Extra Spicy")
INSERT INTO modifiers (modifiers_id, description)
VALUES ("2", "Regular Spicy")
INSERT INTO modifiers (modifiers_id, description)
VALUES ("3", "No Spicy")

INSERT INTO junction (junction_id,modifiers_id, item_id)
VALUES ("1","1", "1");
INSERT INTO junction (junction_id,modifiers_id, item_id)
VALUES ("2","2", "1");
INSERT INTO junction (junction_id,modifiers_id, item_id)
VALUES ("3","3", "1");