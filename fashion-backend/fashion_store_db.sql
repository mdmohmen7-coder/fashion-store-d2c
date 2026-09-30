-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2026 at 04:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashion_store_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Men', 'men', '2026-09-24 16:17:18'),
(2, 'Women', 'women', '2026-09-24 16:17:18'),
(3, 'Kids', 'kids', '2026-09-24 16:17:18');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `hex_code` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `hex_code`) VALUES
(1, 'Onyx Black', '#111111'),
(2, 'Heather Grey', '#8A8D8F'),
(3, 'Off White', '#FAF9F6');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_email` varchar(150) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `shipping_address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) DEFAULT 'United States',
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT 'Card',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `coupon_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `city`, `postal_code`, `country`, `total_amount`, `order_status`, `payment_method`, `created_at`, `discount_amount`, `coupon_code`) VALUES
(1, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 140.00, 'pending', 'Card', '2026-09-26 09:52:31', 0.00, NULL),
(2, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 35.00, 'pending', 'Card', '2026-09-26 10:15:26', 0.00, NULL),
(3, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 35.00, 'pending', 'Card', '2026-09-26 10:21:37', 0.00, NULL),
(4, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 35.00, 'pending', 'Card', '2026-09-26 10:28:18', 0.00, NULL),
(5, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 90.00, 'pending', 'Card', '2026-09-26 15:16:43', 0.00, NULL),
(6, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 47.53, 'pending', 'Card', '2026-09-27 12:04:45', 0.00, NULL),
(7, 'MD. Mohmen', 'mdmohmen7@gmail.com', '+8801774108928', 'Village: Shekher Para, Post: Premtoli, Upojila: Godagari District: Rajshahi', 'Rajshahi', '6290', 'United States', 149.10, 'pending', 'Card', '2026-09-27 16:48:38', 0.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `variant_id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `color_name` varchar(100) NOT NULL,
  `size_name` varchar(50) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `variant_id`, `product_name`, `color_name`, `size_name`, `quantity`, `unit_price`) VALUES
