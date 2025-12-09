# 🏨 Kusum Airport Hotel — Hotel Booking System

A full-stack **hotel booking system** for **Kusum Airport Hotel**, designed to provide customers with a seamless and modern online booking experience. The system enables users to search, view, and book hotel rooms, make secure payments via **Stripe**, and allows administrators to manage rooms, bookings, and users efficiently.

Built using the **MERN stack (MongoDB, Express, React, Node.js)** with advanced libraries like **TanStack React Query**, **React Hook Form**, and **Zod** for state management, form validation, and performance optimization.

---

## 🚀 Features

### 🧑‍💻 User Features

* View hotel rooms, availability, and prices.
* Filter rooms by type, capacity, and price range.
* Book rooms securely using **Stripe payment integration**.
* Manage bookings and view booking history.
* Responsive, mobile-friendly UI with a smooth user experience.

### 🔐 Admin Features

* Add, update, and delete rooms.
* View and manage all bookings and users.
* Dashboard for hotel performance insights.
* Manage images and room availability dynamically.

---

## 🛠️ Tech Stack

| Layer                                | Technology Used             | Description                                                |
| ------------------------------------ | --------------------------- | ---------------------------------------------------------- |
| **Frontend**                         | React.js, Vite, TailwindCSS | Fast, modern UI built with Tailwind for responsive design. |
| **State Management / Data Fetching** | TanStack React Query        | Efficient server state management and caching.             |
| **Forms & Validation**               | React Hook Form + Zod       | Powerful form handling and schema validation.              |
| **Backend**                          | Node.js + Express.js        | RESTful API to manage rooms, bookings, and authentication. |
| **Database**                         | MongoDB (Mongoose ORM)      | Scalable NoSQL database for user and booking data.         |
| **Authentication**                   | JWT (JSON Web Token)        | Secure user login and route protection.                    |
| **Payments**                         | Stripe API                  | Secure online payment processing for bookings.             |

---

## ⚙️ Installation and Setup

### 🔧 Prerequisites

Ensure you have installed:

* Node.js (v18 or higher)
* MongoDB
* Stripe account (for payments)
* npm or yarn

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/God-yash12/hotel_kusum_airport.git
cd hotel_kusum_airport
```

---

### 2️⃣ Setup Environment Variables

Create a `.env` file in the **root directory of both frontend and backend** with the following keys:

#### 🗂️ Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

#### 💻 Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

### 3️⃣ Install Dependencies

#### Install backend dependencies

```bash
cd backend
npm install
```

#### Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

### 4️⃣ Run the Project

#### Start backend server

```bash
cd backend
npm run dev
```

#### Start frontend server

```bash
cd frontend
npm run dev
```

Frontend will run at 🔘 **[http://localhost:5173](http://localhost:5173)**
Backend will run at 🔘 **[http://localhost:5000](http://localhost:5000)**

---

## 📦 Folder Structure

```
KusumAirportHotel/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Database & environment setup
│   │   ├── controllers/   # Logic for routes (Rooms, Users, Bookings)
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
│   │   └── utils/         # Helper functions, middlewares
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main page routes
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # Query hooks using TanStack Query
│   │   ├── context/       # Auth & global context providers
│   │   └── validation/    # Zod schemas for forms
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 💳 Stripe Payment Flow

1. User selects room → chooses dates → proceeds to checkout.
2. Stripe payment form opens for secure card entry.
3. Upon successful payment, the booking is confirmed and stored in MongoDB.
4. Email or dashboard confirmation is sent to the user.

---

## 🔐 Authentication Flow

* **Admin Login ** with JWT-based authentication.
* Tokens stored securely in HTTP-only cookies.
* Protected routes for both user and admin dashboards.

---

## 📈 Performance & Security

* **TanStack Query** for optimized API calls (auto caching, background refetch).
* **Zod** ensures strict runtime validation of user inputs.
* **React Hook Form** minimizes re-renders, improving performance.
* **Helmet**, **CORS**, and **Express-rate-limit** used for backend security.

---


## 🌍 Deployment

You can deploy using any platform:

* **Frontend** → Vercel / Netlify
* **Backend** → Render / Railway / AWS EC2
* **Database** → MongoDB Atlas

Ensure environment variables are configured on the host platform.

---

## 🧠 Future Enhancements

* Add room recommendations using AI or ML.
* Integrate hotel service bookings (spa, taxi, meals).
* Multi-language and currency support.
* Email + SMS booking confirmations.

---

## 💬 Author

**👨‍💻 Developed by:** Gannu
**🏢 Project:** Kusum Airport Hotel Booking System
**🌐 Tech Stack:** MERN + Stripe + TanStack Query + Zod
**🗓 Year:** 2025

