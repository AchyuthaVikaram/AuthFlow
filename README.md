# 🔐 Full Authentication Flow - MERN Stack

## 📖 About the Project

This is a **Full Authentication Flow** project built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It demonstrates a complete authentication system including:

- ✅ User Registration & Login  
- 🔐 Secure JWT-based Authentication  
- 🔒 Protected Routes  
- 💻 Responsive UI  
- 🔁 Logout with session cleanup  

The project simulates a real-world authentication flow with clean UI/UX and secure backend logic — suitable for use in production-ready applications.

---

## 🚀 How to Run the Project Locally

### 🔁 1. Fork & Clone the Repository

```bash
# Step 1: Fork this repository on GitHub
# Step 2: Clone it to your local machine
git clone https://github.com/your-username/full-auth-flow.git
cd full-auth-flow
```

### 2. Set Up the Frontend (React + Vite)
```bash
cd client
npm install         # Install frontend dependencies
npm run dev         # Start the React app
```
Frontend will run at:
📍 http://localhost:5173

### 3. Set Up the Backend (Node.js + Express)
```bash
cd ../server
npm install         # Install backend dependencies
```
Create a .env file inside the server folder:

.env
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Then start the backend:

```bash
npm run dev
```
Backend will run at:
📍 http://localhost:8000

📌 API Endpoints
Method	 Endpoint	         Description
POST	/api/auth/signup	 Register a new user
POST	/api/auth/	       Login existing user
