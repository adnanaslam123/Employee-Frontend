# 👨‍💼 Employee Management System - Frontend (React.js)

This is the frontend of the **Employee Management System** built using **React.js** and **Tailwind CSS**. It supports role-based login for Admin and Employees, dashboard views, form validations, password reset via OTP, and integration with a Spring Boot backend.

## 🚀 Features

- 🔐 Login & Signup (with role-based JWT Auth)
- 🧑‍💻 Employee Dashboard
- 🛠️ Admin Dashboard (view, edit, delete employees)
- 📧 Forgot Password via OTP (Email-based)
- 📝 Form validation, password strength indicator
- 🌙 Dark Mode toggle
- 🔥 Google Sign-in via Firebase Auth
- ⚙️ Integration with Spring Boot Backend

## 🧱 Tech Stack

| Tech | Description |
|------|-------------|
| **React.js** | Frontend Library |
| **Tailwind CSS** | Styling |
| **React Router** | Page Navigation |
| **Axios** | API Requests |
| **Firebase** | Google Auth |
| **Toastify** | Notifications |
| **Spring Boot** | Backend (separate repo) |

## 📂 Folder Structure

src/
├── component/ # Reusable components (Login, Signup, Navbar, Dashboards)
├── pages/ # Page views
├── assets/ # Icons, images
├── firebase.jsx # Firebase config
├── main.jsx # Root file
└── App.jsx # App routes


## 🌐 Backend Repository

👉 [Backend GitHub Repo](https://github.com/adnanaslam123/Employee-Backened)

## 📦 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/adnanaslam123/Employee-Frontend.git
cd Employee-Frontend

2. Install dependencies:

npm install
Run the project:

npm run dev
Make sure the backend (Spring Boot) is also running on http://localhost:8080

This project is licensed under the MIT License.
