
# 🐱 Cat Image Gallery (Angular + Spring Boot)

This project is a simple image gallery web application built with **Angular** for the frontend and **Spring Boot** for the backend. Users can upload, view, and delete cat images.

---
### intialization

MAKESURE environtment.ts
apiUrl = url server service backend; 
## 📁 Project Structure

```
src/
├── app/
│   ├── data/                # Interfaces (e.g., cat.interface.ts)
│   ├── modules/
│   │   ├── home/            # Home page to list images
│   │   └── insert/          # Form to insert image details
│   ├── services/
│   │   ├── api.service.ts   # Handles API calls
│   │   └── modal.service.ts # Reusable modal service
│   ├── shared/
│   │   ├── modal/           # Shared modal component
│   │   └── navbar/          # Navigation bar component
│   ├── app.component.*      # Root component
│   └── app.routes.ts        # Routing setup
```

---

## 🔧 Features

- ✅ Upload image via modal
- ✅ View list of uploaded images with dynamic size
- ✅ Delete image with confirmation modal
- ✅ Bootstrap styling with responsive layout
- ✅ Uses `HttpClient` for API calls
- ✅ Shows loading spinner and empty-state messages

---

## 🧪 Technologies Used

### Frontend:
- Angular 19
- Bootstrap 5
- TypeScript
- RxJS & HttpClient

### Backend:
- Spring Boot (REST API)
- CORS Configuration for API access

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/bambangaji/sompo-fe.git
cd cat-gallery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Angular Dev Server
```bash
ng serve
```
App will be available at: `http://localhost:4200`

### 4. Start Spring Boot API
Make sure your backend is running at `http://localhost:8082`

---

## 🔄 API Endpoints (Spring Boot)

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | `/api/cats`      | Upload image           |
| GET    | `/api/cats`      | Get list of images     |
| DELETE | `/api/cats/{id}` | Delete an image by ID  |
| POST | `/api/cats/insert` | Insert ID  |

> ⚠️ Ensure your Spring Boot app has proper `CORS` headers and `Content-Type` handling for file uploads.

---

## 📷 UI Overview

Add a screenshot here once available.

---

## 🛠 Todo / Improvements

- [ ] Add pagination or infinite scroll
- [ ] Add image tags or categories
- [ ] Improve validation on file upload

---

## 📄 License

MIT © [Your Name]
