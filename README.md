# REST Client Assignment (React + Express + MikroORM)

## ✨ Features
- Send HTTP requests (GET, POST, PUT, DELETE)
- Display response without page reload
- Save and paginate request history using MikroORM (SQLite)
- Simple, clean interface (Postman-style)

## 🛠️ Tech Stack
- React (frontend)
- Express + MikroORM (backend)
- SQLite (DB)

## 🚀 How to Run

### Backend:
```bash
cd backend
npm install
npx mikro-orm migration:create
npx mikro-orm migration:up
npx ts-node src/index.ts
