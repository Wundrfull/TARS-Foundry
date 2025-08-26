# Kurzgesagt Complete Visual Style Guide for AI Doomsday Countdown

## The Dual Design Strategy: Web Minimalism vs Video Vibrancy

Kurzgesagt employs a sophisticated **dual-design approach** that separates their web presence from video content. Their website uses **restrained, professional colors** while videos feature **bold, neon-bright palettes**. This deliberate contrast ensures web content supports rather than competes with vibrant thumbnails, creating an optimal content consumption environment.

## Core Color Palettes: Two Systems for Different Contexts

### Video/Animation Palette (High Saturation)
The video identity centers on **high-saturation colors with extensive gradients**, creating their signature "flat neon" aesthetic:

**Primary Animation Colors:**
- Dark Blue `#001372`
- Deep Purple `#0b0054`
- Vibrant Pink `#e30050`
- Orange-Red `#e32e01`
- Golden Yellow `#fbbe00`

**Secondary Expansion:**
- Bright Blue `#0025bf`
- Sky Blue `#008cf7`
- Cyan `#00d8fc`
- Purple `#6500d7`
- Magenta `#ff3fa7`

### Web Palette (Professional Minimalism)
The website employs a completely different approach with **muted, professional tones**:

**Primary Web Colors:**
```css
--kg-bg-primary: #ffffff;          /* Pure white base */
--kg-bg-secondary: #f8f9fa;        /* Light gray sections */
--kg-text-primary: #1a1a1a;        /* Near black (12.63:1 contrast) */
--kg-text-secondary: #666666;      /* Medium gray (5.74:1 contrast) */
--kg-button-primary: #208bd2;      /* Professional blue */
--kg-accent-orange: #e32e01;       /* Used sparingly for CTAs */
--kg-border-primary: #e1e5e9;      /* Light gray borders */
```

**Shadow System for Depth:**
```css
--kg-shadow-card: 0 2px 8px rgba(0,0,0,0.1);
--kg-shadow-hover: 0 4px 12px rgba(32,139,210,0.25);
--kg-shadow-modal: 0 8px 32px rgba(0,0,0,0.2);
```

The key principle: Use **vibrant colors for content**, **minimal colors for interface**.

## Shape language and geometric simplification principles

The foundation of Kurzgesagt's visual style is **converting complex objects into basic geometric primitives**. Circles dominate friendly, approachable elements like their signature bird characters, which maintain a **1:1.5 to 1:2 head-to-body ratio** with oversized heads for appeal. Triangles indicate direction, danger, or technical structures but are used sparingly to avoid harshness. Rectangles form architectural and technological elements, almost always softened with **heavy rounded corners** to maintain approachability.

Their edge treatment follows strict consistency rules: **uniform stroke weights throughout scenes**, typically center-aligned or inside-aligned vector outlines, with stroke thickness color-matched or slightly darker than fill colors. The simplification philosophy removes all surface details, textures, and unnecessary complexity while preserving essential recognizable features and emotional indicators. This creates their signature balance between scientific accuracy and visual accessibility.

## Typography: Different Fonts for Different Media

### Video Typography
Videos use **Nexa by Fontfabric**, a geometric sans-serif with 36 styles across 9 weights. Headlines employ **Nexa Bold**, body text uses the **Nexa Text subfamily**, following **Golden Ratio scaling (1:1.618)** between sizes.

### Web Typography (Primary Implementation)
Websites use **Rubik from Google Fonts**, a friendlier rounded sans-serif:

```css
/* Font stack */
font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Type scale (Desktop) */
h1: 48px, line-height: 1.2, weight: 700
h2: 36px, line-height: 1.25, weight: 600  
h3: 28px, line-height: 1.3, weight: 600
h4: 24px, line-height: 1.35, weight: 500
body: 16px, line-height: 1.6, weight: 400
small: 14px, line-height: 1.5, weight: 400

/* Mobile adjustments */
@media (max-width: 768px) {
  h1: 36px
  h2: 28px
  body: 15px
}
```

Text animations use **0.3-0.5s transitions** with `translateY(20px)` movements. Load fonts with `font-display: swap` for performance.

## Animation principles with technical parameters

Kurzgesagt's signature floating animations use **sine wave patterns** with **3-second cycles** and **10px vertical translation**. Their standard easing function is **cubic-bezier(0.25, 0.1, 0.25, 1)** for smooth, natural motion. Animation durations follow clear standards: **0.3-0.5 seconds** for short transitions, **0.5-1.0 seconds** for medium animations, and **1-3 seconds** for complex sequences. All animations run at **24 fps** for cinematic quality.

Parallax effects employ specific movement ratios: background layers move at **1x speed**, midground at **1.5-2x**, and foreground at **2-3x**. This creates depth without overwhelming the viewer. For continuous animations like floating elements, they use infinite loops with seamless transitions, typically implementing CSS animations with `animation: float 3s ease-in-out infinite`.

## Spacing System: 8px Base Unit

Web implementations use a consistent **8px base unit** for all spacing:

```css
--space-xs: 8px
--space-sm: 16px  
--space-md: 24px
--space-lg: 32px
--space-xl: 48px
--space-2xl: 64px
--space-3xl: 80px
--space-4xl: 100px
```

**Application:**
- Section padding: `80px` vertical
- Card gaps: `24px` between elements
- Container max-width: `1200px`
- Mobile padding: `16px` horizontal

## Layout & Grid System

### Responsive Breakpoints
```css
Mobile: 320px - 480px
Tablet: 481px - 768px  
Desktop: 769px - 1024px
Large: 1025px+
```

