# AI-Powered Document Version Control System

A modern MERN stack application that combines document version control with semantic change tracking. Users can create documents, save versions, compare changes visually, view version history, and roll back to previous versions with secure role-based access control.

---

## 🚀 Live Demo

**Frontend:** https://doc-version-control-one.vercel.app

**Backend API:** https://doc-version-control-backend.onrender.com

---

## ✨ Features

* JWT Authentication
* Role-Based Access Control (Editor & Viewer)
* Rich Text Editing with TipTap
* Document Version History
* Visual Diff Comparison Between Versions
* Rollback to Previous Versions
* Version Timeline with Metadata
* Document Dashboard
* Dark/Light Theme Support
* Responsive UI
* Toast Notifications
* MongoDB Atlas Integration
* Cloud Deployment with Vercel & Render
* OpenAI Integration Ready for Semantic Version Summaries

---

## 🛠️ Tech Stack

| Layer              | Technologies                                               |
| ------------------ | ---------------------------------------------------------- |
| Frontend           | React, React Router, Tailwind CSS, TipTap, React Hot Toast |
| Backend            | Node.js, Express.js                                        |
| Database           | MongoDB Atlas, Mongoose                                    |
| Authentication     | JWT, bcryptjs                                              |
| Version Comparison | react-diff-viewer-continued                                |
| Deployment         | Vercel, Render                                             |
| AI Integration     | OpenAI API (Optional)                                      |

---

## 📂 Project Structure

```text
doc-version-control/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│
└── README.md
```

---

## 🔐 Authentication & Authorization

The application uses JWT-based authentication.

### Editor Role

* Create Documents
* Edit Documents
* Save New Versions
* Compare Versions
* Rollback Versions
* View Version History

### Viewer Role

* View Documents
* Compare Versions
* View Version History
* Read-Only Access

---

## 🔄 Version Control Features

### Save Version

Each version stores:

* Document Content Snapshot
* Timestamp
* Author Information
* Version Metadata

### Compare Versions

Compare any two document versions using a visual diff viewer.

### Rollback

Restore any previous version while preserving complete version history.

### Version Timeline

View document history chronologically with timestamps and author information.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/gurumurthydupana/doc-version-control.git
cd doc-version-control
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔧 Backend Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

---

## ▶️ Run the Application

### Backend

```bash
cd backend
npm run dev
```

Runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm start
```

Runs on:

```text
http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Documents

```http
GET    /api/documents
POST   /api/documents/create
GET    /api/documents/:id
POST   /api/documents/:id/version
GET    /api/documents/:id/history
GET    /api/documents/:docId/compare/:v1/:v2
POST   /api/documents/:docId/rollback/:versionId
```

---

## 🎯 Resume Description

Developed a full-stack document version control platform using the MERN stack featuring document history tracking, visual version comparison, rollback functionality, rich text editing, and role-based access control. Implemented JWT authentication, MongoDB Atlas integration, responsive UI design, and deployed the application using Vercel and Render.

---

## 📈 Key Highlights

* Full-Stack MERN Application
* JWT Authentication & Authorization
* Version Control Workflow
* RESTful API Development
* MongoDB Atlas Integration
* Cloud Deployment
* Responsive UI/UX
* Production-Ready Architecture

---

## 👨‍💻 Author

**Gurumurthy Dupana**

GitHub: https://github.com/gurumurthydupana

LinkedIn: https://www.linkedin.com/in/YOUR-LINKEDIN-ID
