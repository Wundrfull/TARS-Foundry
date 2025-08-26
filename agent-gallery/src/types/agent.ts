export interface Agent {
  id: string;
  title: string;
  domain: string[];
  summary: string;
  tools: string[];
  tags: string[];
  prompt: string;
}