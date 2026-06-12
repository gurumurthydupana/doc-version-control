# AI-Powered Document Version Control System

A modern MERN stack application that combines document version control with AI-generated semantic change summaries. Users can create documents, save versions, compare changes visually, view AI-powered summaries, and roll back to previous versions with secure role-based access control.

## 🚀 Features

* JWT Authentication with Editor and Viewer roles
* AI-powered semantic version summaries using Claude or OpenAI APIs
* Automatic fallback to rule-based summarization if AI is unavailable
* Rich Text Editing with TipTap
* Visual Diff Viewer for comparing any two document versions
* Version History Timeline with timestamps, authors, and summaries
* Rollback to previous versions
* Document Dashboard with document cards
* Dark Mode support
* Toast Notifications for actions and errors
* Responsive Tailwind CSS UI

---

## 🛠️ Tech Stack

| Layer          | Technologies                                               |
| -------------- | ---------------------------------------------------------- |
| Frontend       | React, React Router, Tailwind CSS, TipTap, React Hot Toast |
| Backend        | Node.js, Express.js                                        |
| Database       | MongoDB, Mongoose                                          |
| Authentication | JWT, bcrypt                                                |
| AI             | Anthropic Claude API / OpenAI API                          |
| Diff Engine    | react-diff-viewer-continued                                |

---

## 📂 Project Structure

```text
doc-version-control/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
│
└── README.md
```

---

## 🔐 Authentication & Authorization

The application uses JWT-based authentication.

### Roles

**Editor**

* Create documents
* Edit content
* Save versions
* Rollback versions
* Compare versions

**Viewer**

* View documents
* View version history
* Compare versions
* Read-only editor access

---

## 🤖 AI-Powered Version Summaries

When a user saves a new version:

1. Previous version content is retrieved.
2. New version content is compared.
3. Claude/OpenAI generates a human-readable summary.

Example:

> Added deployment instructions and updated authentication documentation.

If an API key is unavailable, the application automatically falls back to a lightweight rule-based summarizer.

---

## 🔄 Version Control Features

### Save Version

Creates a new version record with:

* Content snapshot
* Timestamp
* Author
* AI summary

### Compare Versions

Allows comparison of any two saved versions using a visual diff viewer.

### Rollback

Restore any previous version while preserving version history.

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

## Backend Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=mongodb://localhost:27017/doc-version-control
JWT_SECRET=your_jwt_secret

AI_PROVIDER=anthropic

ANTHROPIC_API_KEY=your_key
ANTHROPIC_MODEL=claude-sonnet-4-6

# OR

OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
```

---

## Run the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## 📡 API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Documents

* GET `/api/documents`
* POST `/api/documents/create`
* GET `/api/documents/:id`
* POST `/api/documents/:id/version`
* GET `/api/documents/:id/history`
* GET `/api/documents/:docId/compare/:v1/:v2`
* POST `/api/documents/:docId/rollback/:versionId`

---

## 🎯 Resume Description

Built an AI-powered document version control platform using the MERN stack with Claude/OpenAI-powered semantic change summaries, visual diff comparison, rich text editing, and JWT-based role management. Implemented version history tracking, rollback functionality, dark mode UI, and secure document access using MongoDB and Express APIs.

---

## 👨‍💻 Author

**Gurumurthy Dupana**

GitHub:
https://github.com/gurumurthydupana

LinkedIn:
https://www.linkedin.com/
