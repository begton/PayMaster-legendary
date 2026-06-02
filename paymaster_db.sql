-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2026 at 05:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paymaster_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_code` varchar(20) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_code`, `department_name`, `created_at`) VALUES
(1, 'HR', 'Human Resources', '2026-06-02 14:58:51'),
(2, 'SALES', 'Sales Department', '2026-06-02 14:58:51'),
(3, 'IT', 'Information Technology', '2026-06-02 14:58:51'),
(4, 'FIN', 'Finance Department', '2026-06-02 14:58:51'),
(5, 'OPS', 'Operations Department', '2026-06-02 14:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_number` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `hired_date` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_number`, `first_name`, `last_name`, `address`, `position`, `telephone`, `gender`, `hired_date`, `department_id`, `created_at`) VALUES
(1, 'EMP001', 'Jean', 'Mutesa', 'Kigali, Rwanda', 'HR Manager', '+250788123456', 'Male', '2020-01-15', 1, '2026-06-02 14:58:51'),
(2, 'EMP002', 'Marie', 'Niyigena', 'Kigali, Rwanda', 'Sales Executive', '+250788123457', 'Female', '2020-03-20', 2, '2026-06-02 14:58:51'),
(3, 'EMP003', 'Patrick', 'Kubwimana', 'Rubavu, Rwanda', 'IT Developer', '+250788123458', 'Male', '2021-06-10', 3, '2026-06-02 14:58:51'),
(4, 'EMP004', 'Yvonne', 'Nuwamahoro', 'Kigali, Rwanda', 'Finance Officer', '+250788123459', 'Female', '2020-05-01', 4, '2026-06-02 14:58:51'),
(5, 'EMP005', 'Denis', 'Kaneza', 'Rubavu, Rwanda', 'Operations Manager', '+250788123460', 'Male', '2019-11-15', 5, '2026-06-02 14:58:51'),
(6, 'EMP006', 'Claire', 'Habimana', 'Kigali, Rwanda', 'Sales Executive', '+250788123461', 'Female', '2021-02-28', 2, '2026-06-02 14:58:51'),
(7, 'EMP007', 'Ibrahim', 'Kamanzi', 'Rubavu, Rwanda', 'IT Support', '+250788123462', 'Male', '2021-09-01', 3, '2026-06-02 14:58:51'),
(8, 'EMP008', 'Theresa', 'Mugisha', 'Kigali, Rwanda', 'HR Assistant', '+250788123463', 'Female', '2022-01-10', 1, '2026-06-02 14:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `salary_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `gross_salary` decimal(10,2) NOT NULL,
  `total_deduction` decimal(10,2) NOT NULL,
  `net_salary` decimal(10,2) NOT NULL,
  `payment_month` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`salary_id`, `employee_id`, `gross_salary`, `total_deduction`, `net_salary`, `payment_month`, `created_at`) VALUES
(1, 1, 800000.00, 150000.00, 650000.00, '2024-06-01', '2026-06-02 14:58:51'),
(2, 2, 600000.00, 100000.00, 500000.00, '2024-06-01', '2026-06-02 14:58:51'),
(3, 3, 700000.00, 120000.00, 580000.00, '2024-06-01', '2026-06-02 14:58:51'),
(4, 4, 650000.00, 110000.00, 540000.00, '2024-06-01', '2026-06-02 14:58:51'),
(5, 5, 900000.00, 160000.00, 740000.00, '2024-06-01', '2026-06-02 14:58:51'),
(6, 6, 600000.00, 100000.00, 500000.00, '2024-06-01', '2026-06-02 14:58:51'),
(7, 7, 550000.00, 95000.00, 455000.00, '2024-06-01', '2026-06-02 14:58:51'),
(8, 8, 500000.00, 85000.00, 415000.00, '2024-06-01', '2026-06-02 14:58:51'),
(9, 1, 800000.00, 150000.00, 650000.00, '2024-05-01', '2026-06-02 14:58:51'),
(10, 2, 600000.00, 100000.00, 500000.00, '2024-05-01', '2026-06-02 14:58:51'),
(11, 3, 700000.00, 120000.00, 580000.00, '2024-05-01', '2026-06-02 14:58:51'),
(12, 4, 650000.00, 110000.00, 540000.00, '2024-05-01', '2026-06-02 14:58:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin', '$2b$10$sLP2pw3Nqsxsyx3v9AfEFerR6DxRE3o100v/i99t1geFvFiIHx2dW', '2026-06-02 14:58:51'),
(2, 'hr_user', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm$2b$10$sLP2pw3Nqsxsyx3v9AfEFerR6DxRE3o100v/i99t1geFvFiIHx2dW', '2026-06-02 14:58:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_code` (`department_code`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_number` (`employee_number`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`salary_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `salary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
