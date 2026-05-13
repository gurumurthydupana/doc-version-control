# Intelligent Document Version Control System

An AI-assisted document version control platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to create documents, save multiple versions, view version history, and roll back to any previous version. Each saved version includes an automatically generated summary of the changes, making document tracking more intuitive and efficient.

---

## 🚀 Features

- JWT-based user authentication
- Role-based access control (`editor` and `viewer`)
- Create and edit documents
- Save unlimited document versions
- Rule-based AI summaries for version changes
- View complete version history with timestamps
- Roll back to any previous version
- RESTful API architecture
- Responsive React frontend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- JavaScript
- HTML/CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Mongoose ODM

### Database
- MongoDB

### AI Module
- Rule-based mock AI summarization

---

## 🧠 AI-Based Change Summarization

Each time a user saves a new version, the application compares the previous and updated content and generates a concise summary such as:

- Initial version of the document created.
- New content was added to the document.
- Some content was removed from the document.
- The document content was updated.

This rule-based AI module demonstrates intelligent document tracking without relying on external APIs or paid AI services.

---

## 📂 Project Structure

```text
doc-version-control/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   └── Version.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── documentRoutes.js
│   ├── utils/
│   │   └── aiSummary.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Editor.jsx
│   │   └── App.js
│   └── package.json
│
└── README.md
