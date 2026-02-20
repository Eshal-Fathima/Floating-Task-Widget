# 📋 Floating Productivity Widget

A minimal, always-on-top desktop widget for daily task management. Built with **React + Vite + Tauri + MySQL** for permanent data persistence and analytics.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Tech Stack](https://img.shields.io/badge/Vite-6-purple) ![Tech Stack](https://img.shields.io/badge/Tauri-1.x-orange) ![Tech Stack](https://img.shields.io/badge/MySQL-8-blue)

---

## ✨ Features

- **Always-on-top** floating widget (350×500px)
- **Add tasks** with Enter key
- **Complete tasks** with checkbox (auto-calculates duration)
- **Soft-delete** — tasks are archived, never permanently deleted
- **Progress bar** — real-time completed/total ratio
- **Persistent storage** — all data in MySQL, survives app restarts
- **Today's tasks** — only loads current day's tasks on startup
- **Analytics-ready** — every task stored permanently with timestamps

---

## 🧱 Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React 18 + Vite 6   |
| Backend  | Node.js + Express   |
| Database | MySQL               |
| Desktop  | Tauri (optional)    |

---

## 📂 Project Structure

```
├── frontend/
│   ├── components/
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   └── ProgressBar.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── backend/
│   ├── db.js
│   ├── taskController.js
│   ├── routes.js
│   └── server.js
├── src-tauri/
│   └── tauri.conf.json
├── setup.sql
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄 MySQL Setup

### 1. Install MySQL

Make sure MySQL 8.x is installed and running.

### 2. Create database and table

Run the setup script:

```bash
mysql -u root -p < setup.sql
```

Or manually in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS floating_widget
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE floating_widget;

CREATE TABLE IF NOT EXISTS tasks (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  title           VARCHAR(255) NOT NULL,
  category        VARCHAR(100),
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at    DATETIME,
  status          ENUM('pending', 'completed', 'archived') DEFAULT 'pending',
  duration_minutes INT
);
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=floating_widget
DB_PORT=3306
```

---

## 🚀 How to Run Locally

### Install dependencies

```bash
npm install
```

### Start both servers (backend + frontend)

```bash
npm run dev
```

This starts:
- **Backend** → `http://localhost:3001`
- **Frontend** → `http://localhost:5173`

### Run as desktop app (optional, requires Rust + Tauri CLI)

```bash
npm run tauri:dev
```

---

## 🔒 API Endpoints

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | `/api/tasks`               | Fetch today's tasks      |
| POST   | `/api/tasks`               | Add a new task           |
| PUT    | `/api/tasks/:id/complete`  | Mark task as completed   |
| PUT    | `/api/tasks/:id/archive`   | Soft-delete (archive)    |
| GET    | `/api/health`              | Health check             |

---

## 🔐 Security Note

> **⚠️ Never commit your `.env` file.** It contains database credentials. The `.gitignore` is configured to exclude it. Always use `.env.example` as a template for other developers.

---

## 📜 License

MIT
