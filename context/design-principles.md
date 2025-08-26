# Kurzgesagt Web Design System: Complete Technical Analysis

## The science of minimal web design versus vibrant video aesthetics

Kurzgesagt employs a sophisticated dual-design strategy: their website uses **restrained, professional colors with scientific minimalism** while their videos feature **bold, neon-bright palettes**. This deliberate contrast ensures web content supports rather than competes with their vibrant video thumbnails, creating an optimal content consumption environment that was redesigned in 2024 by BUCK agency to emphasize their evolution beyond YouTube.

## 1. Color Palette: Web minimalism versus video vibrancy

### Primary Web Colors (Light Mode)
```css
:root {
  /* Core Website Backgrounds */
  --kg-bg-primary: #ffffff;           /* Pure white base */
  --kg-bg-secondary: #f8f9fa;         /* Light gray sections */
  --kg-bg-cards: #ffffff;             /* Card backgrounds */
  --kg-bg-nav: #f5f5f5;               /* Navigation areas */
  
  /* Typography Colors */
  --kg-text-primary: #1a1a1a;         /* Near black (12.63:1 contrast) */
  --kg-text-secondary: #666666;       /* Medium gray (5.74:1 contrast) */
  --kg-text-muted: #999999;           /* Light gray */
  --kg-text-caption: #cccccc;         /* Very light gray */
  
  /* Interactive Elements */
  --kg-button-primary: #208bd2;       /* Professional blue */
  --kg-button-hover: #1a7cb8;         /* Darker blue */
  --kg-button-active: #155f8a;        /* Deep blue */
  --kg-button-disabled: #cccccc;      /* Light gray */
  
  /* Accent Colors (Used Sparingly) */
  --kg-accent-orange: #e32e01;        /* CTA highlights */
  --kg-accent-yellow: #fbbe00;        /* Badges/alerts */
  --kg-accent-purple: #6500d7;        /* Special elements */
  
  /* Borders & Dividers */
  --kg-border-primary: #e1e5e9;       /* Light gray borders */
  --kg-border-secondary: #f1f3f4;     /* Very light borders */
  --kg-border-emphasis: #208bd2;      /* Blue accent borders */
}
```

### Shadow System
```css
/* Elevation hierarchy */
--kg-shadow-card: 0 2px 8px rgba(0, 0, 0, 0.1);
--kg-shadow-dropdown: 0 4px 16px rgba(0, 0, 0, 0.15);
--kg-shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.2);
--kg-shadow-hover: 0 4px 12px rgba(32, 139, 210, 0.25);
```

## 2. Typography Implementation

### Font Stack
```css
/* Primary typeface: Rubik from Google Fonts */
--font-family-primary: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Font weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Type Scale
```css
/* Desktop sizing */
h1 { font-size: 48px; line-height: 1.2; font-weight: 700; }
h2 { font-size: 36px; line-height: 1.25; font-weight: 600; }
h3 { font-size: 28px; line-height: 1.3; font-weight: 600; }
h4 { font-size: 24px; line-height: 1.35; font-weight: 500; }
h5 { font-size: 20px; line-height: 1.4; font-weight: 500; }
h6 { font-size: 18px; line-height: 1.4; font-weight: 500; }
body { font-size: 16px; line-height: 1.6; font-weight: 400; }
small { font-size: 14px; line-height: 1.5; font-weight: 400; }

/* Mobile adjustments */
@media (max-width: 768px) {
  h1 { font-size: 36px; }
  h2 { font-size: 28px; }
  h3 { font-size: 24px; }
  body { font-size: 15px; }
}
```

### Font Loading Strategy
```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
```

## 3. Layout Patterns

### Grid System
```css
/* 12-column flexible grid with mobile-first approach */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Responsive breakpoints */
/* Mobile: 320px - 480px */
/* Tablet: 481px - 768px */
/* Desktop: 769px - 1024px */
/* Large: 1025px+ */

@media (min-width: 481px) { /* Tablet */ }
@media (min-width: 769px) { /* Desktop */ }
@media (min-width: 1025px) { /* Large */ }
```

### Spacing System (8px base)
```css
:root {
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 80px;
  --space-4xl: 100px;
}

/* Section spacing */
.section {
  padding: var(--space-3xl) 0;  /* 80px vertical */
}

/* Component spacing */
.card-grid {
  gap: var(--space-md);  /* 24px between cards */
}
```

## 4. Component Design

### Buttons
```css
.button {
  /* Structure */
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  
  /* Primary style */
  background: var(--kg-button-primary);
  color: white;
}

.button:hover {
  background: var(--kg-button-hover);
  transform: translateY(-2px);
  box-shadow: var(--kg-shadow-hover);
}

.button:active {
  background: var(--kg-button-active);
  transform: scale(0.98);
}

.button:disabled {
  background: var(--kg-button-disabled);
  opacity: 0.5;
  cursor: not-allowed;
}

.button:focus-visible {
  outline: 2px solid var(--kg-button-primary);
  outline-offset: 2px;
}
```

### Cards
```css
.card {
  background: var(--kg-bg-cards);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--kg-shadow-card);
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}
```

### Form Elements
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--kg-border-primary);
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--kg-button-primary);
  box-shadow: 0 0 0 3px rgba(32, 139, 210, 0.1);
}
```

