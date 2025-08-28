# TARS-Foundry Agent Gallery

A beautiful, interactive gallery showcasing curated Claude sub-agent prompt templates. Built with React, TypeScript, and HeroUI components.

## 🚀 Features

- **8 Specialized Agents**: From code review to documentation generation
- **Smart Filtering**: Search and filter by tags, domains, and keywords
- **Beautiful UI**: Modern glass-morphism design with HeroUI components
- **Copy & Export**: One-click copy to clipboard or export as Markdown/JSON
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Fast Performance**: Built with Vite for lightning-fast development and optimized code splitting
- **Interactive Getting Started Guide**: Comprehensive tutorial for creating and managing subagents
- **Animated Backgrounds**: Dynamic gradient orbs and visual effects for enhanced user experience

## 📦 Available Agents

1. **Code Reviewer** - Senior code reviewer with security focus
2. **Debugger** - Root cause analysis specialist
3. **Test Writer** - Deterministic test generation
4. **Security Auditor** - Vulnerability scanning specialist
5. **Performance Profiler** - Bottleneck identification expert
6. **Migration Planner** - Structured migration planning
7. **Refactor Executor** - Disciplined refactoring specialist
8. **Documentation Writer** - Documentation generation expert

## 🛠️ Installation

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/TARS-Foundry/agent-gallery.git

# Navigate to project directory
cd agent-gallery

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173` (default Vite port).

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory, ready for static hosting.

## 📁 Project Structure

```
agent-gallery/
├── agents/              # Agent markdown files with YAML front-matter
│   ├── code-reviewer.md
│   ├── debugger.md
│   ├── doc-writer.md
│   ├── migration-planner.md
│   ├── performance-profiler.md
│   ├── refactor-executor.md
│   ├── security-auditor.md
│   └── test-writer.md
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AgentCard.tsx
│   │   ├── CopyButton.tsx
│   │   └── TagFilter.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx        # Main gallery view
│   │   ├── AgentDetail.tsx # Individual agent details
│   │   └── GettingStarted.tsx # Tutorial guide
│   ├── data/           # Agent data
│   │   └── agents.json
│   ├── styles/         # CSS styles
│   │   └── index.css
│   ├── types/          # TypeScript type definitions
│   │   └── agent.ts
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
│   └── favicon.svg
├── index.html          # HTML entry point
├── vite.config.mjs     # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── showcase.config.json # Deployment configuration
```

## 🎨 Technology Stack

- **React 18.3** - Modern UI framework with hooks and suspense
- **TypeScript 5.9** - Type safety and enhanced developer experience
- **HeroUI v2.8.2** - Beautiful, accessible component library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5.4** - Lightning-fast build tool with HMR
- **Framer Motion 11.18** - Production-ready animation library
- **Lucide React** - Modern icon library

## 📝 Agent Format

Each agent follows this structure:

```markdown
---
name: agent-identifier
description: Brief description of agent's purpose
tools: [Read, Edit, Bash, Grep, Glob, WebFetch, TodoWrite]
---

# Agent System Prompt

You are a specialized agent focused on [specific domain]...

## Your Responsibilities
1. Primary responsibility
2. Secondary responsibility
3. ...

## Process
1. Step-by-step process
2. ...

## Evidence and References
- Supporting evidence for capabilities
- References to best practices
```

## 🤝 Contributing

### Adding a New Agent

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-agent`)
3. Add your agent markdown file to `agents/` directory
4. Update `src/data/agents.json` with agent metadata:
   ```json
   {
     "id": "unique-id",
     "title": "Agent Title",
     "domain": ["primary-domain"],
     "summary": "Brief description",
     "tools": ["Read", "Edit", "Bash"],
     "tags": ["tag1", "tag2"],
     "prompt": "Full agent prompt content"
   }
   ```
5. Test locally with `npm run dev`
6. Ensure TypeScript checks pass with `npm run build`
7. Commit your changes (`git commit -m 'Add amazing agent'`)
8. Push to the branch (`git push origin feature/amazing-agent`)
9. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new components
- Follow existing component patterns
- Ensure responsive design works on all screen sizes
- Add appropriate accessibility attributes
- Test with keyboard navigation

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of page components for faster initial load
- **Optimized Bundles**: Separate vendor chunks for better caching
- **Minification**: ES build for production optimization
- **Asset Optimization**: SVG and image optimization
- **Responsive Images**: Optimized for different screen sizes

## 🔧 Development Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
tsc --noEmit
```

## 🌐 Deployment

The application is configured for static hosting and can be deployed to:

- **Vercel**: Zero-config deployment
- **Netlify**: Drop the `dist` folder or connect GitHub
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Any Static Host**: Upload the `dist` folder contents

## 📄 License

MIT License - feel free to use these agent templates in your projects!

## 🙏 Acknowledgments

- Built for the Claude Code community
- Powered by HeroUI components
- Inspired by Anthropic's sub-agent best practices
- Special thanks to all contributors

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on [GitHub](https://github.com/TARS-Foundry/agent-gallery/issues)
- Visit the [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/sub-agents)

---

Made with ❤️ by TARS-Foundry