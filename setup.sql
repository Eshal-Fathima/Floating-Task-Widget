-- ============================================
-- Floating Productivity Widget — Database Setup
-- ============================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS floating_widget
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE floating_widget;

-- 2. Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  title           VARCHAR(255) NOT NULL,
  category        VARCHAR(100),
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at    DATETIME,
  status          ENUM('pending', 'completed', 'archived') DEFAULT 'pending',
  duration_minutes INT
);