(1, 6, 299, 'Men Atelier Essential Item #100', 'Onyx Black', 'S', 1, 47.53),
(2, 7, 17, 'Kids Organic Comfort Set #6', 'Onyx Black', 'S', 1, 149.10);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `title`, `slug`, `description`, `base_price`, `created_at`, `updated_at`) VALUES
(1, 1, 'Men Atelier Essential Item #1', 'men-atelier-item-1', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 41.71, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(2, 2, 'Women Silhouette Atelier #2', 'women-atelier-item-2', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 70.60, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(3, 3, 'Kids Organic Comfort Set #3', 'kids-atelier-item-3', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 77.88, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(4, 1, 'Men Atelier Essential Item #4', 'men-atelier-item-4', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 142.61, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(5, 2, 'Women Silhouette Atelier #5', 'women-atelier-item-5', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 99.38, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(6, 3, 'Kids Organic Comfort Set #6', 'kids-atelier-item-6', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 149.10, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(7, 1, 'Men Atelier Essential Item #7', 'men-atelier-item-7', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 67.34, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(8, 2, 'Women Silhouette Atelier #8', 'women-atelier-item-8', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 84.39, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(9, 3, 'Kids Organic Comfort Set #9', 'kids-atelier-item-9', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 69.96, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(10, 1, 'Men Atelier Essential Item #10', 'men-atelier-item-10', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 61.63, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(11, 2, 'Women Silhouette Atelier #11', 'women-atelier-item-11', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 63.25, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(12, 3, 'Kids Organic Comfort Set #12', 'kids-atelier-item-12', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 96.37, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(13, 1, 'Men Atelier Essential Item #13', 'men-atelier-item-13', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 142.11, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(14, 2, 'Women Silhouette Atelier #14', 'women-atelier-item-14', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 41.42, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(15, 3, 'Kids Organic Comfort Set #15', 'kids-atelier-item-15', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 90.78, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(16, 1, 'Men Atelier Essential Item #16', 'men-atelier-item-16', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 64.66, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(17, 2, 'Women Silhouette Atelier #17', 'women-atelier-item-17', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 130.92, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(18, 3, 'Kids Organic Comfort Set #18', 'kids-atelier-item-18', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 80.66, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(19, 1, 'Men Atelier Essential Item #19', 'men-atelier-item-19', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 90.51, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(20, 2, 'Women Silhouette Atelier #20', 'women-atelier-item-20', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 60.60, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(21, 3, 'Kids Organic Comfort Set #21', 'kids-atelier-item-21', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 111.45, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(22, 1, 'Men Atelier Essential Item #22', 'men-atelier-item-22', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 110.44, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(23, 2, 'Women Silhouette Atelier #23', 'women-atelier-item-23', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 67.85, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(24, 3, 'Kids Organic Comfort Set #24', 'kids-atelier-item-24', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 87.94, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(25, 1, 'Men Atelier Essential Item #25', 'men-atelier-item-25', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 86.13, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(26, 2, 'Women Silhouette Atelier #26', 'women-atelier-item-26', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 131.85, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(27, 3, 'Kids Organic Comfort Set #27', 'kids-atelier-item-27', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 135.86, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(28, 1, 'Men Atelier Essential Item #28', 'men-atelier-item-28', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 133.75, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(29, 2, 'Women Silhouette Atelier #29', 'women-atelier-item-29', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 111.18, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(30, 3, 'Kids Organic Comfort Set #30', 'kids-atelier-item-30', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 119.64, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(31, 1, 'Men Atelier Essential Item #31', 'men-atelier-item-31', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 114.67, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(32, 2, 'Women Silhouette Atelier #32', 'women-atelier-item-32', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 64.43, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(33, 3, 'Kids Organic Comfort Set #33', 'kids-atelier-item-33', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 58.12, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(34, 1, 'Men Atelier Essential Item #34', 'men-atelier-item-34', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 62.33, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(35, 2, 'Women Silhouette Atelier #35', 'women-atelier-item-35', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 102.27, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(36, 3, 'Kids Organic Comfort Set #36', 'kids-atelier-item-36', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 59.38, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(37, 1, 'Men Atelier Essential Item #37', 'men-atelier-item-37', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 70.06, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(38, 2, 'Women Silhouette Atelier #38', 'women-atelier-item-38', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 137.19, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(39, 3, 'Kids Organic Comfort Set #39', 'kids-atelier-item-39', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 95.77, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(40, 1, 'Men Atelier Essential Item #40', 'men-atelier-item-40', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 147.28, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(41, 2, 'Women Silhouette Atelier #41', 'women-atelier-item-41', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 69.07, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(42, 3, 'Kids Organic Comfort Set #42', 'kids-atelier-item-42', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 98.52, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(43, 1, 'Men Atelier Essential Item #43', 'men-atelier-item-43', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 135.39, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(44, 2, 'Women Silhouette Atelier #44', 'women-atelier-item-44', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 116.38, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(45, 3, 'Kids Organic Comfort Set #45', 'kids-atelier-item-45', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 140.73, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(46, 1, 'Men Atelier Essential Item #46', 'men-atelier-item-46', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 89.50, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(47, 2, 'Women Silhouette Atelier #47', 'women-atelier-item-47', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 105.34, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(48, 3, 'Kids Organic Comfort Set #48', 'kids-atelier-item-48', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 108.18, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(49, 1, 'Men Atelier Essential Item #49', 'men-atelier-item-49', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 74.86, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(50, 2, 'Women Silhouette Atelier #50', 'women-atelier-item-50', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 129.79, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(51, 3, 'Kids Organic Comfort Set #51', 'kids-atelier-item-51', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 44.38, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(52, 1, 'Men Atelier Essential Item #52', 'men-atelier-item-52', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 142.52, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(53, 2, 'Women Silhouette Atelier #53', 'women-atelier-item-53', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 84.44, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(54, 3, 'Kids Organic Comfort Set #54', 'kids-atelier-item-54', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 74.65, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(55, 1, 'Men Atelier Essential Item #55', 'men-atelier-item-55', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 84.93, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(56, 2, 'Women Silhouette Atelier #56', 'women-atelier-item-56', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 50.70, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(57, 3, 'Kids Organic Comfort Set #57', 'kids-atelier-item-57', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 78.70, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(58, 1, 'Men Atelier Essential Item #58', 'men-atelier-item-58', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 91.39, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(59, 2, 'Women Silhouette Atelier #59', 'women-atelier-item-59', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 70.87, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(60, 3, 'Kids Organic Comfort Set #60', 'kids-atelier-item-60', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 45.20, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(61, 1, 'Men Atelier Essential Item #61', 'men-atelier-item-61', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 93.35, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(62, 2, 'Women Silhouette Atelier #62', 'women-atelier-item-62', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 66.18, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(63, 3, 'Kids Organic Comfort Set #63', 'kids-atelier-item-63', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 130.83, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(64, 1, 'Men Atelier Essential Item #64', 'men-atelier-item-64', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 75.61, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(65, 2, 'Women Silhouette Atelier #65', 'women-atelier-item-65', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 65.56, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(66, 3, 'Kids Organic Comfort Set #66', 'kids-atelier-item-66', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 65.96, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(67, 1, 'Men Atelier Essential Item #67', 'men-atelier-item-67', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 98.11, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(68, 2, 'Women Silhouette Atelier #68', 'women-atelier-item-68', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 142.70, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(69, 3, 'Kids Organic Comfort Set #69', 'kids-atelier-item-69', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 39.15, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(70, 1, 'Men Atelier Essential Item #70', 'men-atelier-item-70', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 77.67, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(71, 2, 'Women Silhouette Atelier #71', 'women-atelier-item-71', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 120.90, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(72, 3, 'Kids Organic Comfort Set #72', 'kids-atelier-item-72', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 106.46, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(73, 1, 'Men Atelier Essential Item #73', 'men-atelier-item-73', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 134.64, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(74, 2, 'Women Silhouette Atelier #74', 'women-atelier-item-74', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 88.79, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(75, 3, 'Kids Organic Comfort Set #75', 'kids-atelier-item-75', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 120.03, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(76, 1, 'Men Atelier Essential Item #76', 'men-atelier-item-76', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 68.80, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(77, 2, 'Women Silhouette Atelier #77', 'women-atelier-item-77', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 63.89, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(78, 3, 'Kids Organic Comfort Set #78', 'kids-atelier-item-78', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 78.06, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(79, 1, 'Men Atelier Essential Item #79', 'men-atelier-item-79', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 48.63, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(80, 2, 'Women Silhouette Atelier #80', 'women-atelier-item-80', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 88.97, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(81, 3, 'Kids Organic Comfort Set #81', 'kids-atelier-item-81', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 148.94, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(82, 1, 'Men Atelier Essential Item #82', 'men-atelier-item-82', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 97.80, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(83, 2, 'Women Silhouette Atelier #83', 'women-atelier-item-83', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 122.17, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(84, 3, 'Kids Organic Comfort Set #84', 'kids-atelier-item-84', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 52.45, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(85, 1, 'Men Atelier Essential Item #85', 'men-atelier-item-85', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 90.76, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(86, 2, 'Women Silhouette Atelier #86', 'women-atelier-item-86', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 146.42, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(87, 3, 'Kids Organic Comfort Set #87', 'kids-atelier-item-87', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 79.84, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(88, 1, 'Men Atelier Essential Item #88', 'men-atelier-item-88', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 39.95, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(89, 2, 'Women Silhouette Atelier #89', 'women-atelier-item-89', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 40.24, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(90, 3, 'Kids Organic Comfort Set #90', 'kids-atelier-item-90', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 46.34, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(91, 1, 'Men Atelier Essential Item #91', 'men-atelier-item-91', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 75.97, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(92, 2, 'Women Silhouette Atelier #92', 'women-atelier-item-92', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 90.81, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(93, 3, 'Kids Organic Comfort Set #93', 'kids-atelier-item-93', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 76.17, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(94, 1, 'Men Atelier Essential Item #94', 'men-atelier-item-94', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 73.43, '2026-09-27 11:50:59', '2026-09-27 11:50:59'),
(95, 2, 'Women Silhouette Atelier #95', 'women-atelier-item-95', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 103.62, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(96, 3, 'Kids Organic Comfort Set #96', 'kids-atelier-item-96', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 147.79, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(97, 1, 'Men Atelier Essential Item #97', 'men-atelier-item-97', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 48.13, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(98, 2, 'Women Silhouette Atelier #98', 'women-atelier-item-98', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 107.25, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(99, 3, 'Kids Organic Comfort Set #99', 'kids-atelier-item-99', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 126.85, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(100, 1, 'Men Atelier Essential Item #100', 'men-atelier-item-100', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 47.53, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(101, 2, 'Women Silhouette Atelier #101', 'women-atelier-item-101', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 52.07, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(102, 3, 'Kids Organic Comfort Set #102', 'kids-atelier-item-102', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 82.76, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(103, 1, 'Men Atelier Essential Item #103', 'men-atelier-item-103', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 107.61, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(104, 2, 'Women Silhouette Atelier #104', 'women-atelier-item-104', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 139.77, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(105, 3, 'Kids Organic Comfort Set #105', 'kids-atelier-item-105', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 111.02, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(106, 1, 'Men Atelier Essential Item #106', 'men-atelier-item-106', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 100.78, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(107, 2, 'Women Silhouette Atelier #107', 'women-atelier-item-107', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 135.83, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(108, 3, 'Kids Organic Comfort Set #108', 'kids-atelier-item-108', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 111.81, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(109, 1, 'Men Atelier Essential Item #109', 'men-atelier-item-109', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 116.59, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(110, 2, 'Women Silhouette Atelier #110', 'women-atelier-item-110', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 97.50, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(111, 3, 'Kids Organic Comfort Set #111', 'kids-atelier-item-111', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 102.72, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(112, 1, 'Men Atelier Essential Item #112', 'men-atelier-item-112', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 71.11, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(113, 2, 'Women Silhouette Atelier #113', 'women-atelier-item-113', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 127.40, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(114, 3, 'Kids Organic Comfort Set #114', 'kids-atelier-item-114', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 43.67, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(115, 1, 'Men Atelier Essential Item #115', 'men-atelier-item-115', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 146.16, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(116, 2, 'Women Silhouette Atelier #116', 'women-atelier-item-116', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 104.78, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(117, 3, 'Kids Organic Comfort Set #117', 'kids-atelier-item-117', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 50.44, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(118, 1, 'Men Atelier Essential Item #118', 'men-atelier-item-118', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 132.83, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(119, 2, 'Women Silhouette Atelier #119', 'women-atelier-item-119', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 132.83, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(120, 3, 'Kids Organic Comfort Set #120', 'kids-atelier-item-120', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 115.67, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(121, 1, 'Men Atelier Essential Item #121', 'men-atelier-item-121', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 144.88, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(122, 2, 'Women Silhouette Atelier #122', 'women-atelier-item-122', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 112.36, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(123, 3, 'Kids Organic Comfort Set #123', 'kids-atelier-item-123', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 92.17, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(124, 1, 'Men Atelier Essential Item #124', 'men-atelier-item-124', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 88.77, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(125, 2, 'Women Silhouette Atelier #125', 'women-atelier-item-125', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 132.34, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(126, 3, 'Kids Organic Comfort Set #126', 'kids-atelier-item-126', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 130.38, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(127, 1, 'Men Atelier Essential Item #127', 'men-atelier-item-127', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 104.89, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(128, 2, 'Women Silhouette Atelier #128', 'women-atelier-item-128', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 98.32, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(129, 3, 'Kids Organic Comfort Set #129', 'kids-atelier-item-129', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 141.94, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(130, 1, 'Men Atelier Essential Item #130', 'men-atelier-item-130', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 149.73, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(131, 2, 'Women Silhouette Atelier #131', 'women-atelier-item-131', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 57.84, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(132, 3, 'Kids Organic Comfort Set #132', 'kids-atelier-item-132', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 149.98, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(133, 1, 'Men Atelier Essential Item #133', 'men-atelier-item-133', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 81.41, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(134, 2, 'Women Silhouette Atelier #134', 'women-atelier-item-134', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 37.11, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(135, 3, 'Kids Organic Comfort Set #135', 'kids-atelier-item-135', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 136.33, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(136, 1, 'Men Atelier Essential Item #136', 'men-atelier-item-136', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 75.31, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(137, 2, 'Women Silhouette Atelier #137', 'women-atelier-item-137', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 47.56, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(138, 3, 'Kids Organic Comfort Set #138', 'kids-atelier-item-138', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 91.88, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(139, 1, 'Men Atelier Essential Item #139', 'men-atelier-item-139', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 51.72, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(140, 2, 'Women Silhouette Atelier #140', 'women-atelier-item-140', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 62.96, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(141, 3, 'Kids Organic Comfort Set #141', 'kids-atelier-item-141', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 124.65, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(142, 1, 'Men Atelier Essential Item #142', 'men-atelier-item-142', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 54.38, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(143, 2, 'Women Silhouette Atelier #143', 'women-atelier-item-143', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 92.94, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(144, 3, 'Kids Organic Comfort Set #144', 'kids-atelier-item-144', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 36.54, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(145, 1, 'Men Atelier Essential Item #145', 'men-atelier-item-145', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 98.88, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(146, 2, 'Women Silhouette Atelier #146', 'women-atelier-item-146', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 119.79, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(147, 3, 'Kids Organic Comfort Set #147', 'kids-atelier-item-147', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 37.32, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(148, 1, 'Men Atelier Essential Item #148', 'men-atelier-item-148', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 137.24, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(149, 2, 'Women Silhouette Atelier #149', 'women-atelier-item-149', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 79.21, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(150, 3, 'Kids Organic Comfort Set #150', 'kids-atelier-item-150', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 64.34, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(151, 1, 'Men Atelier Essential Item #151', 'men-atelier-item-151', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 49.08, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(152, 2, 'Women Silhouette Atelier #152', 'women-atelier-item-152', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 132.39, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(153, 3, 'Kids Organic Comfort Set #153', 'kids-atelier-item-153', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 134.69, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(154, 1, 'Men Atelier Essential Item #154', 'men-atelier-item-154', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 126.28, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(155, 2, 'Women Silhouette Atelier #155', 'women-atelier-item-155', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 77.32, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(156, 3, 'Kids Organic Comfort Set #156', 'kids-atelier-item-156', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 87.75, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(157, 1, 'Men Atelier Essential Item #157', 'men-atelier-item-157', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 56.80, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(158, 2, 'Women Silhouette Atelier #158', 'women-atelier-item-158', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 100.76, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(159, 3, 'Kids Organic Comfort Set #159', 'kids-atelier-item-159', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 68.38, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(160, 1, 'Men Atelier Essential Item #160', 'men-atelier-item-160', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 119.64, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(161, 2, 'Women Silhouette Atelier #161', 'women-atelier-item-161', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 128.04, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(162, 3, 'Kids Organic Comfort Set #162', 'kids-atelier-item-162', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 131.27, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(163, 1, 'Men Atelier Essential Item #163', 'men-atelier-item-163', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 122.24, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(164, 2, 'Women Silhouette Atelier #164', 'women-atelier-item-164', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 67.39, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(165, 3, 'Kids Organic Comfort Set #165', 'kids-atelier-item-165', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 50.23, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(166, 1, 'Men Atelier Essential Item #166', 'men-atelier-item-166', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 128.99, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(167, 2, 'Women Silhouette Atelier #167', 'women-atelier-item-167', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 114.26, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(168, 3, 'Kids Organic Comfort Set #168', 'kids-atelier-item-168', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 149.32, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(169, 1, 'Men Atelier Essential Item #169', 'men-atelier-item-169', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 138.81, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(170, 2, 'Women Silhouette Atelier #170', 'women-atelier-item-170', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 96.10, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(171, 3, 'Kids Organic Comfort Set #171', 'kids-atelier-item-171', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 144.06, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(172, 1, 'Men Atelier Essential Item #172', 'men-atelier-item-172', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 52.01, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(173, 2, 'Women Silhouette Atelier #173', 'women-atelier-item-173', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 137.86, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(174, 3, 'Kids Organic Comfort Set #174', 'kids-atelier-item-174', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 38.29, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(175, 1, 'Men Atelier Essential Item #175', 'men-atelier-item-175', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 87.86, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(176, 2, 'Women Silhouette Atelier #176', 'women-atelier-item-176', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 59.43, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(177, 3, 'Kids Organic Comfort Set #177', 'kids-atelier-item-177', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 113.55, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(178, 1, 'Men Atelier Essential Item #178', 'men-atelier-item-178', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 124.48, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(179, 2, 'Women Silhouette Atelier #179', 'women-atelier-item-179', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 131.76, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(180, 3, 'Kids Organic Comfort Set #180', 'kids-atelier-item-180', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 135.34, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(181, 1, 'Men Atelier Essential Item #181', 'men-atelier-item-181', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 131.44, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(182, 2, 'Women Silhouette Atelier #182', 'women-atelier-item-182', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 101.18, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(183, 3, 'Kids Organic Comfort Set #183', 'kids-atelier-item-183', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 76.58, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(184, 1, 'Men Atelier Essential Item #184', 'men-atelier-item-184', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 44.36, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(185, 2, 'Women Silhouette Atelier #185', 'women-atelier-item-185', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 72.06, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(186, 3, 'Kids Organic Comfort Set #186', 'kids-atelier-item-186', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 77.24, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(187, 1, 'Men Atelier Essential Item #187', 'men-atelier-item-187', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 135.00, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(188, 2, 'Women Silhouette Atelier #188', 'women-atelier-item-188', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 63.27, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(189, 3, 'Kids Organic Comfort Set #189', 'kids-atelier-item-189', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 106.37, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(190, 1, 'Men Atelier Essential Item #190', 'men-atelier-item-190', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 77.04, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(191, 2, 'Women Silhouette Atelier #191', 'women-atelier-item-191', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 146.11, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(192, 3, 'Kids Organic Comfort Set #192', 'kids-atelier-item-192', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 119.39, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(193, 1, 'Men Atelier Essential Item #193', 'men-atelier-item-193', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 123.65, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(194, 2, 'Women Silhouette Atelier #194', 'women-atelier-item-194', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 110.05, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(195, 3, 'Kids Organic Comfort Set #195', 'kids-atelier-item-195', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 144.33, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(196, 1, 'Men Atelier Essential Item #196', 'men-atelier-item-196', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 126.49, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(197, 2, 'Women Silhouette Atelier #197', 'women-atelier-item-197', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 49.48, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(198, 3, 'Kids Organic Comfort Set #198', 'kids-atelier-item-198', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 62.90, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(199, 1, 'Men Atelier Essential Item #199', 'men-atelier-item-199', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 131.07, '2026-09-27 11:51:00', '2026-09-27 11:51:00'),
(200, 2, 'Women Silhouette Atelier #200', 'women-atelier-item-200', 'Crafted from luxury heavyweight organic yarn with tailored drapery for effortless silhouettes.', 86.67, '2026-09-27 11:51:00', '2026-09-27 11:51:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `color_id` int(10) UNSIGNED DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `color_id`, `image_url`, `is_primary`) VALUES
(1, 1, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(2, 2, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(3, 3, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(4, 4, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(5, 5, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(6, 6, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(7, 7, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(8, 8, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(9, 9, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(10, 10, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(11, 11, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(12, 12, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(13, 13, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(14, 14, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(15, 15, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(16, 16, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(17, 17, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(18, 18, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(19, 19, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(20, 20, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(21, 21, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(22, 22, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(23, 23, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(24, 24, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(25, 25, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(26, 26, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(27, 27, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(28, 28, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(29, 29, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(30, 30, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(31, 31, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(32, 32, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(33, 33, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(34, 34, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(35, 35, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(36, 36, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(37, 37, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(38, 38, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(39, 39, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(40, 40, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(41, 41, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(42, 42, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(43, 43, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(44, 44, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(45, 45, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(46, 46, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(47, 47, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(48, 48, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(49, 49, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(50, 50, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(51, 51, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(52, 52, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(53, 53, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(54, 54, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(55, 55, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(56, 56, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(57, 57, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(58, 58, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(59, 59, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(60, 60, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(61, 61, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(62, 62, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(63, 63, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(64, 64, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(65, 65, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(66, 66, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(67, 67, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(68, 68, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(69, 69, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(70, 70, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(71, 71, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(72, 72, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(73, 73, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(74, 74, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(75, 75, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(76, 76, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(77, 77, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(78, 78, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(79, 79, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(80, 80, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(81, 81, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(82, 82, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(83, 83, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(84, 84, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(85, 85, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(86, 86, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(87, 87, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(88, 88, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(89, 89, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(90, 90, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(91, 91, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(92, 92, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(93, 93, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(94, 94, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(95, 95, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(96, 96, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(97, 97, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(98, 98, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(99, 99, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(100, 100, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(101, 101, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(102, 102, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(103, 103, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(104, 104, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(105, 105, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(106, 106, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(107, 107, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(108, 108, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(109, 109, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(110, 110, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(111, 111, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(112, 112, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(113, 113, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(114, 114, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(115, 115, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(116, 116, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(117, 117, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(118, 118, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(119, 119, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(120, 120, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(121, 121, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(122, 122, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(123, 123, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(124, 124, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(125, 125, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(126, 126, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(127, 127, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(128, 128, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(129, 129, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(130, 130, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(131, 131, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(132, 132, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(133, 133, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(134, 134, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(135, 135, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(136, 136, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(137, 137, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(138, 138, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(139, 139, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(140, 140, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(141, 141, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(142, 142, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(143, 143, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(144, 144, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(145, 145, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(146, 146, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(147, 147, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(148, 148, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(149, 149, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(150, 150, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(151, 151, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(152, 152, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(153, 153, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(154, 154, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(155, 155, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(156, 156, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(157, 157, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(158, 158, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(159, 159, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(160, 160, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(161, 161, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(162, 162, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(163, 163, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(164, 164, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(165, 165, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(166, 166, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(167, 167, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(168, 168, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(169, 169, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(170, 170, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(171, 171, 1, 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=80', 1),
(172, 172, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(173, 173, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(174, 174, 1, 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80', 1),
(175, 175, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(176, 176, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(177, 177, 1, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', 1),
(178, 178, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(179, 179, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(180, 180, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', 1),
(181, 181, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(182, 182, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(183, 183, 1, 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80', 1),
(184, 184, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(185, 185, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1),
(186, 186, 1, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80', 1),
(187, 187, 1, 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80', 1),
(188, 188, 1, 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80', 1),
(189, 189, 1, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 1),
(190, 190, 1, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80', 1),
(191, 191, 1, 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=800&q=80', 1),
(192, 192, 1, 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80', 1),
(193, 193, 1, 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 1),
(194, 194, 1, 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80', 1),
(195, 195, 1, 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80', 1),
(196, 196, 1, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 1),
(197, 197, 1, 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 1),
(198, 198, 1, 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=80', 1),
(199, 199, 1, 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 1),
(200, 200, 1, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `reviewer_name` varchar(120) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `fit_feedback` enum('Runs Small','True to Size','Runs Large') DEFAULT 'True to Size',
  `review_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `color_id` int(10) UNSIGNED NOT NULL,
  `size_id` int(10) UNSIGNED NOT NULL,
  `sku` varchar(100) NOT NULL,
  `stock_quantity` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `color_id`, `size_id`, `sku`, `stock_quantity`, `price`) VALUES
(1, 1, 1, 1, 'SKU-1-S', 12, 0.00),
(2, 1, 1, 2, 'SKU-1-M', 20, 0.00),
(3, 1, 1, 3, 'SKU-1-L', 15, 0.00),
(4, 2, 1, 1, 'SKU-2-S', 12, 0.00),
(5, 2, 1, 2, 'SKU-2-M', 20, 0.00),
(6, 2, 1, 3, 'SKU-2-L', 15, 0.00),
(7, 3, 1, 1, 'SKU-3-S', 12, 0.00),
(8, 3, 1, 2, 'SKU-3-M', 20, 0.00),
(9, 3, 1, 3, 'SKU-3-L', 15, 0.00),
(10, 4, 1, 1, 'SKU-4-S', 12, 0.00),
(11, 4, 1, 2, 'SKU-4-M', 20, 0.00),
(12, 4, 1, 3, 'SKU-4-L', 15, 0.00),
(13, 5, 1, 1, 'SKU-5-S', 12, 0.00),
(14, 5, 1, 2, 'SKU-5-M', 20, 0.00),
(15, 5, 1, 3, 'SKU-5-L', 15, 0.00),
(16, 6, 1, 1, 'SKU-6-S', 12, 0.00),
(17, 6, 1, 2, 'SKU-6-M', 19, 0.00),
(18, 6, 1, 3, 'SKU-6-L', 15, 0.00),
(19, 7, 1, 1, 'SKU-7-S', 12, 0.00),
(20, 7, 1, 2, 'SKU-7-M', 20, 0.00),
(21, 7, 1, 3, 'SKU-7-L', 15, 0.00),
(22, 8, 1, 1, 'SKU-8-S', 12, 0.00),
(23, 8, 1, 2, 'SKU-8-M', 20, 0.00),
(24, 8, 1, 3, 'SKU-8-L', 15, 0.00),
(25, 9, 1, 1, 'SKU-9-S', 12, 0.00),
(26, 9, 1, 2, 'SKU-9-M', 20, 0.00),
(27, 9, 1, 3, 'SKU-9-L', 15, 0.00),
(28, 10, 1, 1, 'SKU-10-S', 12, 0.00),
(29, 10, 1, 2, 'SKU-10-M', 20, 0.00),
(30, 10, 1, 3, 'SKU-10-L', 15, 0.00),
(31, 11, 1, 1, 'SKU-11-S', 12, 0.00),
(32, 11, 1, 2, 'SKU-11-M', 20, 0.00),
(33, 11, 1, 3, 'SKU-11-L', 15, 0.00),
(34, 12, 1, 1, 'SKU-12-S', 12, 0.00),
(35, 12, 1, 2, 'SKU-12-M', 20, 0.00),
(36, 12, 1, 3, 'SKU-12-L', 15, 0.00),
(37, 13, 1, 1, 'SKU-13-S', 12, 0.00),
(38, 13, 1, 2, 'SKU-13-M', 20, 0.00),
(39, 13, 1, 3, 'SKU-13-L', 15, 0.00),
(40, 14, 1, 1, 'SKU-14-S', 12, 0.00),
(41, 14, 1, 2, 'SKU-14-M', 20, 0.00),
(42, 14, 1, 3, 'SKU-14-L', 15, 0.00),
(43, 15, 1, 1, 'SKU-15-S', 12, 0.00),
(44, 15, 1, 2, 'SKU-15-M', 20, 0.00),
(45, 15, 1, 3, 'SKU-15-L', 15, 0.00),
(46, 16, 1, 1, 'SKU-16-S', 12, 0.00),
(47, 16, 1, 2, 'SKU-16-M', 20, 0.00),
(48, 16, 1, 3, 'SKU-16-L', 15, 0.00),
(49, 17, 1, 1, 'SKU-17-S', 12, 0.00),
(50, 17, 1, 2, 'SKU-17-M', 20, 0.00),
(51, 17, 1, 3, 'SKU-17-L', 15, 0.00),
(52, 18, 1, 1, 'SKU-18-S', 12, 0.00),
(53, 18, 1, 2, 'SKU-18-M', 20, 0.00),
(54, 18, 1, 3, 'SKU-18-L', 15, 0.00),
(55, 19, 1, 1, 'SKU-19-S', 12, 0.00),
(56, 19, 1, 2, 'SKU-19-M', 20, 0.00),
(57, 19, 1, 3, 'SKU-19-L', 15, 0.00),
(58, 20, 1, 1, 'SKU-20-S', 12, 0.00),
(59, 20, 1, 2, 'SKU-20-M', 20, 0.00),
(60, 20, 1, 3, 'SKU-20-L', 15, 0.00),
(61, 21, 1, 1, 'SKU-21-S', 12, 0.00),
(62, 21, 1, 2, 'SKU-21-M', 20, 0.00),
(63, 21, 1, 3, 'SKU-21-L', 15, 0.00),
(64, 22, 1, 1, 'SKU-22-S', 12, 0.00),
(65, 22, 1, 2, 'SKU-22-M', 20, 0.00),
(66, 22, 1, 3, 'SKU-22-L', 15, 0.00),
(67, 23, 1, 1, 'SKU-23-S', 12, 0.00),
(68, 23, 1, 2, 'SKU-23-M', 20, 0.00),
(69, 23, 1, 3, 'SKU-23-L', 15, 0.00),
(70, 24, 1, 1, 'SKU-24-S', 12, 0.00),
(71, 24, 1, 2, 'SKU-24-M', 20, 0.00),
(72, 24, 1, 3, 'SKU-24-L', 15, 0.00),
(73, 25, 1, 1, 'SKU-25-S', 12, 0.00),
(74, 25, 1, 2, 'SKU-25-M', 20, 0.00),
(75, 25, 1, 3, 'SKU-25-L', 15, 0.00),
(76, 26, 1, 1, 'SKU-26-S', 12, 0.00),
(77, 26, 1, 2, 'SKU-26-M', 20, 0.00),
(78, 26, 1, 3, 'SKU-26-L', 15, 0.00),
(79, 27, 1, 1, 'SKU-27-S', 12, 0.00),
(80, 27, 1, 2, 'SKU-27-M', 20, 0.00),
(81, 27, 1, 3, 'SKU-27-L', 15, 0.00),
(82, 28, 1, 1, 'SKU-28-S', 12, 0.00),
(83, 28, 1, 2, 'SKU-28-M', 20, 0.00),
(84, 28, 1, 3, 'SKU-28-L', 15, 0.00),
(85, 29, 1, 1, 'SKU-29-S', 12, 0.00),
(86, 29, 1, 2, 'SKU-29-M', 20, 0.00),
(87, 29, 1, 3, 'SKU-29-L', 15, 0.00),
(88, 30, 1, 1, 'SKU-30-S', 12, 0.00),
(89, 30, 1, 2, 'SKU-30-M', 20, 0.00),
(90, 30, 1, 3, 'SKU-30-L', 15, 0.00),
(91, 31, 1, 1, 'SKU-31-S', 12, 0.00),
(92, 31, 1, 2, 'SKU-31-M', 20, 0.00),
(93, 31, 1, 3, 'SKU-31-L', 15, 0.00),
(94, 32, 1, 1, 'SKU-32-S', 12, 0.00),
(95, 32, 1, 2, 'SKU-32-M', 20, 0.00),
(96, 32, 1, 3, 'SKU-32-L', 15, 0.00),
(97, 33, 1, 1, 'SKU-33-S', 12, 0.00),
(98, 33, 1, 2, 'SKU-33-M', 20, 0.00),
(99, 33, 1, 3, 'SKU-33-L', 15, 0.00),
(100, 34, 1, 1, 'SKU-34-S', 12, 0.00),
(101, 34, 1, 2, 'SKU-34-M', 20, 0.00),
(102, 34, 1, 3, 'SKU-34-L', 15, 0.00),
(103, 35, 1, 1, 'SKU-35-S', 12, 0.00),
(104, 35, 1, 2, 'SKU-35-M', 20, 0.00),
(105, 35, 1, 3, 'SKU-35-L', 15, 0.00),
(106, 36, 1, 1, 'SKU-36-S', 12, 0.00),
(107, 36, 1, 2, 'SKU-36-M', 20, 0.00),
(108, 36, 1, 3, 'SKU-36-L', 15, 0.00),
(109, 37, 1, 1, 'SKU-37-S', 12, 0.00),
(110, 37, 1, 2, 'SKU-37-M', 20, 0.00),
(111, 37, 1, 3, 'SKU-37-L', 15, 0.00),
(112, 38, 1, 1, 'SKU-38-S', 12, 0.00),
(113, 38, 1, 2, 'SKU-38-M', 20, 0.00),
(114, 38, 1, 3, 'SKU-38-L', 15, 0.00),
(115, 39, 1, 1, 'SKU-39-S', 12, 0.00),
(116, 39, 1, 2, 'SKU-39-M', 20, 0.00),
(117, 39, 1, 3, 'SKU-39-L', 15, 0.00),
(118, 40, 1, 1, 'SKU-40-S', 12, 0.00),
(119, 40, 1, 2, 'SKU-40-M', 20, 0.00),
(120, 40, 1, 3, 'SKU-40-L', 15, 0.00),
(121, 41, 1, 1, 'SKU-41-S', 12, 0.00),
(122, 41, 1, 2, 'SKU-41-M', 20, 0.00),
(123, 41, 1, 3, 'SKU-41-L', 15, 0.00),
(124, 42, 1, 1, 'SKU-42-S', 12, 0.00),
(125, 42, 1, 2, 'SKU-42-M', 20, 0.00),
(126, 42, 1, 3, 'SKU-42-L', 15, 0.00),
(127, 43, 1, 1, 'SKU-43-S', 12, 0.00),
(128, 43, 1, 2, 'SKU-43-M', 20, 0.00),
(129, 43, 1, 3, 'SKU-43-L', 15, 0.00),
(130, 44, 1, 1, 'SKU-44-S', 12, 0.00),
(131, 44, 1, 2, 'SKU-44-M', 20, 0.00),
(132, 44, 1, 3, 'SKU-44-L', 15, 0.00),
(133, 45, 1, 1, 'SKU-45-S', 12, 0.00),
(134, 45, 1, 2, 'SKU-45-M', 20, 0.00),
(135, 45, 1, 3, 'SKU-45-L', 15, 0.00),
(136, 46, 1, 1, 'SKU-46-S', 12, 0.00),
(137, 46, 1, 2, 'SKU-46-M', 20, 0.00),
(138, 46, 1, 3, 'SKU-46-L', 15, 0.00),
(139, 47, 1, 1, 'SKU-47-S', 12, 0.00),
(140, 47, 1, 2, 'SKU-47-M', 20, 0.00),
(141, 47, 1, 3, 'SKU-47-L', 15, 0.00),
(142, 48, 1, 1, 'SKU-48-S', 12, 0.00),
(143, 48, 1, 2, 'SKU-48-M', 20, 0.00),
(144, 48, 1, 3, 'SKU-48-L', 15, 0.00),
(145, 49, 1, 1, 'SKU-49-S', 12, 0.00),
(146, 49, 1, 2, 'SKU-49-M', 20, 0.00),
(147, 49, 1, 3, 'SKU-49-L', 15, 0.00),
(148, 50, 1, 1, 'SKU-50-S', 12, 0.00),
(149, 50, 1, 2, 'SKU-50-M', 20, 0.00),
(150, 50, 1, 3, 'SKU-50-L', 15, 0.00),
(151, 51, 1, 1, 'SKU-51-S', 12, 0.00),
(152, 51, 1, 2, 'SKU-51-M', 20, 0.00),
(153, 51, 1, 3, 'SKU-51-L', 15, 0.00),
(154, 52, 1, 1, 'SKU-52-S', 12, 0.00),
(155, 52, 1, 2, 'SKU-52-M', 20, 0.00),
(156, 52, 1, 3, 'SKU-52-L', 15, 0.00),
(157, 53, 1, 1, 'SKU-53-S', 12, 0.00),
(158, 53, 1, 2, 'SKU-53-M', 20, 0.00),
(159, 53, 1, 3, 'SKU-53-L', 15, 0.00),
(160, 54, 1, 1, 'SKU-54-S', 12, 0.00),
(161, 54, 1, 2, 'SKU-54-M', 20, 0.00),
(162, 54, 1, 3, 'SKU-54-L', 15, 0.00),
(163, 55, 1, 1, 'SKU-55-S', 12, 0.00),
(164, 55, 1, 2, 'SKU-55-M', 20, 0.00),
(165, 55, 1, 3, 'SKU-55-L', 15, 0.00),
(166, 56, 1, 1, 'SKU-56-S', 12, 0.00),
(167, 56, 1, 2, 'SKU-56-M', 20, 0.00),
(168, 56, 1, 3, 'SKU-56-L', 15, 0.00),
(169, 57, 1, 1, 'SKU-57-S', 12, 0.00),
(170, 57, 1, 2, 'SKU-57-M', 20, 0.00),
(171, 57, 1, 3, 'SKU-57-L', 15, 0.00),
(172, 58, 1, 1, 'SKU-58-S', 12, 0.00),
(173, 58, 1, 2, 'SKU-58-M', 20, 0.00),
(174, 58, 1, 3, 'SKU-58-L', 15, 0.00),
(175, 59, 1, 1, 'SKU-59-S', 12, 0.00),
(176, 59, 1, 2, 'SKU-59-M', 20, 0.00),
(177, 59, 1, 3, 'SKU-59-L', 15, 0.00),
(178, 60, 1, 1, 'SKU-60-S', 12, 0.00),
(179, 60, 1, 2, 'SKU-60-M', 20, 0.00),
(180, 60, 1, 3, 'SKU-60-L', 15, 0.00),
(181, 61, 1, 1, 'SKU-61-S', 12, 0.00),
(182, 61, 1, 2, 'SKU-61-M', 20, 0.00),
(183, 61, 1, 3, 'SKU-61-L', 15, 0.00),
(184, 62, 1, 1, 'SKU-62-S', 12, 0.00),
(185, 62, 1, 2, 'SKU-62-M', 20, 0.00),
(186, 62, 1, 3, 'SKU-62-L', 15, 0.00),
(187, 63, 1, 1, 'SKU-63-S', 12, 0.00),
(188, 63, 1, 2, 'SKU-63-M', 20, 0.00),
(189, 63, 1, 3, 'SKU-63-L', 15, 0.00),
(190, 64, 1, 1, 'SKU-64-S', 12, 0.00),
(191, 64, 1, 2, 'SKU-64-M', 20, 0.00),
(192, 64, 1, 3, 'SKU-64-L', 15, 0.00),
(193, 65, 1, 1, 'SKU-65-S', 12, 0.00),
(194, 65, 1, 2, 'SKU-65-M', 20, 0.00),
(195, 65, 1, 3, 'SKU-65-L', 15, 0.00),
(196, 66, 1, 1, 'SKU-66-S', 12, 0.00),
(197, 66, 1, 2, 'SKU-66-M', 20, 0.00),
(198, 66, 1, 3, 'SKU-66-L', 15, 0.00),
(199, 67, 1, 1, 'SKU-67-S', 12, 0.00),
(200, 67, 1, 2, 'SKU-67-M', 20, 0.00),
(201, 67, 1, 3, 'SKU-67-L', 15, 0.00),
(202, 68, 1, 1, 'SKU-68-S', 12, 0.00),
(203, 68, 1, 2, 'SKU-68-M', 20, 0.00),
(204, 68, 1, 3, 'SKU-68-L', 15, 0.00),
(205, 69, 1, 1, 'SKU-69-S', 12, 0.00),
(206, 69, 1, 2, 'SKU-69-M', 20, 0.00),
(207, 69, 1, 3, 'SKU-69-L', 15, 0.00),
(208, 70, 1, 1, 'SKU-70-S', 12, 0.00),
(209, 70, 1, 2, 'SKU-70-M', 20, 0.00),
(210, 70, 1, 3, 'SKU-70-L', 15, 0.00),
(211, 71, 1, 1, 'SKU-71-S', 12, 0.00),
(212, 71, 1, 2, 'SKU-71-M', 20, 0.00),
(213, 71, 1, 3, 'SKU-71-L', 15, 0.00),
(214, 72, 1, 1, 'SKU-72-S', 12, 0.00),
(215, 72, 1, 2, 'SKU-72-M', 20, 0.00),
(216, 72, 1, 3, 'SKU-72-L', 15, 0.00),
(217, 73, 1, 1, 'SKU-73-S', 12, 0.00),
(218, 73, 1, 2, 'SKU-73-M', 20, 0.00),
(219, 73, 1, 3, 'SKU-73-L', 15, 0.00),
(220, 74, 1, 1, 'SKU-74-S', 12, 0.00),
(221, 74, 1, 2, 'SKU-74-M', 20, 0.00),
(222, 74, 1, 3, 'SKU-74-L', 15, 0.00),
(223, 75, 1, 1, 'SKU-75-S', 12, 0.00),
(224, 75, 1, 2, 'SKU-75-M', 20, 0.00),
(225, 75, 1, 3, 'SKU-75-L', 15, 0.00),
(226, 76, 1, 1, 'SKU-76-S', 12, 0.00),
(227, 76, 1, 2, 'SKU-76-M', 20, 0.00),
(228, 76, 1, 3, 'SKU-76-L', 15, 0.00),
(229, 77, 1, 1, 'SKU-77-S', 12, 0.00),
(230, 77, 1, 2, 'SKU-77-M', 20, 0.00),
(231, 77, 1, 3, 'SKU-77-L', 15, 0.00),
(232, 78, 1, 1, 'SKU-78-S', 12, 0.00),
(233, 78, 1, 2, 'SKU-78-M', 20, 0.00),
(234, 78, 1, 3, 'SKU-78-L', 15, 0.00),
(235, 79, 1, 1, 'SKU-79-S', 12, 0.00),
(236, 79, 1, 2, 'SKU-79-M', 20, 0.00),
(237, 79, 1, 3, 'SKU-79-L', 15, 0.00),
(238, 80, 1, 1, 'SKU-80-S', 12, 0.00),
(239, 80, 1, 2, 'SKU-80-M', 20, 0.00),
(240, 80, 1, 3, 'SKU-80-L', 15, 0.00),
(241, 81, 1, 1, 'SKU-81-S', 12, 0.00),
(242, 81, 1, 2, 'SKU-81-M', 20, 0.00),
(243, 81, 1, 3, 'SKU-81-L', 15, 0.00),
(244, 82, 1, 1, 'SKU-82-S', 12, 0.00),
(245, 82, 1, 2, 'SKU-82-M', 20, 0.00),
(246, 82, 1, 3, 'SKU-82-L', 15, 0.00),
(247, 83, 1, 1, 'SKU-83-S', 12, 0.00),
(248, 83, 1, 2, 'SKU-83-M', 20, 0.00),
(249, 83, 1, 3, 'SKU-83-L', 15, 0.00),
(250, 84, 1, 1, 'SKU-84-S', 12, 0.00),
(251, 84, 1, 2, 'SKU-84-M', 20, 0.00),
(252, 84, 1, 3, 'SKU-84-L', 15, 0.00),
(253, 85, 1, 1, 'SKU-85-S', 12, 0.00),
(254, 85, 1, 2, 'SKU-85-M', 20, 0.00),
(255, 85, 1, 3, 'SKU-85-L', 15, 0.00),
(256, 86, 1, 1, 'SKU-86-S', 12, 0.00),
(257, 86, 1, 2, 'SKU-86-M', 20, 0.00),
(258, 86, 1, 3, 'SKU-86-L', 15, 0.00),
(259, 87, 1, 1, 'SKU-87-S', 12, 0.00),
(260, 87, 1, 2, 'SKU-87-M', 20, 0.00),
(261, 87, 1, 3, 'SKU-87-L', 15, 0.00),
(262, 88, 1, 1, 'SKU-88-S', 12, 0.00),
(263, 88, 1, 2, 'SKU-88-M', 20, 0.00),
(264, 88, 1, 3, 'SKU-88-L', 15, 0.00),
(265, 89, 1, 1, 'SKU-89-S', 12, 0.00),
(266, 89, 1, 2, 'SKU-89-M', 20, 0.00),
(267, 89, 1, 3, 'SKU-89-L', 15, 0.00),
(268, 90, 1, 1, 'SKU-90-S', 12, 0.00),
(269, 90, 1, 2, 'SKU-90-M', 20, 0.00),
(270, 90, 1, 3, 'SKU-90-L', 15, 0.00),
(271, 91, 1, 1, 'SKU-91-S', 12, 0.00),
(272, 91, 1, 2, 'SKU-91-M', 20, 0.00),
(273, 91, 1, 3, 'SKU-91-L', 15, 0.00),
(274, 92, 1, 1, 'SKU-92-S', 12, 0.00),
(275, 92, 1, 2, 'SKU-92-M', 20, 0.00),
(276, 92, 1, 3, 'SKU-92-L', 15, 0.00),
(277, 93, 1, 1, 'SKU-93-S', 12, 0.00),
(278, 93, 1, 2, 'SKU-93-M', 20, 0.00),
(279, 93, 1, 3, 'SKU-93-L', 15, 0.00),
(280, 94, 1, 1, 'SKU-94-S', 12, 0.00),
(281, 94, 1, 2, 'SKU-94-M', 20, 0.00),
(282, 94, 1, 3, 'SKU-94-L', 15, 0.00),
(283, 95, 1, 1, 'SKU-95-S', 12, 0.00),
(284, 95, 1, 2, 'SKU-95-M', 20, 0.00),
(285, 95, 1, 3, 'SKU-95-L', 15, 0.00),
(286, 96, 1, 1, 'SKU-96-S', 12, 0.00),
(287, 96, 1, 2, 'SKU-96-M', 20, 0.00),
(288, 96, 1, 3, 'SKU-96-L', 15, 0.00),
(289, 97, 1, 1, 'SKU-97-S', 12, 0.00),
(290, 97, 1, 2, 'SKU-97-M', 20, 0.00),
(291, 97, 1, 3, 'SKU-97-L', 15, 0.00),
(292, 98, 1, 1, 'SKU-98-S', 12, 0.00),
(293, 98, 1, 2, 'SKU-98-M', 20, 0.00),
(294, 98, 1, 3, 'SKU-98-L', 15, 0.00),
(295, 99, 1, 1, 'SKU-99-S', 12, 0.00),
(296, 99, 1, 2, 'SKU-99-M', 20, 0.00),
(297, 99, 1, 3, 'SKU-99-L', 15, 0.00),
(298, 100, 1, 1, 'SKU-100-S', 12, 0.00),
(299, 100, 1, 2, 'SKU-100-M', 19, 0.00),
(300, 100, 1, 3, 'SKU-100-L', 15, 0.00),
(301, 101, 1, 1, 'SKU-101-S', 12, 0.00),
(302, 101, 1, 2, 'SKU-101-M', 20, 0.00),
(303, 101, 1, 3, 'SKU-101-L', 15, 0.00),
(304, 102, 1, 1, 'SKU-102-S', 12, 0.00),
(305, 102, 1, 2, 'SKU-102-M', 20, 0.00),
(306, 102, 1, 3, 'SKU-102-L', 15, 0.00),
(307, 103, 1, 1, 'SKU-103-S', 12, 0.00),
(308, 103, 1, 2, 'SKU-103-M', 20, 0.00),
(309, 103, 1, 3, 'SKU-103-L', 15, 0.00),
(310, 104, 1, 1, 'SKU-104-S', 12, 0.00),
(311, 104, 1, 2, 'SKU-104-M', 20, 0.00),
(312, 104, 1, 3, 'SKU-104-L', 15, 0.00),
(313, 105, 1, 1, 'SKU-105-S', 12, 0.00),
(314, 105, 1, 2, 'SKU-105-M', 20, 0.00),
(315, 105, 1, 3, 'SKU-105-L', 15, 0.00),
(316, 106, 1, 1, 'SKU-106-S', 12, 0.00),
(317, 106, 1, 2, 'SKU-106-M', 20, 0.00),
(318, 106, 1, 3, 'SKU-106-L', 15, 0.00),
(319, 107, 1, 1, 'SKU-107-S', 12, 0.00),
(320, 107, 1, 2, 'SKU-107-M', 20, 0.00),
(321, 107, 1, 3, 'SKU-107-L', 15, 0.00),
(322, 108, 1, 1, 'SKU-108-S', 12, 0.00),
(323, 108, 1, 2, 'SKU-108-M', 20, 0.00),
(324, 108, 1, 3, 'SKU-108-L', 15, 0.00),
(325, 109, 1, 1, 'SKU-109-S', 12, 0.00),
(326, 109, 1, 2, 'SKU-109-M', 20, 0.00),
(327, 109, 1, 3, 'SKU-109-L', 15, 0.00),
(328, 110, 1, 1, 'SKU-110-S', 12, 0.00),
(329, 110, 1, 2, 'SKU-110-M', 20, 0.00),
(330, 110, 1, 3, 'SKU-110-L', 15, 0.00),
(331, 111, 1, 1, 'SKU-111-S', 12, 0.00),
(332, 111, 1, 2, 'SKU-111-M', 20, 0.00),
(333, 111, 1, 3, 'SKU-111-L', 15, 0.00),
(334, 112, 1, 1, 'SKU-112-S', 12, 0.00),
(335, 112, 1, 2, 'SKU-112-M', 20, 0.00),
(336, 112, 1, 3, 'SKU-112-L', 15, 0.00),
(337, 113, 1, 1, 'SKU-113-S', 12, 0.00),
(338, 113, 1, 2, 'SKU-113-M', 20, 0.00),
(339, 113, 1, 3, 'SKU-113-L', 15, 0.00),
(340, 114, 1, 1, 'SKU-114-S', 12, 0.00),
(341, 114, 1, 2, 'SKU-114-M', 20, 0.00),
(342, 114, 1, 3, 'SKU-114-L', 15, 0.00),
(343, 115, 1, 1, 'SKU-115-S', 12, 0.00),
(344, 115, 1, 2, 'SKU-115-M', 20, 0.00),
(345, 115, 1, 3, 'SKU-115-L', 15, 0.00),
(346, 116, 1, 1, 'SKU-116-S', 12, 0.00),
(347, 116, 1, 2, 'SKU-116-M', 20, 0.00),
(348, 116, 1, 3, 'SKU-116-L', 15, 0.00),
(349, 117, 1, 1, 'SKU-117-S', 12, 0.00),
(350, 117, 1, 2, 'SKU-117-M', 20, 0.00),
(351, 117, 1, 3, 'SKU-117-L', 15, 0.00),
(352, 118, 1, 1, 'SKU-118-S', 12, 0.00),
(353, 118, 1, 2, 'SKU-118-M', 20, 0.00),
(354, 118, 1, 3, 'SKU-118-L', 15, 0.00),
(355, 119, 1, 1, 'SKU-119-S', 12, 0.00),
(356, 119, 1, 2, 'SKU-119-M', 20, 0.00),
(357, 119, 1, 3, 'SKU-119-L', 15, 0.00),
(358, 120, 1, 1, 'SKU-120-S', 12, 0.00),
(359, 120, 1, 2, 'SKU-120-M', 20, 0.00),
(360, 120, 1, 3, 'SKU-120-L', 15, 0.00),
(361, 121, 1, 1, 'SKU-121-S', 12, 0.00),
(362, 121, 1, 2, 'SKU-121-M', 20, 0.00),
(363, 121, 1, 3, 'SKU-121-L', 15, 0.00),
(364, 122, 1, 1, 'SKU-122-S', 12, 0.00),
(365, 122, 1, 2, 'SKU-122-M', 20, 0.00),
(366, 122, 1, 3, 'SKU-122-L', 15, 0.00),
(367, 123, 1, 1, 'SKU-123-S', 12, 0.00),
(368, 123, 1, 2, 'SKU-123-M', 20, 0.00),
(369, 123, 1, 3, 'SKU-123-L', 15, 0.00),
(370, 124, 1, 1, 'SKU-124-S', 12, 0.00),
(371, 124, 1, 2, 'SKU-124-M', 20, 0.00),
(372, 124, 1, 3, 'SKU-124-L', 15, 0.00),
(373, 125, 1, 1, 'SKU-125-S', 12, 0.00),
(374, 125, 1, 2, 'SKU-125-M', 20, 0.00),
(375, 125, 1, 3, 'SKU-125-L', 15, 0.00),
(376, 126, 1, 1, 'SKU-126-S', 12, 0.00),
(377, 126, 1, 2, 'SKU-126-M', 20, 0.00),
(378, 126, 1, 3, 'SKU-126-L', 15, 0.00),
(379, 127, 1, 1, 'SKU-127-S', 12, 0.00),
(380, 127, 1, 2, 'SKU-127-M', 20, 0.00),
(381, 127, 1, 3, 'SKU-127-L', 15, 0.00),
(382, 128, 1, 1, 'SKU-128-S', 12, 0.00),
(383, 128, 1, 2, 'SKU-128-M', 20, 0.00),
(384, 128, 1, 3, 'SKU-128-L', 15, 0.00),
(385, 129, 1, 1, 'SKU-129-S', 12, 0.00),
(386, 129, 1, 2, 'SKU-129-M', 20, 0.00),
(387, 129, 1, 3, 'SKU-129-L', 15, 0.00),
(388, 130, 1, 1, 'SKU-130-S', 12, 0.00),
(389, 130, 1, 2, 'SKU-130-M', 20, 0.00),
(390, 130, 1, 3, 'SKU-130-L', 15, 0.00),
(391, 131, 1, 1, 'SKU-131-S', 12, 0.00),
(392, 131, 1, 2, 'SKU-131-M', 20, 0.00),
(393, 131, 1, 3, 'SKU-131-L', 15, 0.00),
(394, 132, 1, 1, 'SKU-132-S', 12, 0.00),
(395, 132, 1, 2, 'SKU-132-M', 20, 0.00),
(396, 132, 1, 3, 'SKU-132-L', 15, 0.00),
(397, 133, 1, 1, 'SKU-133-S', 12, 0.00),
(398, 133, 1, 2, 'SKU-133-M', 20, 0.00),
(399, 133, 1, 3, 'SKU-133-L', 15, 0.00),
(400, 134, 1, 1, 'SKU-134-S', 12, 0.00),
(401, 134, 1, 2, 'SKU-134-M', 20, 0.00),
(402, 134, 1, 3, 'SKU-134-L', 15, 0.00),
(403, 135, 1, 1, 'SKU-135-S', 12, 0.00),
(404, 135, 1, 2, 'SKU-135-M', 20, 0.00),
(405, 135, 1, 3, 'SKU-135-L', 15, 0.00),
(406, 136, 1, 1, 'SKU-136-S', 12, 0.00),
(407, 136, 1, 2, 'SKU-136-M', 20, 0.00),
(408, 136, 1, 3, 'SKU-136-L', 15, 0.00),
(409, 137, 1, 1, 'SKU-137-S', 12, 0.00),
(410, 137, 1, 2, 'SKU-137-M', 20, 0.00),
(411, 137, 1, 3, 'SKU-137-L', 15, 0.00),
(412, 138, 1, 1, 'SKU-138-S', 12, 0.00),
(413, 138, 1, 2, 'SKU-138-M', 20, 0.00),
(414, 138, 1, 3, 'SKU-138-L', 15, 0.00),
(415, 139, 1, 1, 'SKU-139-S', 12, 0.00),
(416, 139, 1, 2, 'SKU-139-M', 20, 0.00),
(417, 139, 1, 3, 'SKU-139-L', 15, 0.00),
(418, 140, 1, 1, 'SKU-140-S', 12, 0.00),
(419, 140, 1, 2, 'SKU-140-M', 20, 0.00),
(420, 140, 1, 3, 'SKU-140-L', 15, 0.00),
(421, 141, 1, 1, 'SKU-141-S', 12, 0.00),
(422, 141, 1, 2, 'SKU-141-M', 20, 0.00),
(423, 141, 1, 3, 'SKU-141-L', 15, 0.00),
(424, 142, 1, 1, 'SKU-142-S', 12, 0.00),
(425, 142, 1, 2, 'SKU-142-M', 20, 0.00),
(426, 142, 1, 3, 'SKU-142-L', 15, 0.00),
(427, 143, 1, 1, 'SKU-143-S', 12, 0.00),
(428, 143, 1, 2, 'SKU-143-M', 20, 0.00),
(429, 143, 1, 3, 'SKU-143-L', 15, 0.00),
(430, 144, 1, 1, 'SKU-144-S', 12, 0.00),
(431, 144, 1, 2, 'SKU-144-M', 20, 0.00),
(432, 144, 1, 3, 'SKU-144-L', 15, 0.00),
(433, 145, 1, 1, 'SKU-145-S', 12, 0.00),
(434, 145, 1, 2, 'SKU-145-M', 20, 0.00),
(435, 145, 1, 3, 'SKU-145-L', 15, 0.00),
(436, 146, 1, 1, 'SKU-146-S', 12, 0.00),
(437, 146, 1, 2, 'SKU-146-M', 20, 0.00),
(438, 146, 1, 3, 'SKU-146-L', 15, 0.00),
(439, 147, 1, 1, 'SKU-147-S', 12, 0.00),
(440, 147, 1, 2, 'SKU-147-M', 20, 0.00),
(441, 147, 1, 3, 'SKU-147-L', 15, 0.00),
(442, 148, 1, 1, 'SKU-148-S', 12, 0.00),
(443, 148, 1, 2, 'SKU-148-M', 20, 0.00),
(444, 148, 1, 3, 'SKU-148-L', 15, 0.00),
(445, 149, 1, 1, 'SKU-149-S', 12, 0.00),
(446, 149, 1, 2, 'SKU-149-M', 20, 0.00),
(447, 149, 1, 3, 'SKU-149-L', 15, 0.00),
(448, 150, 1, 1, 'SKU-150-S', 12, 0.00),
(449, 150, 1, 2, 'SKU-150-M', 20, 0.00),
(450, 150, 1, 3, 'SKU-150-L', 15, 0.00),
(451, 151, 1, 1, 'SKU-151-S', 12, 0.00),
(452, 151, 1, 2, 'SKU-151-M', 20, 0.00),
(453, 151, 1, 3, 'SKU-151-L', 15, 0.00),
(454, 152, 1, 1, 'SKU-152-S', 12, 0.00),
(455, 152, 1, 2, 'SKU-152-M', 20, 0.00),
(456, 152, 1, 3, 'SKU-152-L', 15, 0.00),
(457, 153, 1, 1, 'SKU-153-S', 12, 0.00),
(458, 153, 1, 2, 'SKU-153-M', 20, 0.00),
(459, 153, 1, 3, 'SKU-153-L', 15, 0.00),
(460, 154, 1, 1, 'SKU-154-S', 12, 0.00),
(461, 154, 1, 2, 'SKU-154-M', 20, 0.00),
(462, 154, 1, 3, 'SKU-154-L', 15, 0.00),
(463, 155, 1, 1, 'SKU-155-S', 12, 0.00),
(464, 155, 1, 2, 'SKU-155-M', 20, 0.00),
(465, 155, 1, 3, 'SKU-155-L', 15, 0.00),
(466, 156, 1, 1, 'SKU-156-S', 12, 0.00),
(467, 156, 1, 2, 'SKU-156-M', 20, 0.00),
(468, 156, 1, 3, 'SKU-156-L', 15, 0.00),
(469, 157, 1, 1, 'SKU-157-S', 12, 0.00),
(470, 157, 1, 2, 'SKU-157-M', 20, 0.00),
(471, 157, 1, 3, 'SKU-157-L', 15, 0.00),
(472, 158, 1, 1, 'SKU-158-S', 12, 0.00),
(473, 158, 1, 2, 'SKU-158-M', 20, 0.00),
(474, 158, 1, 3, 'SKU-158-L', 15, 0.00),
(475, 159, 1, 1, 'SKU-159-S', 12, 0.00),
(476, 159, 1, 2, 'SKU-159-M', 20, 0.00),
(477, 159, 1, 3, 'SKU-159-L', 15, 0.00),
(478, 160, 1, 1, 'SKU-160-S', 12, 0.00),
(479, 160, 1, 2, 'SKU-160-M', 20, 0.00),
(480, 160, 1, 3, 'SKU-160-L', 15, 0.00),
(481, 161, 1, 1, 'SKU-161-S', 12, 0.00),
(482, 161, 1, 2, 'SKU-161-M', 20, 0.00),
(483, 161, 1, 3, 'SKU-161-L', 15, 0.00),
(484, 162, 1, 1, 'SKU-162-S', 12, 0.00),
(485, 162, 1, 2, 'SKU-162-M', 20, 0.00),
(486, 162, 1, 3, 'SKU-162-L', 15, 0.00),
(487, 163, 1, 1, 'SKU-163-S', 12, 0.00),
(488, 163, 1, 2, 'SKU-163-M', 20, 0.00),
(489, 163, 1, 3, 'SKU-163-L', 15, 0.00),
(490, 164, 1, 1, 'SKU-164-S', 12, 0.00),
(491, 164, 1, 2, 'SKU-164-M', 20, 0.00),
(492, 164, 1, 3, 'SKU-164-L', 15, 0.00),
(493, 165, 1, 1, 'SKU-165-S', 12, 0.00),
(494, 165, 1, 2, 'SKU-165-M', 20, 0.00),
(495, 165, 1, 3, 'SKU-165-L', 15, 0.00),
(496, 166, 1, 1, 'SKU-166-S', 12, 0.00),
(497, 166, 1, 2, 'SKU-166-M', 20, 0.00),
(498, 166, 1, 3, 'SKU-166-L', 15, 0.00),
(499, 167, 1, 1, 'SKU-167-S', 12, 0.00),
(500, 167, 1, 2, 'SKU-167-M', 20, 0.00),
(501, 167, 1, 3, 'SKU-167-L', 15, 0.00),
(502, 168, 1, 1, 'SKU-168-S', 12, 0.00),
(503, 168, 1, 2, 'SKU-168-M', 20, 0.00),
(504, 168, 1, 3, 'SKU-168-L', 15, 0.00),
(505, 169, 1, 1, 'SKU-169-S', 12, 0.00),
(506, 169, 1, 2, 'SKU-169-M', 20, 0.00),
(507, 169, 1, 3, 'SKU-169-L', 15, 0.00),
(508, 170, 1, 1, 'SKU-170-S', 12, 0.00),
(509, 170, 1, 2, 'SKU-170-M', 20, 0.00),
(510, 170, 1, 3, 'SKU-170-L', 15, 0.00),
(511, 171, 1, 1, 'SKU-171-S', 12, 0.00),
(512, 171, 1, 2, 'SKU-171-M', 20, 0.00),
(513, 171, 1, 3, 'SKU-171-L', 15, 0.00),
(514, 172, 1, 1, 'SKU-172-S', 12, 0.00),
(515, 172, 1, 2, 'SKU-172-M', 20, 0.00),
(516, 172, 1, 3, 'SKU-172-L', 15, 0.00),
(517, 173, 1, 1, 'SKU-173-S', 12, 0.00),
(518, 173, 1, 2, 'SKU-173-M', 20, 0.00),
(519, 173, 1, 3, 'SKU-173-L', 15, 0.00),
(520, 174, 1, 1, 'SKU-174-S', 12, 0.00),
(521, 174, 1, 2, 'SKU-174-M', 20, 0.00),
(522, 174, 1, 3, 'SKU-174-L', 15, 0.00),
(523, 175, 1, 1, 'SKU-175-S', 12, 0.00),
(524, 175, 1, 2, 'SKU-175-M', 20, 0.00),
(525, 175, 1, 3, 'SKU-175-L', 15, 0.00),
(526, 176, 1, 1, 'SKU-176-S', 12, 0.00),
(527, 176, 1, 2, 'SKU-176-M', 20, 0.00),
(528, 176, 1, 3, 'SKU-176-L', 15, 0.00),
(529, 177, 1, 1, 'SKU-177-S', 12, 0.00),
(530, 177, 1, 2, 'SKU-177-M', 20, 0.00),
(531, 177, 1, 3, 'SKU-177-L', 15, 0.00),
(532, 178, 1, 1, 'SKU-178-S', 12, 0.00),
(533, 178, 1, 2, 'SKU-178-M', 20, 0.00),
(534, 178, 1, 3, 'SKU-178-L', 15, 0.00),
(535, 179, 1, 1, 'SKU-179-S', 12, 0.00),
(536, 179, 1, 2, 'SKU-179-M', 20, 0.00),
(537, 179, 1, 3, 'SKU-179-L', 15, 0.00),
(538, 180, 1, 1, 'SKU-180-S', 12, 0.00),
(539, 180, 1, 2, 'SKU-180-M', 20, 0.00),
(540, 180, 1, 3, 'SKU-180-L', 15, 0.00),
(541, 181, 1, 1, 'SKU-181-S', 12, 0.00),
(542, 181, 1, 2, 'SKU-181-M', 20, 0.00),
(543, 181, 1, 3, 'SKU-181-L', 15, 0.00),
(544, 182, 1, 1, 'SKU-182-S', 12, 0.00),
(545, 182, 1, 2, 'SKU-182-M', 20, 0.00),
(546, 182, 1, 3, 'SKU-182-L', 15, 0.00),
(547, 183, 1, 1, 'SKU-183-S', 12, 0.00),
(548, 183, 1, 2, 'SKU-183-M', 20, 0.00),
(549, 183, 1, 3, 'SKU-183-L', 15, 0.00),
(550, 184, 1, 1, 'SKU-184-S', 12, 0.00),
(551, 184, 1, 2, 'SKU-184-M', 20, 0.00),
(552, 184, 1, 3, 'SKU-184-L', 15, 0.00),
(553, 185, 1, 1, 'SKU-185-S', 12, 0.00),
(554, 185, 1, 2, 'SKU-185-M', 20, 0.00),
(555, 185, 1, 3, 'SKU-185-L', 15, 0.00),
(556, 186, 1, 1, 'SKU-186-S', 12, 0.00),
(557, 186, 1, 2, 'SKU-186-M', 20, 0.00),
(558, 186, 1, 3, 'SKU-186-L', 15, 0.00),
(559, 187, 1, 1, 'SKU-187-S', 12, 0.00),
(560, 187, 1, 2, 'SKU-187-M', 20, 0.00),
(561, 187, 1, 3, 'SKU-187-L', 15, 0.00),
(562, 188, 1, 1, 'SKU-188-S', 12, 0.00),
(563, 188, 1, 2, 'SKU-188-M', 20, 0.00),
(564, 188, 1, 3, 'SKU-188-L', 15, 0.00),
(565, 189, 1, 1, 'SKU-189-S', 12, 0.00),
(566, 189, 1, 2, 'SKU-189-M', 20, 0.00),
(567, 189, 1, 3, 'SKU-189-L', 15, 0.00),
(568, 190, 1, 1, 'SKU-190-S', 12, 0.00),
(569, 190, 1, 2, 'SKU-190-M', 20, 0.00),
(570, 190, 1, 3, 'SKU-190-L', 15, 0.00),
(571, 191, 1, 1, 'SKU-191-S', 12, 0.00),
(572, 191, 1, 2, 'SKU-191-M', 20, 0.00),
(573, 191, 1, 3, 'SKU-191-L', 15, 0.00),
(574, 192, 1, 1, 'SKU-192-S', 12, 0.00),
(575, 192, 1, 2, 'SKU-192-M', 20, 0.00),
(576, 192, 1, 3, 'SKU-192-L', 15, 0.00),
(577, 193, 1, 1, 'SKU-193-S', 12, 0.00),
(578, 193, 1, 2, 'SKU-193-M', 20, 0.00),
(579, 193, 1, 3, 'SKU-193-L', 15, 0.00),
(580, 194, 1, 1, 'SKU-194-S', 12, 0.00),
(581, 194, 1, 2, 'SKU-194-M', 20, 0.00),
(582, 194, 1, 3, 'SKU-194-L', 15, 0.00),
(583, 195, 1, 1, 'SKU-195-S', 12, 0.00),
(584, 195, 1, 2, 'SKU-195-M', 20, 0.00),
(585, 195, 1, 3, 'SKU-195-L', 15, 0.00),
(586, 196, 1, 1, 'SKU-196-S', 12, 0.00),
(587, 196, 1, 2, 'SKU-196-M', 20, 0.00),
(588, 196, 1, 3, 'SKU-196-L', 15, 0.00),
(589, 197, 1, 1, 'SKU-197-S', 12, 0.00),
(590, 197, 1, 2, 'SKU-197-M', 20, 0.00),
(591, 197, 1, 3, 'SKU-197-L', 15, 0.00),
(592, 198, 1, 1, 'SKU-198-S', 12, 0.00),
(593, 198, 1, 2, 'SKU-198-M', 20, 0.00),
(594, 198, 1, 3, 'SKU-198-L', 15, 0.00),
(595, 199, 1, 1, 'SKU-199-S', 12, 0.00),
(596, 199, 1, 2, 'SKU-199-M', 20, 0.00),
(597, 199, 1, 3, 'SKU-199-L', 15, 0.00),
(598, 200, 1, 1, 'SKU-200-S', 12, 0.00),
(599, 200, 1, 2, 'SKU-200-M', 20, 0.00),
(600, 200, 1, 3, 'SKU-200-L', 15, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `promo_coupons`
--

CREATE TABLE `promo_coupons` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount_percentage` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promo_coupons`
--

INSERT INTO `promo_coupons` (`id`, `code`, `discount_percentage`, `is_active`, `created_at`) VALUES
(1, 'VIP20', 20, 1, '2026-09-26 14:37:10'),
(2, 'STUDIO10', 10, 1, '2026-09-26 14:37:10');

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, 'XS'),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_products_category` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_product` (`product_id`),
  ADD KEY `fk_images_color` (`color_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_variants_product` (`product_id`),
  ADD KEY `fk_variants_color` (`color_id`),
  ADD KEY `fk_variants_size` (`size_id`);

--
-- Indexes for table `promo_coupons`
--
ALTER TABLE `promo_coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=601;

--
-- AUTO_INCREMENT for table `promo_coupons`
--
ALTER TABLE `promo_coupons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_images_color` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `fk_variants_color` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_variants_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_variants_size` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
