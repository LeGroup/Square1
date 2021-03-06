-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Palvelin: 127.0.0.1
-- Luontiaika: 16.05.2013 klo 11:22
-- Palvelimen versio: 5.6.11-log
-- PHP:n versio: 5.4.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Tietokanta: `square1`
--
CREATE DATABASE `square1` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `square1`;

-- --------------------------------------------------------

--
-- Rakenne taululle `nodes`
--

CREATE TABLE IF NOT EXISTS `nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `position` text NOT NULL,
  `ip` varchar(20) NOT NULL,
  `room` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

ALTER TABLE `nodes` DROP COLUMN `position`;
ALTER TABLE `nodes` ADD COLUMN `xPosition` INTEGER;
ALTER TABLE `nodes` ADD COLUMN `yPosition` INTEGER;
ALTER TABLE `nodes` ADD COLUMN `color` VARCHAR(10);

CREATE TABLE IF NOT EXISTS `saved` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `html` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `saved` ADD COLUMN `room` varchar(30) NOT NULL;
ALTER TABLE `nodes` ADD COLUMN `data` text;
