# 🚀 Dipronil Das - Portfolio

A modern, responsive, and high-performance developer portfolio built with **React**, **JSX**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- ⚡ **Built with Vite 6 & React 19**: Lightning-fast HMR and build times.
- 🎨 **Tailwind CSS v4 & Glassmorphic Design**: Modern dark theme with glowing ambient gradients and micro-interactions.
- 📱 **Fully Responsive**: Flawless experience across desktop, tablet, and mobile screens.
- 💼 **Showcase Sections**:
  - **Hero**: Animated role cycler, dynamic code config preview, quick tech pills, and stats counter.
  - **About Me**: Professional story, key engineering pillars, and quick facts.
  - **Skills & Tech Stack**: Interactive categorized tabs (Frontend, Backend, Databases/Cloud, Tools) with visual progress meters.
  - **Projects Showcase**: Filterable project gallery with detailed modal previews, live links, and GitHub links.
  - **Experience & Education**: Timeline with work milestones, key achievements, and testimonials.
  - **Interactive Contact Form**: Direct form with validation, celebratory confetti on send, and one-click copy email.
- 🔍 **SEO & Accessibility**: Clean semantic HTML, Google Fonts, and meta tags.

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
├── index.html               # HTML entry point with Google Fonts & metadata
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite configuration with React & Tailwind plugins
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main App layout
    ├── index.css            # Tailwind CSS & global styles
    ├── data/
    │   └── portfolioData.js # All portfolio content & projects data
    └── components/
        ├── Navbar.jsx       # Glassmorphism header with active link tracker
        ├── Hero.jsx         # Hero with role rotator & interactive code block
        ├── About.jsx        # Story & engineering pillars
        ├── Skills.jsx       # Categorized skill meters
        ├── Projects.jsx     # Filterable project gallery
        ├── ProjectModal.jsx # Detailed modal for project view
        ├── Experience.jsx   # Career & education timeline
        ├── Contact.jsx      # Contact form with confetti & direct contact info
        └── Footer.jsx       # Footer with back-to-top & social links
```

## 📄 License
MIT © Dipronil Das
