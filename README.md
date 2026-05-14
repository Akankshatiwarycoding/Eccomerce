# 🛒 MERN Ecommerce Platform

A full-stack Ecommerce web application built using the MERN Stack and fully dockerized using Docker & Docker Compose.

---

# 🚀 Features

- User Authentication & Authorization
- Product Management
- Add to Cart
- Order Placement
- Responsive UI
- MongoDB Integration
- REST API
- Dockerized Frontend & Backend
- Docker Compose Setup

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## DevOps
- Docker
- Docker Compose

---

# 📁 Project Structure

```bash
Ecommerce/
│
├── frontend/
│   ├── Dockerfile
│
├── backend/
│   ├── Dockerfile
│
├── docker-compose.yml
├── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
cd Ecommerce
```

---

# 🐳 Run With Docker

## Build & Start Containers

```bash
docker-compose up --build
```

---

# 🌐 Application Ports

| Service | Port |
|----------|------|
| Frontend | 5173 |
| Backend | 5001 |
| MongoDB | 27017 |

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=mongodb://mongodb:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=5001
```

---

# ▶️ Start Project

```bash
docker-compose up
```

Frontend URL:
```bash
http://localhost:5173
```

Backend URL:
```bash
http://localhost:5001
```

---

# 🐋 Docker Hub Images

Frontend Image:
```bash
YOUR_DOCKERHUB_USERNAME/ec-front
```

Backend Image:
```bash
YOUR_DOCKERHUB_USERNAME/ec-back
```

---

# 📸 Screenshots

Add your project screenshots here.

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# 📌 Future Improvements

- Payment Gateway Integration
- Wishlist Feature
- Product Reviews
- Order Tracking
- Admin Dashboard
- Kubernetes Deployment
- CI/CD Pipeline

---

# 👩‍💻 Author

## :contentReference[oaicite:0]{index=0}

- Full Stack Developer (MERN)
- Backend Developer
  
- Docker & DevOps Enthusiast

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

# 📄 License

This project is open-source and available for learning purposes.
