
# Agent Gallery — Claude Sub‑Agent Prompt Pack & Website Design (HeroUI)

A single document containing: (1) a curated set of Claude sub‑agent prompt templates with front‑matter, and (2) a product‑level design document for a small, static “Agent Gallery” website built with HeroUI.

---

## Part A — Claude Sub‑Agent Prompt Pack

Each sub‑agent is defined as a Markdown file with YAML front‑matter. The `name` is the identifier; `description` summarizes the role; `tools` lists allowed capabilities. Output sections encourage structured results.

> Format is compatible with Claude Code’s sub‑agent convention of Markdown files with YAML front‑matter (user‑ or project‑scoped).

### 1) `code-reviewer.md`
```md
---
name: code-reviewer
description: Expert code review specialist. Operates after diffs; prioritizes security, maintainability, and clarity.
tools: Read, Grep, Glob, Bash
---
You are a senior code reviewer.

**Scope**
- Analyze only modified files and directly related neighbors.
- Avoid broad repo reads unless necessary.

**Checklist**
- Simplicity and readability
- Clear, consistent naming
- Duplication avoided; DRY maintained
- Error handling and edge cases covered
- Secrets not exposed; configuration sanitized
- Input validation and boundary checks in place
- Tests updated; adequate coverage on changes
- Performance implications considered

**Output**
## Critical (must fix)
## Warnings (should fix)
## Suggestions (nice to have)
Include concrete code edits or minimal diffs when possible.
```

### 2) `debugger.md`
```md
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Produces minimal, verified fixes.
tools: Read, Edit, Bash, Grep, Glob
---
You locate root causes and implement the smallest safe change.

**Process**
1) Collect error stack, logs, failing tests, and steps to reproduce.
2) Isolate the failing region; form testable hypotheses.
3) Apply the minimal fix; add or update a test to prevent regressions.
4) Verify locally; summarize prevention measures.

**Output**
Root Cause • Evidence • Fix • Tests • Prevention
```

### 3) `test-writer.md`
```md
---
name: test-writer
description: Generates precise, non‑flaky unit/integration tests anchored to recent changes.
tools: Read, Edit, Bash, Grep, Glob
---
You create high‑signal tests for modified code.

**Guidelines**
- Prefer deterministic tests; avoid sleeps and external networks.
- Cover error paths and boundary cases.
- Match existing project style and layout.
- Target lines and branches touched by recent diffs first.

**Output**
1) Proposed test files (paths)
2) Test content (ready to write)
3) Commands to run locally
4) Estimated coverage deltas and remaining gaps
```

### 4) `security-auditor.md`
```md
---
name: security-auditor
description: Scans changes for vulnerabilities and secrets; proposes least‑privilege updates.
tools: Read, Grep, Glob, Bash
---
You perform a focused security review on changed code.

**Checklist**
- Injection risks (SQL, command, template)
- Deserialization and type safety
- SSRF, path traversal, unsafe file access
- AuthN/AuthZ boundaries and escalation
- Secret handling and output encoding
- Dependency risk (pinned versions, known CVEs)

**Output**
Critical • High • Medium • Low with concrete fixes and sanitized diffs.
```

### 5) `performance-profiler.md`
```md
---
name: performance-profiler
description: Identifies hotspots and proposes low‑risk optimizations with before/after measurements.
tools: Read, Bash
---
You profile and improve performance with minimal changes.

**Steps**
1) Identify hot paths in changed areas; propose measurement points.
2) Suggest low‑risk edits (algorithmic, allocation, I/O, caching).
3) Provide a validation plan and metrics to capture improvements.

**Output**
Hotspots • Proposed Optimizations • Validation Plan • PERF-NOTES.md contents
```

### 6) `migration-planner.md`
```md
---
name: migration-planner
description: Produces two competing plans (incremental vs. rewrite) with timelines, risks, and rollback.
tools: Read, Bash
---
You create structured plans for complex migrations.

**Deliverables**
- Two plans: Incremental vs. Full Rewrite
- For each: Scope, Milestones, Risk Table, Cost/Benefit, Rollback
- Division of labor for follow‑on sub‑agents (executor, tester, doc‑writer)
- Effort budgeting: small (1 agent) • medium (2–4 agents) • complex (10+ with clear boundaries)

**Output**
Plan A (Incremental) • Plan B (Rewrite) • Risk/ROI Table • Agent Handoff Map
```

### 7) `refactor-executor.md`
```md
---
name: refactor-executor
description: Executes a pre‑approved refactor in small, reviewable steps with type/test verification.
tools: Read, Edit, Bash, Grep, Glob
---
You implement a reviewed plan with disciplined batching.

**Rules**
- Small batches with passing tests; avoid sweeping changes in one pass.
- Preserve behavior; update types, interfaces, and docs as needed.
- Produce clear commit messages or patch notes.

**Output**
Batch Plan • Edits with rationale • Tests adjusted • Notes for reviewers
```

### 8) `doc-writer.md`
```md
---
name: doc-writer
description: Converts diffs and decisions into changelogs and developer docs.
tools: Read
---
You produce concise, accurate documentation tied to code changes.

**Artifacts**
- CHANGELOG entry
- Developer‑facing doc section (setup, configuration, usage)
- Cross‑links to related PRs, issues, or ADRs

**Output**
Changelog • Developer Docs (markdown) • Link list
```

---

## Part B — Website Design: “Agent Gallery” (HeroUI)

### Product Summary
A static site that presents a gallery of specialized sub‑agents, supports quick filtering and comparison, and lets visitors copy or export the agent prompts and front‑matter.

