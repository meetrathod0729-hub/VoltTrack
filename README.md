# ⚡ VoltTrack

**VoltTrack** is a full-stack Electrician Management System designed to simplify the management of tools, resources, and client orders.  
It provides an intuitive dashboard, dark mode support, and smart order tracking — all built with a clean, modern UI.

---

## 🧠 Features

✅ **Dashboard Overview** – View total tools, pending orders, and resource status at a glance.  
🧰 **Tool Management** – Add, edit, and delete electrician tools with quantity tracking.  
📦 **Resource Management** – Track resources, update statuses, and mark acquisitions.  
📅 **Order Scheduling** – Manage client orders, deadlines, and completion tracking.  
🌙 **Dark Mode** – Switch seamlessly between light and dark themes.  
⚙️ **Flask API Backend** – Secure, lightweight, and connected to a SQLite database.  

---

## 🧱 Tech Stack

**Frontend:**
- React.js (Vite)
- CSS (Custom Styling)

**Backend:**
- Flask (Python)
- SQLAlchemy (ORM)
- SQLite (Database)
- Axios (API Requests)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/VoltTrack.git
cd VoltTrack

cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

cd Frontend
npm install
npm run dev

VoltTrack/
│
├── Backend/
│   ├── app.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.db
│   └── ...
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── dashboard.jsx
│   │   ├── tools.jsx
│   │   ├── resources.jsx
│   │   ├── orders.jsx
│   │   ├── api.js
│   │   └── index.css
│   └── vite.config.js
│
└── README.md
