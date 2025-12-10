# 🎥 YouTube Clone - MERN Stack Capstone Project

A fully functional video streaming application built using the MERN stack (MongoDB, Express, React, Node.js). This project replicates core YouTube features, including video uploads, playback, comment management, and channel dashboards.

---

## 🚀 Features

### 1. Front-End (React)
* **Home Page:**
    * Responsive video grid layout.
    * **Sidebar Navigation:** Toggleable sidebar (Hamburger menu) matching YouTube's UI.
    * **Category Filters:** Filter videos by tags (Music, Gaming, Tech, etc.).
    * **Search Bar:** Real-time search functionality by video title.
* **Video Player:**
    * Hybrid Player: Supports both local MP4 uploads and external YouTube links.
    * **Like/Dislike System:** Fully functional interaction buttons.
    * **Comments System:** Full CRUD (Create, Read, Update, Delete) support for comments.
* **Channel Dashboard:**
    * **Video Management:** Upload new videos with thumbnails.
    * **Edit Functionality:** Update video titles and descriptions.
    * **Delete Functionality:** Remove videos from the channel.
* **Authentication:**
    * Secure User Registration and Login.
    * JWT (JSON Web Token) authentication for protected routes.

### 2. Back-End (Node.js & Express)
* **RESTful API:** Robust API architecture for Users, Videos, and Comments.
* **Database:** MongoDB Atlas integration using Mongoose.
* **File Storage:** `Multer` middleware for handling local image and video file uploads.

### 3. Responsiveness
* Fully responsive design using CSS Media Queries.
* Optimized for Desktop, Tablet, and Mobile screens.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, React Router DOM, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Styling** | CSS3, Flexbox, CSS Grid |
| **Version Control** | Git & GitHub |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone <https://github.com/kashish7031/Youtube_Clone>
cd youtube-clone