### Grid Implementation
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

## Background layering and depth techniques

Kurzgesagt typically employs **3-6 separate background layers** with specific opacity values: background at **60-80%**, midground at **80-90%**, and foreground at **95-100%**. Atmospheric perspective is achieved through **40-60% saturation reduction** for distant elements, **30-50% contrast reduction**, and a **2-4px blur radius** for background objects. Distant elements shift toward cooler blue-gray tones and appear **15-25% brighter** than foreground elements.

Particle effects enhance atmosphere using **20-50 particles per screen area** with **2-8px sizes** at **10-30% opacity**, animated with slow floating motion at **0.5-1px per frame**. Gradient backgrounds employ 2-3 color stops for sky effects, with warm-to-cool transitions creating natural depth perception.

## Composition Rules and Visual Hierarchy

Scenes follow **Golden Ratio proportions (1:1.618)** for layout divisions. Visual hierarchy is established through:

1. **Strategic white space** - Generous breathing room prevents clutter
2. **Size relationships** - Important elements are 1.618x larger
3. **Color temperature** - Warm colors advance, cool recede  
4. **Asymmetrical balance** - More dynamic than perfect symmetry
5. **Contrast manipulation** - High for critical, low for supporting

For web layouts specifically:
- Section margins: `80px` between major blocks
- Hero sections: `100px` top, `60px` bottom padding
- Content max-width: `720px` for articles, `1200px` for grids
- Card aspect ratios: `1:1.4` for products, `16:9` for videos

## Icon and Scientific Visualization Approach

Complex concepts are simplified into **clean geometric metaphors** while maintaining scientific accuracy. Abstract ideas like AI systems are **anthropomorphized** through character design. Data visualizations always include **contextual comparisons** and use **proportional graphics** to show relative magnitudes.

Their infographic approach seamlessly blends narrative animation with data presentation, using **consistent visual language** across different scales from microscopic to cosmic.

## Handling apocalyptic themes with optimistic nihilism

Kurzgesagt's philosophy of **"Optimistic Nihilism"** guides their approach to dark topics. Serious content about AI risks or existential threats maintains the same **bright, vibrant color palette** to create necessary emotional distance while preserving impact. The consistent use of their standard colors **#e30050** (pink) and **#fbbe00** (yellow) even in apocalyptic scenarios reinforces their message that understanding threats empowers action.

Visual counterbalance is key: devastating scenarios are presented with the same calm, approachable aesthetic as lighter topics, always including **actionable context** about prevention or mitigation. This approach treats apocalyptic scenarios as **learning opportunities** rather than fear content, emphasizing human agency and solutions.

## Complete Web Implementation Specifications

### Component Design System

**Button System:**
```css
.button {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: #208bd2;
  color: white;
  transition: all 0.3s ease-out;
}

.button:hover {
  background: #1a7cb8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32,139,210,0.25);
}

.button:focus-visible {
  outline: 2px solid #208bd2;
  outline-offset: 2px;
}
```

**Card Design:**
```css
.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}
```

**Navigation:**
- Header height: `72px`
- Non-sticky by default
- Mobile menu: slide-in from right at `80% width`
- Nav gaps: `32px` desktop, vertical stack mobile

### Performance Optimizations

**Image Loading:**
```html
<img 
  srcset="image-320w.webp 320w,
          image-640w.webp 640w"
  sizes="(max-width: 640px) 100vw, 50vw"
  loading="lazy"
  decoding="async"
/>
```

**CSS Performance:**
- Use `transform` for animations (GPU accelerated)
- Apply `will-change: transform` to animated elements
- Maximum 6 parallax layers for 60fps
- Implement `font-display: swap` for web fonts

**Loading States:**
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

### Accessibility Requirements

- **Contrast ratios:** 12.63:1 for primary text, 5.74:1 for secondary
- **Focus states:** 2px solid outline with 2px offset
- **ARIA labels:** All interactive elements properly labeled
- **Skip links:** Hidden but accessible for keyboard users
- **Semantic HTML:** Proper heading hierarchy and landmarks

## Implementation Strategy for AI Doomsday Countdown

### Recommended Hybrid Approach

For an AI Doomsday countdown website, combine both design systems strategically:

**1. Use Web System for Interface:**
- Clean white/light gray backgrounds (#ffffff, #f8f9fa)
- Professional blue CTAs (#208bd2)
- Rubik font for all UI text
- 8px spacing grid
- Subtle shadows and transitions
- High contrast ratios for accessibility

**2. Use Video System for Content:**
- Vibrant illustrations/icons (#e30050, #fbbe00, #6500d7)
- Animated background elements with video palette
- Kurzgesagt-style geometric shapes for data viz
- Floating animations at 3s cycles
- Gradient overlays for hero sections

**3. Key Specifications Summary:**
- **Typography:** Rubik for web, 48px → 14px scale
- **Spacing:** 8px base unit (16px, 24px, 32px, etc.)
- **Colors:** Muted UI (#1a1a1a text, #208bd2 buttons) + Vibrant content (#e30050, #fbbe00)
- **Animations:** 0.3s transitions, translateY movements, ease-out timing
- **Layout:** 1200px max container, mobile-first grid
- **Performance:** Lazy loading, WebP images, font-display: swap
- **Accessibility:** 12.63:1 contrast, proper ARIA, semantic HTML

This dual approach creates a professional, trustworthy interface while maintaining Kurzgesagt's engaging visual storytelling for the actual doomsday content—perfect for conveying serious AI safety information in an approachable yet impactful way.