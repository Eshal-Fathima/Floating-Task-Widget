-- ============================================
-- Folders Migration — run once on your DB
-- ============================================

USE floating_widget;

-- 1. Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  color      VARCHAR(7)   NOT NULL DEFAULT '#FFAD0D',
  created_at DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add folder_id to existing tasks table
ALTER TABLE tasks
  ADD COLUMN folder_id INT NULL,
  ADD CONSTRAINT fk_task_folder
    FOREIGN KEY (folder_id) REFERENCES folders(id)
    ON DELETE SET NULL;

-- 3. Seed a default General folder
INSERT INTO folders (name, color) VALUES ('General', '#FFAD0D');