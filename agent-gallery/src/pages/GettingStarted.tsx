import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Terminal, 
  Download, 
  Play, 
  Copy,
  ExternalLink,
  Rocket,
  BookOpen,
  HelpCircle,
  CheckCircle,
  ArrowLeft,
  MessageSquare,
  FileEdit,
  Sparkles,
  FolderOpen
} from 'lucide-react';

interface GettingStartedProps {
  onNavigate?: (page: 'home' | 'getting-started') => void;
}

const GettingStarted: React.FC<GettingStartedProps> = ({ onNavigate }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopy = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      id: 'start',
      number: '1',
      title: 'Open the Subagents Interface',
      simple: '/agents',
      icon: Terminal,
      color: 'from-purple-600 to-purple-700',
      details: {
        description: 'Launch the interactive subagents interface within Claude Code. This command opens a menu where you can manage all your subagents.',
        prerequisites: [
          'Claude Code must be running',
          'You should be in your project directory',
          'Valid API key configured'
        ],
        whatYouSee: `When you run /agents, you'll see:
• View all available subagents (built-in, user, and project)
• Create new subagents with guided setup
• Edit existing custom subagents
• Delete custom subagents
• See which subagents are active`,
        tips: [
          'The interface shows all available tools including MCP server tools',
          'You can see both project-level and user-level subagents',
          'Project subagents override user subagents with the same name'
        ]
      }
    },
    {
      id: 'create',
      number: '2', 
      title: 'Select "Create New Agent"',
      simple: 'Choose project or user level',
      icon: MessageSquare,
      color: 'from-pink-600 to-pink-700',
      details: {
        description: 'Choose whether to create a project-level or user-level subagent. Project agents are stored in .claude/agents/ while user agents are in ~/.claude/agents/',
        locations: [
          { type: 'Project subagents', path: '.claude/agents/', scope: 'Available in current project', priority: 'Highest' },
          { type: 'User subagents', path: '~/.claude/agents/', scope: 'Available across all projects', priority: 'Lower' }
        ],
        recommendation: '💡 Recommended: Generate with Claude first, then customize',
        process: `The creation process:
1. Choose scope (project or user)
2. Describe your subagent's purpose
3. Let Claude generate the initial version
4. Review and customize the prompt
5. Select specific tools (or inherit all)`,
        tips: [
          'Start with Claude-generated agents for best results',
          'Project agents are great for team collaboration',
          'User agents work across all your projects',
          'You can press "e" to edit in your own editor'
        ]
      }
    },
    {
      id: 'customize',
      number: '3',
      title: 'Define and Customize',
      simple: 'Edit name, description, tools, and prompt',
      icon: FileEdit,
      color: 'from-blue-600 to-blue-700',
      details: {
        description: 'Define your subagent with a name, description, tools access, and system prompt. The file uses Markdown with YAML frontmatter.',
        fileFormat: `---
name: design-reviewer
description: Expert design review specialist. Use proactively after UI changes.
tools: Read, Grep, WebFetch, BashOutput  # Optional - inherits all if omitted
---

You are a comprehensive design review specialist focused on evaluating UI/UX implementations.

## Your Responsibilities
1. Visual consistency and brand alignment
2. Accessibility compliance (WCAG 2.1 AA)
3. Responsive design verification
4. Performance impact assessment

## Review Process
1. Capture current implementation state
2. Check against design specifications
3. Test across different viewports
4. Verify accessibility standards
5. Document findings with screenshots

Always provide actionable feedback organized by priority.`,
        configFields: [
          { field: 'name', required: 'Yes', description: 'Unique identifier using lowercase and hyphens' },
          { field: 'description', required: 'Yes', description: 'When this subagent should be invoked' },
          { field: 'tools', required: 'No', description: 'Comma-separated list (inherits all if omitted)' }
        ],
        tips: [
          'Include "use PROACTIVELY" in description for automatic use',
          'Be specific about the agent\'s expertise and triggers',
          'Limit tools to only what\'s necessary for the task',
          'Include examples and checklists in the prompt'
        ]
      }
    },
    {
      id: 'use',
      number: '4',
      title: 'Save and Use',
      simple: 'Automatic or explicit invocation',
      icon: Sparkles,
      color: 'from-green-600 to-green-700',
      details: {
        description: 'Your subagent is now available! Claude will use it automatically when appropriate, or you can invoke it explicitly.',
        automaticUse: `Claude automatically delegates based on:
• Task description in your request
• The subagent's description field
• Current context and available tools`,
        explicitUse: [
          'Use the design-reviewer subagent to check my UI changes',
          'Have the code-reviewer look at my recent commits',
          'Ask the debugger subagent to investigate this error',
          'Run the test-writer subagent on the new feature'
        ],
        management: `Managing your subagents:
• /agents - Open the management interface
• View all agents and their status
• Edit tool permissions easily
• Delete agents you no longer need
• See which version is active (project vs user)`,
        tips: [
          'Subagents operate in their own context window',
          'Each invocation starts with a clean slate',
          'You can chain multiple subagents for complex tasks',
          'Check agents into version control for team use'
        ]
      }
    }
  ];

  return (
    <>
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Modern Navigation Bar */}
      <nav className="nav-modern">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong text-gray-700 hover:bg-purple-50 transition-all"
                aria-label="Back to Gallery"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Gallery</span>
              </button>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Getting Started
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="https://docs.anthropic.com/en/docs/claude-code/sub-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Subagents Docs</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-28 pb-12 px-4 md:px-6 transition-all duration-1000 relative z-10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          {/* TARS Robot - Subagent Management Interface */}
          <div className="flex justify-center mb-12">
            <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Interactive Menu Interface */}
              <g transform="translate(160, 100)">
                {/* Main Interface Window */}
                <rect x="-120" y="-70" width="240" height="140" fill="#1a1a2e" rx="8" stroke="#333" strokeWidth="2"/>
                
                {/* Interface Header */}
                <rect x="-120" y="-70" width="240" height="25" fill="#2d2d44" rx="8"/>
                <circle cx="-100" cy="-57" r="4" fill="#ff5f57"/>
                <circle cx="-85" cy="-57" r="4" fill="#ffbd2e"/>
                <circle cx="-70" cy="-57" r="4" fill="#28ca42"/>
                <text x="0" y="-53" textAnchor="middle" fill="#a0a0b0" fontSize="10" fontFamily="monospace">
                  Subagent Manager
                </text>
                
                {/* Menu Options */}
                <rect x="-110" y="-35" width="220" height="20" fill="#2a2a3e" rx="4">
                  <animate attributeName="fill" values="#2a2a3e;#3a3a5e;#2a2a3e" dur="2s" repeatCount="indefinite"/>
                </rect>
                <text x="-100" y="-22" fill="#00ff88" fontSize="10" fontFamily="monospace">
                  ▶ Create New Agent
                </text>
                
                <rect x="-110" y="-10" width="220" height="20" fill="transparent" stroke="#444" strokeWidth="1" rx="4"/>
                <text x="-100" y="3" fill="#a0a0b0" fontSize="10" fontFamily="monospace">
                  Edit Existing Agent
                </text>
                
                <rect x="-110" y="15" width="220" height="20" fill="transparent" stroke="#444" strokeWidth="1" rx="4"/>
                <text x="-100" y="28" fill="#a0a0b0" fontSize="10" fontFamily="monospace">
                  View All Agents
                </text>
                
                <rect x="-110" y="40" width="220" height="20" fill="transparent" stroke="#444" strokeWidth="1" rx="4"/>
                <text x="-100" y="53" fill="#a0a0b0" fontSize="10" fontFamily="monospace">
                  Delete Agent
                </text>
                
                {/* TARS Robot Integration */}
                <g transform="translate(140, 0)">
                  {/* TARS Body */}
                  <rect x="-20" y="-30" width="40" height="50" fill="url(#menu-body)" rx="6"/>
                  
                  {/* TARS Screen showing menu */}
                  <rect x="-15" y="-25" width="30" height="20" fill="#0a0a0f" rx="3"/>
                  <text x="0" y="-15" textAnchor="middle" fill="#00ff88" fontSize="7" fontFamily="monospace">
                    /agents
                  </text>
                  <text x="0" y="-7" textAnchor="middle" fill="#00ffff" fontSize="6" fontFamily="monospace">
                    ready
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </text>
                  
                  {/* Status Lights */}
                  <circle cx="-5" cy="5" r="2" fill="#00ff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="0" cy="5" r="2" fill="#ffff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="5" cy="5" r="2" fill="#00ffff">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Floating Agent Cards */}
                <g transform="translate(-150, -40)">
                  <rect x="-35" y="-10" width="70" height="20" fill="white" stroke="#e5e7eb" rx="10" opacity="0.9"/>
                  <text x="0" y="3" textAnchor="middle" fill="#666" fontSize="8" fontFamily="sans-serif">
                    Project Agent
                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/>
                  </text>
                </g>
                
                <g transform="translate(-150, 40)">
                  <rect x="-35" y="-10" width="70" height="20" fill="white" stroke="#e5e7eb" rx="10" opacity="0.9"/>
                  <text x="0" y="3" textAnchor="middle" fill="#666" fontSize="8" fontFamily="sans-serif">
                    User Agent
                    <animate attributeName="opacity" values="0;1;0" dur="4s" begin="2s" repeatCount="indefinite"/>
                  </text>
                </g>
              </g>
              
              <defs>
                <linearGradient id="menu-body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-12">
            <h1 className="mb-6 reveal">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Create <span className="text-gradient">Specialized Subagents</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Use the <code className="px-2 py-1 bg-gray-100 rounded text-purple-600 font-mono">/agents</code> command to create, customize, and manage your AI subagents
            </p>
            
            {/* Animated typing indicator */}
            <div className="flex justify-center mt-4 gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-ping"></span>
              <span className="w-2 h-2 bg-pink-600 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Context Preservation</h3>
                    <p className="text-sm text-gray-600">Each subagent operates in its own context window</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Specialized Expertise</h3>
                    <p className="text-sm text-gray-600">Fine-tuned with detailed instructions for specific domains</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Rocket className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Reusability</h3>
                    <p className="text-sm text-gray-600">Use across projects and share with your team</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Flexible Permissions</h3>
                    <p className="text-sm text-gray-600">Control tool access for each subagent type</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="grid gap-6 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === step.id;
              
              return (
                <div
                  key={step.id}
                  className="group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  <div className="glass-strong rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Step Header */}
                    <div className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                            {step.number}
                          </div>
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-3">
                            <Icon className="w-6 h-6 text-purple-600" />
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          
                          {/* Command/Action */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex-1 glass-light rounded-lg px-4 py-3 font-mono text-sm bg-gray-50">
                              {step.simple}
                            </div>
                            {step.id === 'start' && (
                              <button
                                onClick={() => handleCopy('/agents', step.id)}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                                  copiedStep === step.id 
                                    ? 'bg-green-500 text-white shadow-lg' 
                                    : 'glass-light hover:bg-gray-100'
                                }`}
                                aria-label="Copy command"
                              >
                                {copiedStep === step.id ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            )}
                          </div>
                          
                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                          >
                            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            {isExpanded ? 'Hide' : 'Show'} detailed instructions
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50/50 animate-fadeIn">
                        <div className="space-y-6">
                          <p className="text-gray-700">{step.details.description}</p>
                          
                          {step.details.prerequisites && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Prerequisites:</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {step.details.prerequisites.map((prereq, i) => (
                                  <li key={i}>{prereq}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {step.details.whatYouSee && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">What You'll See:</h4>
                              <pre className="glass-light rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                                {step.details.whatYouSee}
                              </pre>
                            </div>
                          )}
                          
                          {step.details.locations && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">File Locations:</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left py-2 pr-4">Type</th>
                                      <th className="text-left py-2 pr-4">Location</th>
                                      <th className="text-left py-2 pr-4">Scope</th>
                                      <th className="text-left py-2">Priority</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {step.details.locations.map((loc, i) => (
                                      <tr key={i} className="border-b">
                                        <td className="py-2 pr-4 font-medium">{loc.type}</td>
                                        <td className="py-2 pr-4 font-mono text-xs">{loc.path}</td>
                                        <td className="py-2 pr-4">{loc.scope}</td>
                                        <td className="py-2">{loc.priority}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          
                          {step.details.recommendation && (
                            <div className="glass-light rounded-lg p-4 bg-yellow-50/50">
                              <p className="text-gray-800 font-medium">{step.details.recommendation}</p>
                            </div>
                          )}
                          
                          {step.details.process && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Process:</h4>
                              <pre className="glass-light rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                                {step.details.process}
                              </pre>
                            </div>
                          )}
                          
                          {step.details.fileFormat && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">File Format:</h4>
                              <pre className="glass-light rounded-lg p-4 overflow-x-auto">
                                <code className="text-sm text-gray-800">{step.details.fileFormat}</code>
                              </pre>
                            </div>
                          )}
                          
                          {step.details.configFields && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Configuration Fields:</h4>
                              <div className="space-y-2">
                                {step.details.configFields.map((field, i) => (
                                  <div key={i} className="flex gap-2">
                                    <code className="px-2 py-1 bg-purple-100 rounded text-purple-700 text-sm font-mono">
                                      {field.field}
                                    </code>
                                    <span className="text-sm text-gray-600">
                                      ({field.required}) - {field.description}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.automaticUse && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Automatic Delegation:</h4>
                              <pre className="glass-light rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                                {step.details.automaticUse}
                              </pre>
                            </div>
                          )}
                          
                          {step.details.explicitUse && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Explicit Invocation Examples:</h4>
                              <div className="space-y-2">
                                {step.details.explicitUse.map((example, i) => (
                                  <code key={i} className="block glass-light rounded px-3 py-2 text-sm">
                                    &gt; {example}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {step.details.management && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Management:</h4>
                              <pre className="glass-light rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                                {step.details.management}
                              </pre>
                            </div>
                          )}
                          
                          {step.details.tips && (
                            <div>
                              <h4 className="font-bold mb-2 text-gray-900">Tips:</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {step.details.tips.map((tip, i) => (
                                  <li key={i}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* How to Use TARS-Foundry Prompts Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Using TARS-Foundry Gallery Prompts
              </h2>
              <p className="text-lg text-gray-600">
                Transform our curated prompts into your own powerful subagents in seconds
              </p>
            </div>

            {/* Visual Workflow */}
            <div className="glass-strong rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Copy className="w-5 h-5 text-purple-600" />
                Simple Copy-Paste Workflow
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Browse Gallery</h4>
                  <p className="text-sm text-gray-600">Find the perfect agent template from our curated collection</p>
                </div>
                
                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-gray-400" />
                </div>
                
                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Copy Prompt</h4>
                  <p className="text-sm text-gray-600">Click the copy button to get the full agent prompt</p>
                </div>
                
                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-gray-400" />
                </div>
                
                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Paste & Customize</h4>
                  <p className="text-sm text-gray-600">Replace the generated content with your copied prompt</p>
                </div>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div className="glass-strong rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-purple-600" />
                Step-by-Step Integration Guide
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-purple-600">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Find Your Agent in the Gallery</h4>
                    <p className="text-gray-600 mb-2">
                      Browse our collection and find an agent that matches your needs. Each agent includes:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Complete prompt with specialized instructions</li>
                      <li>Recommended tool configurations</li>
                      <li>Evidence and references for capabilities</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-pink-600">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Copy the Full Prompt</h4>
                    <p className="text-gray-600 mb-2">
                      Click the "Copy Prompt" button on any agent card. This copies:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>The complete YAML frontmatter configuration</li>
                      <li>The full system prompt with all instructions</li>
                      <li>Properly formatted for Claude Code compatibility</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Create Your Subagent</h4>
                    <p className="text-gray-600 mb-2">
                      Run <code className="px-1 py-0.5 bg-gray-100 rounded text-purple-700 text-sm font-mono">/agents</code> and select "Create New Agent":
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Choose project or user level</li>
                      <li>Let Claude generate the initial template</li>
                      <li>Press "e" to edit in your editor</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-green-600">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Replace with Gallery Prompt</h4>
                    <p className="text-gray-600 mb-2">
                      In your editor, replace the generated content:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Keep the YAML frontmatter structure</li>
                      <li>Update the name and description fields</li>
                      <li>Paste the gallery prompt after the frontmatter</li>
                      <li>Adjust tools list if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips and Best Practices */}
            <div className="glass-strong rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Pro Tips for Gallery Prompts
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 Customize for Your Needs</h4>
                    <p className="text-sm text-gray-600">
                      Gallery prompts are starting points. Modify them to match your specific project requirements, coding standards, and team preferences.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🔧 Adjust Tool Access</h4>
                    <p className="text-sm text-gray-600">
                      Review the recommended tools list. Add or remove tools based on what your subagent actually needs to accomplish its tasks.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📝 Update the Description</h4>
                    <p className="text-sm text-gray-600">
                      Make the description field specific to your use case. Include trigger words like "PROACTIVELY" for automatic delegation.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🚀 Test Before Production</h4>
                    <p className="text-sm text-gray-600">
                      Always test your customized subagent on sample tasks before using it in production workflows.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">💾 Version Control</h4>
                    <p className="text-sm text-gray-600">
                      Check your project subagents into git. This allows team collaboration and tracks changes over time.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🔄 Iterate and Improve</h4>
                    <p className="text-sm text-gray-600">
                      Refine your prompts based on actual usage. The best subagents evolve through real-world testing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Integration */}
            <div className="glass-strong rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-purple-600" />
                Example: Integrating a Gallery Prompt
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Gallery Prompt (What you copy):</h4>
                  <pre className="glass-light rounded-lg p-3 overflow-x-auto text-xs">
                    <code>{`---
name: code-reviewer
description: Code review with security focus
tools: [Read, Edit, Bash, Grep, Glob]
---

You are a senior code reviewer...
[Full prompt content]`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Your Customized Subagent:</h4>
                  <pre className="glass-light rounded-lg p-3 overflow-x-auto text-xs">
                    <code>{`---
name: security-reviewer
description: Use PROACTIVELY for security reviews
tools: Read, Grep, WebFetch, BashOutput
---

You are a senior code reviewer...
[Gallery prompt content customized]
# Additional project-specific rules:
- Check for SQL injection
- Validate all user inputs`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* TARS Helper Robot */}
          <div className="flex justify-center mt-16 mb-8">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* TARS in Assistant Mode */}
              <g transform="translate(100, 75)">
                {/* Body */}
                <rect x="-30" y="-20" width="60" height="60" fill="url(#assistant-body)" rx="8"/>
                
                {/* Display showing tools */}
                <rect x="-20" y="-10" width="40" height="25" fill="#1a1a2e" rx="4"/>
                <text x="0" y="-2" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">
                  Tools
                </text>
                <text x="0" y="8" textAnchor="middle" fill="#00ffff" fontSize="6" fontFamily="monospace">
                  Read, Edit
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                </text>
                
                {/* Helper Arms */}
                <g transform="translate(-40, 10)">
                  <rect x="0" y="0" width="8" height="20" fill="url(#assistant-arm)" rx="4"/>
                  <circle cx="4" cy="25" r="5" fill="#ffd700"/>
                </g>
                
                <g transform="translate(32, 10)">
                  <rect x="0" y="0" width="8" height="20" fill="url(#assistant-arm)" rx="4"/>
                  <circle cx="4" cy="25" r="5" fill="#ffd700"/>
                </g>
                
                {/* Sparkles */}
                <circle cx="-40" cy="-30" r="2" fill="#00ff88">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="40" cy="-30" r="2" fill="#00ffff">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="0" cy="-40" r="2" fill="#ff00ff">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/>
                </circle>
              </g>
              
              <defs>
                <linearGradient id="assistant-body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981"/>
                  <stop offset="100%" stopColor="#34d399"/>
                </linearGradient>
                <linearGradient id="assistant-arm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6"/>
                  <stop offset="100%" stopColor="#2dd4bf"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Additional Resources */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Additional Resources</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://docs.anthropic.com/en/docs/claude-code/sub-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-light rounded-lg p-4 hover:bg-purple-50 transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium text-gray-900">Subagents Documentation</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </a>
                
                <a
                  href="https://docs.anthropic.com/en/docs/claude-code/slash-commands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-light rounded-lg p-4 hover:bg-purple-50 transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium text-gray-900">Slash Commands</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </a>
                
                <a
                  href="https://docs.anthropic.com/en/docs/claude-code/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-light rounded-lg p-4 hover:bg-purple-50 transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium text-gray-900">Settings & Configuration</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </a>
                
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('home')}
                    className="glass-light rounded-lg p-4 hover:bg-purple-50 transition-colors flex items-center justify-between group text-left"
                  >
                    <span className="font-medium text-gray-900">Browse Agent Gallery</span>
                    <Rocket className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GettingStarted;