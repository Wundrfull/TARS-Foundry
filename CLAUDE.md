# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TARS-Foundry is an Agent Gallery project designed to showcase a curated collection of Claude sub-agent prompt templates. The project consists of two main components:

1. **Sub-Agent Prompt Pack**: A collection of specialized Claude sub-agent definitions with YAML front-matter
2. **Agent Gallery Website**: A HeroUI-based static website for browsing, filtering, and exporting agent prompts

## Architecture

### Project Structure
```
TARS-Foundry/
├── agent-gallery/           # Main application directory
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── data/           # Agent data (agents.json)
│   │   ├── pages/          # Page components (Home, AgentDetail)
│   │   ├── components/     # Reusable components (AgentCard, CopyButton, TagFilter)
│   │   ├── styles/         # CSS styles
│   │   └── heroui.ts       # HeroUI configuration
│   └── agents/             # Agent markdown files with YAML front-matter
│       ├── code-reviewer.md
│       ├── debugger.md
│       ├── test-writer.md
│       ├── security-auditor.md
│       ├── performance-profiler.md
│       ├── migration-planner.md
│       ├── refactor-executor.md
│       └── doc-writer.md
├── package.json            # Project dependencies and scripts
├── vite.config.ts         # Vite build configuration
├── showcase.config.json   # Deployment configuration
└── agent-gallery-design.md # Design specification document
```

### Technology Stack
- **Framework**: React 18+ with TypeScript
- **UI Library**: HeroUI v2.8+ (built on React Aria and Tailwind CSS)
- **Build Tool**: Vite 5+
- **Styling**: Tailwind CSS v4
- **Deployment**: Static or Node.js runtime options

## Development Commands

### Initial Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Implementation Details

### Agent Data Model
Each agent is defined with:
- **Metadata**: id, title, domain, summary, tags
- **Front-matter**: YAML configuration for Claude Code compatibility
- **Prompt**: Full agent prompt text
- **Tools**: List of allowed Claude Code tools (Read, Edit, Bash, Grep, Glob)
- **Variables**: Configurable prompt parameters
- **Output Schema**: Expected output format
- **Evidence**: Supporting references and claims

### Sub-Agent Format
Agents follow Claude Code's Markdown + YAML front-matter convention:
```markdown
---
name: agent-identifier
description: Brief agent description
tools: [Read, Edit, Bash, Grep, Glob]
---
[Agent prompt content]
```

### UI Components (HeroUI)
- **Navbar**: Search and tag filtering
- **Card**: Agent display cards with metadata
- **Chip**: Tag displays and filters
- **Accordion**: Evidence and detail sections
- **Code**: Syntax-highlighted prompt display
- **ButtonGroup**: Action buttons (Copy, Export)

### Runtime Configuration Options

**Static Deployment** (`showcase.config.json`):
```json
{
  "runtime": "static",
  "assetsDir": "dist",
  "buildCommand": "npm run build"
}
```

**Node.js Deployment**:
```json
{
  "runtime": "node",
  "version": "22",
  "startCommand": "npm start",
  "internalPort": 3000
}
```

## Agent Categories

The project includes 8 specialized sub-agents:

1. **code-reviewer**: Code review with security and maintainability focus
2. **debugger**: Root cause analysis and minimal fix implementation
3. **test-writer**: Deterministic test generation for recent changes
4. **security-auditor**: Vulnerability scanning and security review
5. **performance-profiler**: Hotspot identification and optimization
6. **migration-planner**: Structured migration planning (incremental vs. rewrite)
7. **refactor-executor**: Disciplined refactoring implementation
8. **doc-writer**: Documentation generation from code changes

## Implementation Guidelines

When implementing the Agent Gallery:

1. **Start with the data layer**: Create `agents.json` from the agent markdown files
2. **Build core components first**: AgentCard, TagFilter, CopyButton
3. **Implement routing**: Home gallery view and individual agent detail pages
4. **Add interactivity**: Search, filtering, copy/export functionality
5. **Optimize for static deployment**: Pre-render where possible

## Testing Approach

For development testing:
- Component testing with React Testing Library
- Visual regression testing for UI components
- JSON schema validation for agent data
- Accessibility testing with React Aria compliance

## References

The design is based on:
- Anthropic's sub-agent documentation and best practices
- HeroUI component library standards
- Claude Code's agent file format specifications