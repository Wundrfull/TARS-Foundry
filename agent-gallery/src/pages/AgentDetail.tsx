import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Accordion,
  AccordionItem,
  ScrollShadow,
} from '@heroui/react';
import { Agent } from '../types/agent';
import { CopyButton } from '../components/CopyButton';

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
}

export const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onBack }) => {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'json'>('markdown');

  const getFullPromptContent = () => {
    const frontMatter = `---
name: ${agent.id}
description: ${agent.summary}
tools: [${agent.tools.join(', ')}]
---`;

    // Read the full prompt from the markdown file
    // For now, we'll use the prompt from the JSON
    return `${frontMatter}\n\n${agent.prompt}`;
  };

  const handleExport = () => {
    const content = exportFormat === 'markdown' 
      ? getFullPromptContent()
      : JSON.stringify(agent, null, 2);
    
    const blob = new Blob([content], { 
      type: exportFormat === 'markdown' ? 'text/markdown' : 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agent.id}.${exportFormat === 'markdown' ? 'md' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get domain style class (same as Home component)
  const getDomainClass = (domain: string) => {
    const domainClasses: Record<string, string> = {
      coding: 'domain-coding',
      security: 'domain-security',
      testing: 'domain-testing',
      documentation: 'domain-documentation',
      architecture: 'domain-architecture',
      optimization: 'domain-optimization',
      compliance: 'domain-security',
      planning: 'domain-architecture',
      troubleshooting: 'domain-optimization',
      communication: 'domain-documentation',
    };
    return domainClasses[domain] || 'domain-default';
  };

  // Tool icons mapping (same as Home component)
  const toolIcons: Record<string, string> = {
    Read: 'R',
    Edit: 'E',
    Bash: 'B',
    Grep: 'G',
    Glob: 'F',
    Write: 'W'
  };

  return (
    <>
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      {/* Modern Navigation Bar with glassmorphism */}
      <nav className="nav-modern">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-white/90 border border-gray-200 text-gray-700 hover:bg-white hover:border-purple-400 hover:shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Gallery
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {agent.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const content = getFullPromptContent();
                navigator.clipboard.writeText(content);
              }}
              className="btn-ghost text-sm"
            >
              Copy Full
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(agent.prompt);
              }}
              className="btn-ghost text-sm"
            >
              Copy Prompt
            </button>
            <button
              onClick={handleExport}
              className="btn-gradient text-sm"
            >
              Export {exportFormat === 'markdown' ? '.md' : '.json'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-28 pb-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Metadata Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="glass-strong rounded-xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Agent Metadata</h3>
                  </div>

                  {/* Domain */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Domain</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.domain.map((domain) => (
                        <span
                          key={domain}
                          className={`${getDomainClass(domain)} domain-pill`}
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* Tools Required */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Tools Required</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.tools.map((tool) => (
                        <span
                          key={tool}
                          className="tool-badge"
                          title={tool}
                        >
                          {toolIcons[tool] || tool.charAt(0)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* Tags */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  {/* Export Options */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Export Format</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExportFormat('markdown')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                          exportFormat === 'markdown'
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-400 hover:shadow-sm'
                        }`}
                      >
                        Markdown
                      </button>
                      <button
                        onClick={() => setExportFormat('json')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                          exportFormat === 'json'
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-400 hover:shadow-sm'
                        }`}
                      >
                        JSON
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <div className="glass-strong rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
                <p className="text-base text-gray-700 leading-relaxed">{agent.summary}</p>
              </div>

              {/* Full Prompt Card */}
              <div className="glass-strong rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Full Prompt</h2>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getFullPromptContent());
                    }}
                    className="btn-ghost text-sm"
                  >
                    Copy
                  </button>
                </div>
                <div className="relative">
                  <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 border border-gray-200 p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                      {getFullPromptContent()}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="space-y-4">
                {/* Usage Instructions */}
                <details className="glass-strong rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-900">Usage Instructions</h2>
                    <svg className="w-5 h-5 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">To use this agent in Claude Code:</p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Copy the full prompt using the button above</li>
                      <li>Save it as a <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono">.md</code> file in your project</li>
                      <li>Invoke the agent using Claude Code's agent system</li>
                      <li>Ensure the required tools are enabled in your environment</li>
                    </ol>
                  </div>
                </details>

                {/* Required Tools */}
                <details className="glass-strong rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-900">Required Tools</h2>
                    <svg className="w-5 h-5 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">This agent requires the following Claude Code tools:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {agent.tools.map((tool) => (
                        <li key={tool} className="flex items-start gap-3">
                          <span className="tool-badge !w-6 !h-6 text-xs mt-0.5" title={tool}>
                            {toolIcons[tool] || tool.charAt(0)}
                          </span>
                          <div>
                            <span className="font-semibold text-gray-800">{tool}</span>
                            <span className="text-gray-600 ml-2">
                              {tool === 'Read' && '- Read files from the filesystem'}
                              {tool === 'Edit' && '- Edit existing files'}
                              {tool === 'Bash' && '- Execute bash commands'}
                              {tool === 'Grep' && '- Search file contents'}
                              {tool === 'Glob' && '- Find files by pattern'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};