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

  return (
    <>
      <Navbar isBordered className="nav-header bg-white shadow-sm">
        <NavbarContent justify="start">
          <NavbarItem>
            <Button
              variant="light"
              onPress={onBack}
              startContent={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              }
            >
              Back to Gallery
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarBrand>
          <h1 className="font-bold text-2xl text-kg-text-primary">{agent.title}</h1>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <ButtonGroup size="sm">
              <CopyButton
                text={getFullPromptContent()}
                label="Copy Full"
                size="sm"
                variant="flat"
              />
              <CopyButton
                text={agent.prompt}
                label="Copy Prompt"
                size="sm"
                variant="flat"
              />
              <Button
                size="sm"
                variant="solid"
                color="primary"
                onPress={handleExport}
              >
                Export {exportFormat === 'markdown' ? '.md' : '.json'}
              </Button>
            </ButtonGroup>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="container-wrapper section animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metadata sidebar */}
          <div className="lg:col-span-1">
            <Card className="agent-card sticky top-4">
              <CardHeader>
                <h3 className="text-lg font-semibold text-kg-text-primary">Agent Metadata</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-kg-text-tertiary mb-2">Domain</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.domain.map((d) => (
                      <Chip key={d} size="sm" variant="flat" color="primary">
                        {d}
                      </Chip>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <p className="text-sm font-medium text-kg-text-tertiary mb-2">Tools Required</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.tools.map((tool) => (
                      <Chip key={tool} size="sm" variant="bordered">
                        {tool}
                      </Chip>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <p className="text-sm font-medium text-kg-text-tertiary mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.tags.map((tag) => (
                      <Chip key={tag} size="sm" variant="dot">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <p className="text-sm font-medium text-kg-text-tertiary mb-2">Export Options</p>
                  <ButtonGroup size="sm" className="w-full">
                    <Button
                      variant={exportFormat === 'markdown' ? 'solid' : 'flat'}
                      onPress={() => setExportFormat('markdown')}
                    >
                      Markdown
                    </Button>
                    <Button
                      variant={exportFormat === 'json' ? 'solid' : 'flat'}
                      onPress={() => setExportFormat('json')}
                    >
                      JSON
                    </Button>
                  </ButtonGroup>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="agent-card">
              <CardHeader>
                <h2 className="text-xl font-semibold text-kg-text-primary">Summary</h2>
              </CardHeader>
              <CardBody>
                <p className="text-base text-kg-text-secondary leading-relaxed">{agent.summary}</p>
              </CardBody>
            </Card>

            <Card className="agent-card">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-kg-text-primary">Full Prompt</h2>
                <CopyButton
                  text={getFullPromptContent()}
                  size="sm"
                />
              </CardHeader>
              <CardBody>
                <ScrollShadow className="max-h-96">
                  <div className="code-block">
                    <pre className="whitespace-pre-wrap text-kg-text-primary">{getFullPromptContent()}</pre>
                  </div>
                </ScrollShadow>
              </CardBody>
            </Card>

            <Accordion variant="bordered" className="border-kg-border-primary">
              <AccordionItem key="usage" title="Usage Instructions">
                <div className="p-4 text-sm text-default-600 space-y-2">
                  <p>To use this agent in Claude Code:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Copy the full prompt using the button above</li>
                    <li>Save it as a <code className="text-xs bg-default-100 px-1 py-0.5 rounded">.md</code> file in your project</li>
                    <li>Invoke the agent using Claude Code's agent system</li>
                    <li>Ensure the required tools are enabled in your environment</li>
                  </ol>
                </div>
              </AccordionItem>
              <AccordionItem key="tools" title="Required Tools">
                <div className="p-4 text-sm text-default-600">
                  <p className="mb-3">This agent requires the following Claude Code tools:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {agent.tools.map((tool) => (
                      <li key={tool}>
                        <span className="font-semibold">{tool}</span>
                        {tool === 'Read' && ' - Read files from the filesystem'}
                        {tool === 'Edit' && ' - Edit existing files'}
                        {tool === 'Bash' && ' - Execute bash commands'}
                        {tool === 'Grep' && ' - Search file contents'}
                        {tool === 'Glob' && ' - Find files by pattern'}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};