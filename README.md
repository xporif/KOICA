# KOICA Training Center Samarkand Website

A modern, animated frontend-only website for the KOICA Training Center in Samarkand, Uzbekistan. Built with React, Vite, TailwindCSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Glassmorphism style with gradient colors (blue, purple)
- **Smooth Animations**: Framer Motion animations on scroll and interactions
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Loading Animation**: Beautiful loading screen on initial load
- **Smooth Scrolling**: Smooth scroll navigation between sections

## 📋 Sections

1. **Home (Hero Section)**: Animated entrance with title and subtitle
2. **About KOICA**: Information about Korea International Cooperation Agency
3. **Samarkand Center**: Details about the training center with tabbed interface
4. **Features**: Icon cards showcasing key features
5. **Location & Contact**: Contact information with Google Maps embed
6. **Gallery**: Image gallery with lightbox functionality
7. **Footer**: Social links and project information

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful icon library

## 📦 Installation

### Prerequisites

Make sure you have Node.js (v16 or higher) and npm installed on your system.

### Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Colors

The main gradient colors are defined in the CSS:
- Primary gradient: Blue to Purple (`#667eea` to `#764ba2`)
- Animated gradient: Multi-color animated background

### Fonts

The project uses the Inter font family. You can change it in the `index.css` file.

### Animations

All animations are implemented using Framer Motion. You can customize:
- Animation duration and easing
- Scroll trigger animations
- Hover and tap effects

## 📁 Project Structure

```
koica-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutKoica.jsx
│   │   ├── SamarkandCenter.jsx
│   │   ├── Features.jsx
│   │   ├── LocationContact.jsx
│   │   ├── Gallery.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🔧 Configuration

### TailwindCSS Configuration

The `tailwind.config.js` file includes:
- Custom animations (float, gradient, pulse-slow)
- Dark mode support
- Extended gradient utilities

### Vite Configuration

Standard Vite configuration with React plugin for optimal development experience.

## 🌟 Key Features Implementation

### Glassmorphism Effect

The glass effect is achieved using CSS backdrop-filter:
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Dark Mode

Dark mode is implemented using Tailwind's dark mode class strategy:
```javascript
// In App.jsx
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

### Smooth Scrolling

Smooth scrolling is enabled with CSS:
```css
html {
  scroll-behavior: smooth;
}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance Optimizations

- **Lazy Loading**: Components load as needed with scroll animations
- **Optimized Animations**: Hardware-accelerated CSS transforms
- **Minimal Dependencies**: Only essential libraries included
- **Efficient Bundle**: Vite's optimized build process

## 🤝 Contributing

This is a student project by Group 20. Feel free to:
- Report issues
- Suggest improvements
- Contribute to the codebase

## 📄 License

This project is for educational purposes as part of Group 20's presentation.

## 📞 Contact

For any questions about this project:
- Email: info@koica.uz
- Phone: +998 90 123 45 67

---

**Group 20 Project** - Created with ❤️ for KOICA Training Center Samarkand