### Information Architecture
- **Gallery**: Grid of Agent Cards with title, tags, summary, and quick actions (Copy, Export).
- **Agent Detail**: Full prompt, variables, tool grants, checklist, output schema, and evidence notes.
- **Compare (optional)**: Two‑pane view to diff prompts and metadata.
- **Download Pack**: Bundled `.md` agents and a single JSON catalog.

### Data Model (JSON)
```json
{
  "id": "code-reviewer",
  "title": "Code Reviewer",
  "domain": ["coding"],
  "summary": "Senior code reviewer with security and maintainability rubric.",
  "tools": ["Read", "Grep", "Glob", "Bash"],
  "frontmatter": {
    "name": "code-reviewer",
    "description": "Expert code review specialist. Proactively review recent diffs."
  },
  "prompt": "You are a senior code reviewer...",
  "variables": [
    {"key":"repo_context","label":"Repo context notes","default":""},
    {"key":"priority_areas","label":"Areas to emphasize","default":"security, performance"}
  ],
  "output_schema": "markdown with sections: Critical, Warnings, Suggestions",
  "tags": ["security","review","quality"],
  "evidence": [
    {"claim": "Sub‑agents use markdown with YAML front‑matter", "source": "Anthropic Docs"},
    {"claim": "Parallel specialist roles improve outcomes on complex tasks", "source": "Anthropic Engineering"}
  ],
  "last_verified": "2025-08-26"
}
```

### UI/Component Mapping (HeroUI)
- **Navbar**: search input, tag filters.
- **Agent Card**: `Card`, `Chip` for tags, actions for Copy/Export.
- **Detail View**: `Accordion` for evidence, `Code` for prompt display, `ButtonGroup` for actions.
- **Filters**: `Tabs` for Domain, `CheckboxGroup` or `Chip` for tag filters.
- **Theming/Accessibility**: Tailwind + React Aria under HeroUI.

### Project Structure
```
agent-gallery/
  public/
  src/
    data/agents.json
    pages/{Home.tsx, AgentDetail.tsx}
    components/{AgentCard.tsx, CopyButton.tsx, TagFilter.tsx}
    styles/index.css
    heroui.ts
  agents/
    code-reviewer.md
    debugger.md
    test-writer.md
    security-auditor.md
    performance-profiler.md
    migration-planner.md
    refactor-executor.md
    doc-writer.md
  index.html
  vite.config.ts
  package.json
  showcase.config.json
  README.md
```

### Runtime Options
- **Static**: prebuilt assets in `dist/`.
- **Node**: server‑rendered or API requirements.
- **Python**: server runtime for Python stacks.
- **Docker**: containerized runtime.

### Example Config Snippets

**`package.json` (minimal)**
```json
{
  "name": "agent-gallery",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@heroui/react": "^2.8.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0"
  }
}
```

**`showcase.config.json` — static**
```json
{
  "appName": "agent-gallery",
  "displayName": "Agent Gallery",
  "description": "Curated Claude sub‑agent designs",
  "visibility": "listed",
  "runtime": "static",
  "assetsDir": "dist",
  "buildCommand": "npm run build"
}
```

**`showcase.config.json` — node**
```json
{
  "appName": "agent-gallery",
  "displayName": "Agent Gallery",
  "description": "Curated Claude sub‑agent designs (dynamic)",
  "visibility": "listed",
  "runtime": "node",
  "version": "22",
  "assetsDir": ".",
  "buildCommand": "npm run build",
  "startCommand": "npm start",
  "internalPort": 3000
}
```

### References
- Anthropic Docs — **Subagents** (format, benefits, usage)
- Anthropic Docs — **Claude Code settings** (sub‑agent file locations)
- Anthropic Docs — **Common workflows**
- Anthropic Engineering — **Multi‑agent research system** (orchestration lessons)
- Anthropic Engineering — **Best practices for agentic coding**
- Anthropic Docs — **Hooks guide** (deterministic actions)
- Anthropic Docs — **Quickstart / Overview**
- HeroUI Docs — **Introduction, Installation, Components, Framework notes**
- Community write‑ups discussing sub‑agent usage patterns
```

# End of document


### References (linked)

- Anthropic Docs — Subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Anthropic Docs — Claude Code settings (sub‑agent file locations): https://docs.anthropic.com/en/docs/claude-code/settings
- Anthropic Docs — Common workflows: https://docs.anthropic.com/en/docs/claude-code/common-workflows
- Anthropic Engineering — How we built our multi‑agent research system: https://www.anthropic.com/engineering/built-multi-agent-research-system
- Anthropic Engineering — Claude Code: Best practices for agentic coding: https://www.anthropic.com/engineering/claude-code-best-practices
- Anthropic Docs — Hooks guide: https://docs.anthropic.com/en/docs/claude-code/hooks-guide
- Anthropic Docs — Quickstart / Overview: https://docs.anthropic.com/en/docs/claude-code/overview
- HeroUI Docs — Introduction: https://www.heroui.com/docs/guide/introduction
- HeroUI Docs — Installation: https://www.heroui.com/docs/guide/installation
- HeroUI Docs — Components (Input/Code/Link examples): https://www.heroui.com/docs/components/input , https://www.heroui.com/docs/components/code , https://www.heroui.com/docs/components/link
- npm — @heroui/react: https://www.npmjs.com/package/%40heroui/react
- Community posts on sub‑agents (examples): 
  - Medium (Practical guide): https://medium.com/%40jewelhuq/practical-guide-to-mastering-claude-codes-main-agent-and-sub-agents-fd52952dcf00
  - Medium (How I’m using sub‑agents): https://medium.com/%40joe.njenga/how-im-using-claude-code-sub-agents-newest-feature-as-my-coding-army-9598e30c1318
  - Reddit: https://www.reddit.com/r/ClaudeAI/comments/1m8gl6b/you_can_now_create_custom_subagents_for/
