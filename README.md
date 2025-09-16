# Baab Al Fouz (BAF) Production Frontend

This is the frontend codebase for the Baab Al Fouz (BAF) website, built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### 1. **Clone the repository**
```bash
git clone <your-repo-url>
cd baf-frontend
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Development server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Project Structure

```
baf-frontend/
├── public/                # Static assets (images, videos, favicon, etc.)
├── src/
│   ├── components/        # Reusable components (Navbar, Loader, etc.)
│   ├── pages/             # Page components (Home, About, Contact, etc.)
│   ├── styles/            # CSS and Tailwind files
│   ├── hooks/             # Custom React hooks
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── ...                # Other files
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite config
├── package.json
└── README.md
```

---

## 📦 Features

- **React Router v6** for routing
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Loader video** splash screen (place your video in `public/videos/Loader.mp4`)
- **API integration** via custom hooks
- **Responsive** and mobile-friendly design

---

## 🖼️ Assets

- Place images in `public/images/`
- Place the loader video in `public/videos/Loader.mp4`
- Favicon and touch icons are set in `public/index.html`

---

## ⚙️ Environment Variables

Create a `.env` file in the root with your API URL:
```
VITE_CMS_URL=https://your-api-url.com
```

---

## 📝 Customization

- **Navbar logo:**  
  Replace `/images/baf-logo - Edited.png` in the `public/images/` folder and update the path in `Navbar.jsx` if needed.
- **Loader video:**  
  Replace `public/videos/Loader.mp4` with your own video (preferably `.mp4` format for browser compatibility).

---

## 🧑‍💻 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

---

## 🐞 Troubleshooting

- If the loader video does not play, ensure it is an `.mp4` file and placed in `public/videos/Loader.mp4`.
- If Tailwind styles do not apply, check your `tailwind.config.js` and that you are importing your Tailwind CSS file in `main.jsx`.
- For API issues, verify your `.env` and backend server.

---

