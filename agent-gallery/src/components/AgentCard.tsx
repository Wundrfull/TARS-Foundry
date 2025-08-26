import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Chip, Button, Divider, Tooltip } from '@heroui/react';
import { Agent } from '../types/agent';

interface AgentCardProps {
  agent: Agent;
  onViewDetails: (agent: Agent) => void;
  onCopyPrompt: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onViewDetails, onCopyPrompt }) => {
  const getDomainColor = (domain: string): string => {
    const colors: Record<string, string> = {
      coding: 'bg-kg-button-primary text-white',
      security: 'bg-kg-accent-orange text-white',
      testing: 'bg-kg-accent-yellow text-kg-text-primary',
      documentation: 'bg-kg-bg-tertiary text-kg-text-secondary',
      architecture: 'bg-kg-accent-purple text-white',
      optimization: 'bg-kg-accent-pink text-white',
      compliance: 'bg-kg-accent-orange text-white',
      planning: 'bg-kg-accent-yellow text-kg-text-primary',
      troubleshooting: 'bg-kg-accent-purple text-white',
      communication: 'bg-kg-bg-tertiary text-kg-text-secondary',
    };
    return colors[domain] || 'bg-kg-bg-secondary text-kg-text-secondary';
  };

  return (
    <Card className="agent-card h-full flex flex-col">
      <CardHeader className="flex flex-col items-start gap-3 pb-3">
        <h3 className="text-xl font-semibold text-kg-text-primary leading-tight">{agent.title}</h3>
        <div className="flex flex-wrap gap-2">
          {agent.domain.map((domain) => (
            <span
              key={domain}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDomainColor(domain)}`}
            >
              {domain}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardBody className="py-3 flex-grow">
        <p className="text-base text-kg-text-secondary line-clamp-3 leading-relaxed">{agent.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {agent.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
          {agent.tags.length > 3 && (
            <span className="tag-chip">
              +{agent.tags.length - 3} more
            </span>
          )}
        </div>
      </CardBody>
      <Divider className="bg-kg-border-primary" />
      <CardFooter className="gap-3 pt-4">
        <div className="flex items-center gap-2 text-sm text-kg-text-tertiary">
          <span className="font-medium">Tools:</span>
          <div className="flex gap-1">
            {agent.tools.map((tool) => (
              <Tooltip key={tool} content={tool}>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-kg-bg-secondary text-kg-text-secondary text-xs font-medium border border-kg-border-primary hover:bg-kg-bg-tertiary transition-colors">
                  {tool.charAt(0)}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            className="btn-secondary"
            onPress={() => onCopyPrompt(agent)}
          >
            Copy
          </Button>
          <Button
            size="sm"
            className="btn-primary"
            onPress={() => onViewDetails(agent)}
          >
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};