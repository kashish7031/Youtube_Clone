# YouTube Clone - Capstone Project

A full-stack video streaming application built using the MERN Stack (MongoDB, Express, React, Node.js). This project replicates core YouTube features including video uploads, playback, and social interactions.

## 🚀 Features Implemented

### Front-End (React)
* **Home Page:** Responsive video grid with Sidebar toggle and Category filters.
* **Video Player:** * Hybrid player (supports uploaded MP4s and YouTube links).
    * Like/Dislike functionality.
    * **Comments System:** Full CRUD (Add, Edit, Delete comments).
* **Channel Dashboard:** * Upload new videos (with thumbnail/video file support).
    * **Video Management:** Full CRUD (Edit Title/Description, Delete Video).
* **Authentication:** Secure Login and Registration using JWT.

### Back-End (Node.js & Express)
* **RESTful API:** Endpoints for Videos, Users, Auth, and Comments.
* **File Handling:** `Multer` integration for local file storage (uploads folder).
* **Database:** MongoDB Atlas integration with Mongoose schemas.

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Styling:** CSS3, Flexbox

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>