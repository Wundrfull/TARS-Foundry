# TARS-Foundry Agent Gallery Implementation Guide

## Overview

This guide provides a step-by-step implementation plan for building the TARS-Foundry Agent Gallery project - a HeroUI-based static website showcasing Claude sub-agent prompt templates.

## Prerequisites

- Node.js 18+ and npm
- Git for version control
- Basic knowledge of React, TypeScript, and Tailwind CSS

## Implementation Phases

### Phase 1: Project Setup and Configuration

#### 1.1 Initialize Project with Dependencies
```bash
npm init -y
npm install react@^18.2.0 react-dom@^18.2.0 @heroui/react@^2.8.2
npm install -D vite@^5.4.0 typescript@^5.5.0 tailwindcss@^4.0.0
npm install -D @vitejs/plugin-react @types/react @types/react-dom
```

**Files to create:**
- `package.json` with scripts (dev, build, preview)
- `.gitignore` for node_modules, dist, etc.

#### 1.2 Set up Vite and TypeScript Configuration

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Phase 2: Data Layer Implementation

#### 2.1 Create Agent Markdown Files

Create `agents/` directory with 8 agent files:
- `code-reviewer.md`
- `debugger.md`
- `test-writer.md`
- `security-auditor.md`
- `performance-profiler.md`
- `migration-planner.md`
- `refactor-executor.md`
- `doc-writer.md`

Each file follows the format:
```markdown
---
name: agent-identifier
description: Brief description
tools: [Read, Edit, Bash, Grep, Glob]
---
[Agent prompt content]
```

#### 2.2 Generate agents.json Data File

Create `src/data/agents.json` with structured data:
```json
[
  {
    "id": "code-reviewer",
    "title": "Code Reviewer",
    "domain": ["coding"],
    "summary": "Senior code reviewer with security focus",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "frontmatter": {...},
    "prompt": "Full prompt text...",
    "tags": ["security", "review", "quality"]
  }
]
```

### Phase 3: UI Foundation

#### 3.1 Configure HeroUI and Tailwind CSS

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
}
```

**src/styles/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**src/heroui.ts:**
```typescript
import { HeroUIProvider } from "@heroui/react";
export const heroUIConfig = {
  // Theme configuration
}
```

#### 3.2 Create Core Components

**Components to build:**

1. **AgentCard.tsx**
   - Display agent title, summary, tags
   - Quick actions (Copy, View Details)
   - Use HeroUI Card and Chip components

2. **TagFilter.tsx**
   - Filter agents by tags
   - Use HeroUI Checkbox or Chip components
   - Support multi-select

3. **CopyButton.tsx**
   - Copy agent prompt to clipboard
   - Show success feedback
   - Use HeroUI Button with tooltip

### Phase 4: Main Features

#### 4.1 Implement Home Gallery Page

**src/pages/Home.tsx:**
- Grid layout for agent cards
- Search bar in navbar
- Tag filter sidebar
- Responsive design (mobile-first)

Key features:
- Load agents from agents.json
- Filter by search query and tags
- Sort by name or domain
- Lazy loading for performance

#### 4.2 Implement AgentDetail Page

**src/pages/AgentDetail.tsx:**
- Full prompt display with syntax highlighting
- Metadata section (tools, variables)
- Evidence accordion
- Export options (Markdown, JSON)

Components:
- HeroUI Code for prompt display
- HeroUI Accordion for evidence
- HeroUI ButtonGroup for actions

#### 4.3 Add Search and Filtering

Implement features:
- Real-time search as-you-type
- Tag-based filtering (AND/OR logic)
- Domain categorization
- Clear filters button
- URL state management for shareable filters

#### 4.4 Implement Copy and Export Features

**Copy functionality:**
- Copy full prompt with front-matter
- Copy prompt only
- Copy as JSON
- Visual feedback on copy

**Export functionality:**
- Download single agent as .md
- Download all agents as .zip
- Export agents.json catalog

### Phase 5: Deployment and Documentation

#### 5.1 Create showcase.config.json

**For static deployment:**
```json
{
  "appName": "agent-gallery",
  "displayName": "Agent Gallery",
  "description": "Curated Claude sub-agent designs",
  "visibility": "listed",
  "runtime": "static",
  "assetsDir": "dist",
  "buildCommand": "npm run build"
}
```

#### 5.2 Write README.md Documentation

Include sections:
- Project description
- Installation instructions
- Development workflow
- Build and deployment
- Agent format specification
- Contributing guidelines

#### 5.3 Test Build and Preview

Testing checklist:
- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Verify all agents load correctly
- [ ] Test search and filtering
- [ ] Verify copy/export functions
- [ ] Check responsive design
- [ ] Test accessibility (keyboard navigation)
- [ ] Validate performance metrics

## Implementation Order

1. **Week 1: Foundation**
   - Project setup (Phase 1)
   - Agent markdown files (Phase 2.1)
   - Basic components (Phase 3.2)

2. **Week 2: Core Features**
   - Home gallery (Phase 4.1)
   - Search/filter (Phase 4.3)
   - agents.json generation (Phase 2.2)

3. **Week 3: Advanced Features**
   - Agent detail page (Phase 4.2)
   - Copy/export (Phase 4.4)
   - Testing and refinement

4. **Week 4: Polish and Deploy**
   - Documentation (Phase 5.2)
   - Deployment setup (Phase 5.1)
   - Final testing (Phase 5.3)

## Success Criteria

- [ ] All 8 agents properly formatted and accessible
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Search and filtering perform smoothly
- [ ] Copy/export functions work reliably
- [ ] Build completes without errors
- [ ] Lighthouse scores: Performance > 90, Accessibility > 95
- [ ] Documentation is complete and clear

## Common Pitfalls to Avoid

1. **Don't forget to escape special characters in prompts**
2. **Ensure YAML front-matter is valid**
3. **Test with different prompt lengths**
4. **Validate JSON structure before importing**
5. **Handle edge cases (empty search, no results)**
6. **Implement proper error boundaries**
7. **Add loading states for better UX**

## Resources

- [HeroUI Documentation](https://www.heroui.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Next Steps

After implementation:
1. Gather user feedback
2. Add more agent templates
3. Implement agent versioning
4. Add community contribution features
5. Create agent testing playground
6. Build API for programmatic access