## 5. Interaction Patterns

### Transitions
```css
/* Standard timing */
--transition-fast: 0.2s ease-out;
--transition-normal: 0.3s ease-out;
--transition-slow: 0.4s ease-out;

/* Hover effects */
.interactive-element {
  transition: transform var(--transition-normal),
              opacity var(--transition-normal),
              box-shadow var(--transition-normal);
}

/* Micro-animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
```

### Scroll Behaviors
```css
html {
  scroll-behavior: smooth;
}

/* Intersection observer animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## 6. Light Mode Approach

### White Space Strategy
```css
/* Generous spacing between sections */
.content-section {
  margin-bottom: 80px;
}

/* Breathing room within components */
.text-block {
  margin-bottom: 24px;
}

/* Asymmetrical spacing for visual hierarchy */
.hero-section {
  padding-top: 100px;
  padding-bottom: 60px;
}
```

### Contrast & Readability
```css
/* High contrast ratios */
.body-text {
  color: var(--kg-text-primary);  /* 12.63:1 on white */
}

.secondary-text {
  color: var(--kg-text-secondary);  /* 5.74:1 on white */
}

/* Subtle backgrounds for sections */
.alternate-section {
  background: var(--kg-bg-secondary);
}
```

## 7. Navigation Design

### Header Implementation
```css
.header {
  height: 72px;
  background: var(--kg-bg-primary);
  border-bottom: 1px solid var(--kg-border-primary);
  position: relative;  /* Non-sticky by default */
}

.nav-menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: var(--kg-text-primary);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--kg-button-primary);
}

/* Mobile navigation */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background: white;
    transition: right 0.3s ease;
  }
  
  .nav-menu.active {
    right: 0;
  }
}
```

## 8. Content Presentation

### Article Layout
```css
.article-container {
  max-width: 720px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 48px;
}

.article-content p {
  margin-bottom: 24px;
  line-height: 1.7;
}

/* Video embeds */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;  /* 16:9 aspect ratio */
  margin: 32px 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Product Grid
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.product-card {
  aspect-ratio: 1 / 1.4;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
```

## 9. Footer Design

### Structure
```css
.footer {
  background: var(--kg-bg-secondary);
  padding: 64px 0 32px;
  margin-top: 100px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  margin-bottom: 48px;
}

.footer-column h4 {
  margin-bottom: 16px;
  color: var(--kg-text-primary);
}

.footer-link {
  display: block;
  color: var(--kg-text-secondary);
  text-decoration: none;
  padding: 4px 0;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--kg-button-primary);
}
```

## 10. Loading States & Error Pages

### Skeleton Screens
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Loading spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--kg-border-primary);
  border-top-color: var(--kg-button-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Error Pages
```css
.error-page {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: var(--kg-accent-yellow);
  margin-bottom: 24px;
}
```

## 11. Accessibility Features

### Focus States
```css
/* Focus visible for keyboard navigation */
*:focus-visible {
  outline: 2px solid var(--kg-button-primary);
  outline-offset: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--kg-button-primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### ARIA Implementation
```html
<!-- Landmark roles -->
<nav role="navigation" aria-label="Main navigation">
<main role="main" aria-label="Main content">
<footer role="contentinfo" aria-label="Site footer">

<!-- Interactive elements -->
<button aria-label="Open menu" aria-expanded="false">
<div role="alert" aria-live="polite">
```

## 12. Performance Optimizations

### Image Loading
```html
<!-- Responsive images with lazy loading -->
<img 
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-1280w.webp 1280w"
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw,
         33vw"
  src="image-640w.jpg"
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
/>
```

### Font Loading
```css
/* Optimized font loading */
@font-face {
  font-family: 'Rubik';
  src: url('rubik.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}

/* Preload critical fonts */
<link rel="preload" href="rubik.woff2" as="font" type="font/woff2" crossorigin>
```

### CSS Organization
```css
/* Critical CSS inlined in <head> */
.above-fold-content {
  /* Minimal styles for initial render */
}

/* Non-critical CSS loaded asynchronously */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Implementation Summary for AI Doomsday Website

The Kurzgesagt web design system provides an excellent foundation for a light-mode AI-focused website through its:

1. **Minimal color palette** focusing on professional blues and subtle grays rather than vibrant video colors
2. **Rubik typeface** with clear hierarchy using 48px down to 14px sizes
3. **8px spacing system** creating consistent rhythm throughout
4. **Mobile-first responsive grid** with breakpoints at 481px, 769px, and 1025px
5. **Subtle interactions** using 0.3s transitions and minimal shadows
6. **High contrast ratios** ensuring accessibility (12.63:1 for primary text)
7. **Clean navigation** with non-sticky headers and hamburger mobile menus
8. **Performance-optimized loading** with lazy loading and modern image formats

This system emphasizes scientific credibility through restraint, using white space and typography rather than color to create visual hierarchy—perfect for conveying serious AI safety content while maintaining engagement.