-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hospital` DEFAULT CHARACTER SET utf8 ;
USE `hospital` ;

-- -----------------------------------------------------
-- Table `hospital`.`Administrativo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Administrativo` (
  `idAdm` INT NOT NULL AUTO_INCREMENT,
  `nombreAdm` VARCHAR(45) NOT NULL,
  `apellido1Adm` VARCHAR(45) NOT NULL,
  `apellido2Adm` VARCHAR(45) NOT NULL,
  `matricula` DECIMAL(10) NOT NULL,
  `pwd` BLOB NOT NULL,
  PRIMARY KEY (`idAdm`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Seccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Seccion` (
  `idSec` INT NOT NULL AUTO_INCREMENT,
  `nombreSec` VARCHAR(45) NULL,
  PRIMARY KEY (`idSec`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Usuario` (
  `idUsu` INT NOT NULL AUTO_INCREMENT,
  `nombrePac` VARCHAR(45) NOT NULL,
  `apellido1Pac` VARCHAR(45) NOT NULL,
  `apellido2Pac` VARCHAR(45) NULL,
  `nss` VARCHAR(45) NOT NULL,
  `numeroCama` INT NOT NULL,
  `numeroPiso` INT NOT NULL,
  `nombreVis` VARCHAR(45) NOT NULL,
  `apellido1Vis` VARCHAR(45) NOT NULL,
  `apellido2Vis` VARCHAR(45) NULL,
  `telefono1` DECIMAL(10) NULL,
  `telefono2` DECIMAL(10) NULL,
  `correo` VARCHAR(100) NULL,
  `direccion` VARCHAR(150) NULL,
  PRIMARY KEY (`idUsu`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Encargado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Encargado` (
  `idEnc` INT NOT NULL AUTO_INCREMENT,
  `idAdm` INT NOT NULL,
  `idSec` INT NOT NULL,
  PRIMARY KEY (`idEnc`, `idAdm`, `idSec`),
  CONSTRAINT `fk_Encargado_Administrativo`
    FOREIGN KEY (`idAdm`)
    REFERENCES `hospital`.`Administrativo` (`idAdm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Encargado_Seccion1`
    FOREIGN KEY (`idSec`)
    REFERENCES `hospital`.`Seccion` (`idSec`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Registro` (
  `idReg` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATE NOT NULL,
  `HoraEntrada` TIME NULL,
  `idUsu` INT NOT NULL,
  `HoraSalida` TIME NULL,
  PRIMARY KEY (`idReg`),
  CONSTRAINT `fk_Registro_Usuario1`
    FOREIGN KEY (`idUsu`)
    REFERENCES `hospital`.`Usuario` (`idUsu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
