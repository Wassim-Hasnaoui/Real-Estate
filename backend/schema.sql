-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema real_state
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema real_state
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `real_state` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `real_state` ;

-- -----------------------------------------------------
-- Table `real_state`.`countrys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `real_state`.`countrys` (
  `countryID` INT NOT NULL AUTO_INCREMENT,
  `countryName` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`countryID`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `real_state`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `real_state`.`users` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `image` VARCHAR(200) NULL DEFAULT NULL,
  `phone` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `real_state`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `real_state`.`products` (
  `productID` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `category` VARCHAR(70) NOT NULL,
  `price` INT NOT NULL,
  `countryID` INT NOT NULL,
  `status` ENUM('sale', 'rent') NOT NULL,
  `current_status` ENUM('available', 'rented', 'sold') NOT NULL DEFAULT 'available',
  `userID` INT NOT NULL,
  PRIMARY KEY (`productID`),
  INDEX `countryID_idx` (`countryID` ASC) VISIBLE,
  INDEX `fk_products_users1_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `countryID`
    FOREIGN KEY (`countryID`)
    REFERENCES `real_state`.`countrys` (`countryID`),
  CONSTRAINT `fk_products_users1`
    FOREIGN KEY (`userID`)
    REFERENCES `real_state`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `real_state`.`images_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `real_state`.`images_product`;

CREATE TABLE IF NOT EXISTS `real_state`.`images_product` (
  `imageID` INT NOT NULL AUTO_INCREMENT,
  `imageURL` VARCHAR(300) NOT NULL,
  `productID` INT NOT NULL,
  PRIMARY KEY (`imageID`),
  CONSTRAINT `fk_images_product_products`
    FOREIGN KEY (`productID`)
    REFERENCES `real_state`.`products` (`productID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
