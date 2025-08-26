# TARS-Foundry Agent Gallery

A beautiful, interactive gallery showcasing curated Claude sub-agent prompt templates. Built with React, TypeScript, and HeroUI components.

![Agent Gallery Screenshot](./agent-gallery-home.png)

## 🚀 Features

- **8 Specialized Agents**: From code review to documentation generation
- **Smart Filtering**: Search and filter by tags, domains, and keywords
- **Beautiful UI**: Modern design with HeroUI components
- **Copy & Export**: One-click copy to clipboard or export as Markdown/JSON
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Fast Performance**: Built with Vite for lightning-fast development

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
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components (Home, AgentDetail)
│   ├── data/           # Agent data (agents.json)
│   ├── styles/         # CSS styles
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── showcase.config.json # Deployment configuration
```

## 🎨 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **HeroUI v2.8** - Component library
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Framer Motion** - Animations

## 📝 Agent Format

Each agent follows this structure:

```markdown
---
name: agent-identifier
description: Brief description
tools: [Read, Edit, Bash, Grep, Glob]
---

[Agent prompt content]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-agent`)
3. Add your agent to `agents/` directory
4. Update `src/data/agents.json`
5. Commit your changes (`git commit -m 'Add amazing agent'`)
6. Push to the branch (`git push origin feature/amazing-agent`)
7. Open a Pull Request

## 📄 License

MIT License - feel free to use these agent templates in your projects!

## 🙏 Acknowledgments

- Built for the Claude Code community
- Powered by HeroUI components
- Inspired by Anthropic's sub-agent best practices

---

Made with ❤️ by TARS-Foundry