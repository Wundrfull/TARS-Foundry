# TARS-Foundry

A curated gallery of Claude sub-agent prompt templates for Claude Code, featuring specialized agents for code review, debugging, testing, security auditing, and more.

## Overview

TARS-Foundry provides a collection of battle-tested Claude sub-agent prompts that can be used with Claude Code's Task tool. Each agent is designed for a specific domain and includes structured metadata, prompt templates, and evidence-based documentation.

## Features

- **8 Specialized Agents**: Code reviewer, debugger, test writer, security auditor, performance profiler, migration planner, refactor executor, and documentation writer
- **Interactive Gallery**: Browse, search, and filter agents by domain and tags
- **Export Options**: Copy individual prompts or export complete agent definitions
- **Claude Code Compatible**: All agents follow Claude Code's Markdown + YAML front-matter format
- **Evidence-Based**: Each agent includes supporting references and implementation guidelines

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/TARS-Foundry.git
cd TARS-Foundry

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
TARS-Foundry/
├── agent-gallery/           # Main application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── data/          # Agent data (agents.json)
│   │   ├── pages/         # React pages
│   │   ├── components/    # Reusable components
│   │   └── styles/        # CSS styles
│   └── agents/            # Agent markdown definitions
├── CLAUDE.md              # Claude Code instructions
├── IMPLEMENTATION_GUIDE.md # Detailed implementation guide
└── agent-gallery-design.md # Design specification

```

## Available Agents

| Agent | Domain | Description |
|-------|--------|-------------|
| **Code Reviewer** | Engineering | Comprehensive code review with security and maintainability focus |
| **Debugger** | Troubleshooting | Root cause analysis and minimal fix implementation |
| **Test Writer** | Quality | Deterministic test generation for recent changes |
| **Security Auditor** | Security | Vulnerability scanning and security review |
| **Performance Profiler** | Optimization | Performance hotspot identification |
| **Migration Planner** | Architecture | Structured migration planning |
| **Refactor Executor** | Maintenance | Disciplined refactoring implementation |
| **Doc Writer** | Documentation | Documentation generation from code |

## Using Agents with Claude Code

Each agent can be invoked using Claude Code's Task tool:

```typescript
// Example: Using the code-reviewer agent
Task({
  description: "Review PR changes",
  subagent_type: "code-reviewer",
  prompt: "Review the changes in PR #123 focusing on security and performance"
})
```

## Development

### Technologies

- **React 18+** with TypeScript
- **HeroUI v2.8+** for UI components
- **Vite 5+** for build tooling
- **Tailwind CSS v4** for styling

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (when configured)
- `npm run test` - Run tests (when configured)

## Deployment

The application can be deployed as:

1. **Static Site**: Deploy the `dist/` folder to any static hosting service
2. **Node.js App**: Use the provided `showcase.config.json` for Node.js runtime

### Static Deployment Example

```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Configuration

See `showcase.config.json` for deployment configuration options.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-agent`)
3. Commit your changes (`git commit -m 'Add new agent'`)
4. Push to the branch (`git push origin feature/new-agent`)
5. Open a Pull Request

### Adding New Agents

To add a new agent:

1. Create a new markdown file in `agent-gallery/agents/`
2. Include YAML front-matter with metadata
3. Add the agent to `agent-gallery/src/data/agents.json`
4. Update relevant documentation

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built for use with [Claude Code](https://claude.ai/code)
- UI powered by [HeroUI](https://heroui.com)
- Based on Anthropic's sub-agent best practices

## Support

For issues, questions, or suggestions, please open an issue on GitHub.