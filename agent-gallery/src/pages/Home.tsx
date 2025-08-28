import React, { useState, useMemo, useEffect } from 'react';
import { Agent } from '../types/agent';

interface HomeProps {
  agents: Agent[];
  onViewDetails: (agent: Agent) => void;
  onNavigate: (page: 'home' | 'getting-started') => void;
}

export const Home: React.FC<HomeProps> = ({ agents, onViewDetails, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Extract unique tags and domains
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    agents.forEach(agent => agent.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [agents]);

  const allDomains = useMemo(() => {
    const domains = new Set<string>();
    agents.forEach(agent => agent.domain.forEach(d => domains.add(d)));
    return Array.from(domains).sort();
  }, [agents]);

  // Filter agents based on search and filters
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch = searchQuery === '' || 
        agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => agent.tags.includes(tag));

      const matchesDomain = selectedDomain === 'all' ||
        agent.domain.includes(selectedDomain);

      return matchesSearch && matchesTags && matchesDomain;
    });
  }, [agents, searchQuery, selectedTags, selectedDomain]);

  const handleCopyPrompt = async (agent: Agent) => {
    try {
      const markdownContent = `---
name: ${agent.id}
description: ${agent.summary}
tools: [${agent.tools.join(', ')}]
---

${agent.prompt}`;
      await navigator.clipboard.writeText(markdownContent);
      setCopiedId(agent.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedDomain('all');
  };

  // Get domain style class
  const getDomainClass = (domain: string) => {
    const domainClasses: Record<string, string> = {
      Development: 'domain-development',
      Security: 'domain-security',
      Quality: 'domain-quality',
      Architecture: 'domain-architecture',
      Operations: 'domain-operations',
      Documentation: 'domain-documentation',
    };
    return domainClasses[domain] || 'domain-default';
  };

  // Tool icons mapping
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

      {/* Modern Navigation Bar */}
      <nav className="nav-modern">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Agent Gallery
            </h2>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {filteredAgents.length} agents
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('getting-started')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Getting Started
            </button>
            <div className="relative">
              <input
                type="search"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-strong px-4 py-2 pr-10 rounded-lg w-48 md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Search agents"
              />
              <svg
                className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with proper contrast */}
      <section className={`pt-28 pb-12 px-4 md:px-6 transition-all duration-1000 relative z-10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center relative">
          {/* 3D Isometric TARS Robot - Left Side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Kurzgesagt-style 3D TARS blocks */}
              {/* Main body blocks in isometric view */}
              <g transform="translate(50, 100)">
                {/* Block 1 - Top */}
                <path d="M0 0 L60 -30 L60 50 L0 80 Z" fill="url(#grad-purple)" opacity="0.9"/>
                <path d="M60 -30 L100 -10 L100 70 L60 50 Z" fill="url(#grad-purple-dark)" opacity="0.9"/>
                <path d="M0 0 L40 20 L100 -10 L60 -30 Z" fill="url(#grad-purple-light)" opacity="0.9"/>
                
                {/* Animated display panel */}
                <rect x="10" y="10" width="35" height="20" fill="#1a1a2e" rx="2"/>
                <rect x="12" y="12" width="31" height="3" fill="#00ff88" opacity="0.8">
                  <animate attributeName="width" values="10;31;10" dur="3s" repeatCount="indefinite"/>
                </rect>
                <rect x="12" y="17" width="20" height="2" fill="#00ffff" opacity="0.6">
                  <animate attributeName="width" values="5;20;5" dur="2.5s" repeatCount="indefinite"/>
                </rect>
                <rect x="12" y="21" width="25" height="2" fill="#ff00ff" opacity="0.6">
                  <animate attributeName="width" values="8;25;8" dur="2s" repeatCount="indefinite"/>
                </rect>
                
                {/* Block 2 - Middle with rotation */}
                <g transform="translate(0, 85)">
                  <animateTransform attributeName="transform" type="rotate" values="0 30 15;5 30 15;0 30 15" dur="8s" repeatCount="indefinite" additive="sum"/>
                  <path d="M0 0 L60 -30 L60 50 L0 80 Z" fill="url(#grad-blue)" opacity="0.9"/>
                  <path d="M60 -30 L100 -10 L100 70 L60 50 Z" fill="url(#grad-blue-dark)" opacity="0.9"/>
                  <path d="M0 0 L40 20 L100 -10 L60 -30 Z" fill="url(#grad-blue-light)" opacity="0.9"/>
                  
                  {/* Glowing core */}
                  <circle cx="30" cy="25" r="8" fill="#00ffff" opacity="0.6">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Block 3 - Bottom */}
                <g transform="translate(0, 170)">
                  <path d="M0 0 L60 -30 L60 50 L0 80 Z" fill="url(#grad-green)" opacity="0.9"/>
                  <path d="M60 -30 L100 -10 L100 70 L60 50 Z" fill="url(#grad-green-dark)" opacity="0.9"/>
                  <path d="M0 0 L40 20 L100 -10 L60 -30 Z" fill="url(#grad-green-light)" opacity="0.9"/>
                  
                  {/* Animated joints */}
                  <circle cx="15" cy="15" r="4" fill="#ffd700">
                    <animate attributeName="fill" values="#ffd700;#ff6b6b;#ffd700" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="45" cy="5" r="4" fill="#ff6b6b">
                    <animate attributeName="fill" values="#ff6b6b;#ffd700;#ff6b6b" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Connecting joints with glow effect */}
                <circle cx="30" cy="80" r="6" fill="#fff" opacity="0.9"/>
                <circle cx="30" cy="80" r="10" fill="#fff" opacity="0.3">
                  <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                <circle cx="30" cy="165" r="6" fill="#fff" opacity="0.9"/>
                <circle cx="30" cy="165" r="10" fill="#fff" opacity="0.3">
                  <animate attributeName="r" values="10;15;10" dur="2s" begin="1s" repeatCount="indefinite"/>
                </circle>
              </g>
              
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea"/>
                  <stop offset="100%" stopColor="#c084fc"/>
                </linearGradient>
                <linearGradient id="grad-purple-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b21a8"/>
                  <stop offset="100%" stopColor="#9333ea"/>
                </linearGradient>
                <linearGradient id="grad-purple-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc"/>
                  <stop offset="100%" stopColor="#e9d5ff"/>
                </linearGradient>
                
                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#60a5fa"/>
                </linearGradient>
                <linearGradient id="grad-blue-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="grad-blue-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#93c5fd"/>
                </linearGradient>
                
                <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981"/>
                  <stop offset="100%" stopColor="#34d399"/>
                </linearGradient>
                <linearGradient id="grad-green-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#047857"/>
                  <stop offset="100%" stopColor="#10b981"/>
                </linearGradient>
                <linearGradient id="grad-green-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399"/>
                  <stop offset="100%" stopColor="#6ee7b7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 3D Isometric TARS Robot - Right Side (Different configuration) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Walking/Extended configuration */}
              <g transform="translate(50, 80)">
                {/* Top block rotated */}
                <g transform="rotate(-15, 50, 40)">
                  <path d="M20 40 L80 10 L80 90 L20 120 Z" fill="url(#grad2-pink)" opacity="0.9"/>
                  <path d="M80 10 L120 30 L120 110 L80 90 Z" fill="url(#grad2-pink-dark)" opacity="0.9"/>
                  <path d="M20 40 L60 60 L120 30 L80 10 Z" fill="url(#grad2-pink-light)" opacity="0.9"/>
                  
                  {/* LED indicators */}
                  <circle cx="40" cy="60" r="3" fill="#00ff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="50" cy="55" r="3" fill="#ffff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="60" cy="50" r="3" fill="#ff0000">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.6s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Middle block with articulation */}
                <g transform="translate(-20, 100)">
                  <animateTransform attributeName="transform" type="rotate" values="-5 50 40;5 50 40;-5 50 40" dur="6s" repeatCount="indefinite" additive="sum"/>
                  <path d="M40 20 L100 -10 L100 70 L40 100 Z" fill="url(#grad2-orange)" opacity="0.9"/>
                  <path d="M100 -10 L140 10 L140 90 L100 70 Z" fill="url(#grad2-orange-dark)" opacity="0.9"/>
                  <path d="M40 20 L80 40 L140 10 L100 -10 Z" fill="url(#grad2-orange-light)" opacity="0.9"/>
                  
                  {/* Data stream visualization */}
                  <rect x="55" y="30" width="2" height="20" fill="#00ffff">
                    <animate attributeName="y" values="30;50;30" dur="1.5s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="65" y="35" width="2" height="15" fill="#ff00ff">
                    <animate attributeName="y" values="35;50;35" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="75" y="40" width="2" height="10" fill="#ffff00">
                    <animate attributeName="y" values="40;50;40" dur="1.5s" begin="1s" repeatCount="indefinite"/>
                  </rect>
                </g>
                
                {/* Bottom block extended */}
                <g transform="translate(10, 180)">
                  <path d="M0 20 L60 -10 L60 70 L0 100 Z" fill="url(#grad2-cyan)" opacity="0.9"/>
                  <path d="M60 -10 L100 10 L100 90 L60 70 Z" fill="url(#grad2-cyan-dark)" opacity="0.9"/>
                  <path d="M0 20 L40 40 L100 10 L60 -10 Z" fill="url(#grad2-cyan-light)" opacity="0.9"/>
                  
                  {/* Rotating gear */}
                  <g transform="translate(30, 30)">
                    <animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" dur="4s" repeatCount="indefinite" additive="sum"/>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#ffd700" strokeWidth="2"/>
                    <rect x="-2" y="-8" width="4" height="16" fill="#ffd700"/>
                    <rect x="-8" y="-2" width="16" height="4" fill="#ffd700"/>
                  </g>
                </g>
                
                {/* Energy connections */}
                <line x1="50" y1="95" x2="70" y2="105" stroke="#00ffff" strokeWidth="2" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="70" y1="175" x2="70" y2="185" stroke="#ff00ff" strokeWidth="2" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                </line>
              </g>
              
              {/* Additional gradient definitions */}
              <defs>
                <linearGradient id="grad2-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899"/>
                  <stop offset="100%" stopColor="#f9a8d4"/>
                </linearGradient>
                <linearGradient id="grad2-pink-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#be185d"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
                <linearGradient id="grad2-pink-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9a8d4"/>
                  <stop offset="100%" stopColor="#fce7f3"/>
                </linearGradient>
                
                <linearGradient id="grad2-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316"/>
                  <stop offset="100%" stopColor="#fb923c"/>
                </linearGradient>
                <linearGradient id="grad2-orange-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c2410c"/>
                  <stop offset="100%" stopColor="#f97316"/>
                </linearGradient>
                <linearGradient id="grad2-orange-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c"/>
                  <stop offset="100%" stopColor="#fed7aa"/>
                </linearGradient>
                
                <linearGradient id="grad2-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4"/>
                  <stop offset="100%" stopColor="#22d3ee"/>
                </linearGradient>
                <linearGradient id="grad2-cyan-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0891b2"/>
                  <stop offset="100%" stopColor="#06b6d4"/>
                </linearGradient>
                <linearGradient id="grad2-cyan-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee"/>
                  <stop offset="100%" stopColor="#67e8f9"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Central floating TARS display */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 3D Cube with perspective */}
                <g transform="translate(60, 60)">
                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" additive="sum"/>
                  
                  {/* Back face */}
                  <path d="M-30 -30 L30 -30 L30 30 L-30 30 Z" fill="#1a1a2e" opacity="0.6"/>
                  
                  {/* Left face */}
                  <path d="M-30 -30 L-20 -40 L-20 20 L-30 30 Z" fill="url(#center-grad-left)"/>
                  
                  {/* Right face */}
                  <path d="M30 -30 L20 -40 L20 20 L30 30 Z" fill="url(#center-grad-right)"/>
                  
                  {/* Top face */}
                  <path d="M-30 -30 L-20 -40 L20 -40 L30 -30 Z" fill="url(#center-grad-top)"/>
                  
                  {/* Front face with display */}
                  <rect x="-25" y="-25" width="50" height="50" fill="#0a0a0f" rx="3"/>
                  
                  {/* Animated display elements */}
                  <rect x="-20" y="-20" width="40" height="3" fill="#00ff88" opacity="0.8">
                    <animate attributeName="width" values="10;40;10" dur="3s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="-20" y="-12" width="30" height="2" fill="#00ffff" opacity="0.6">
                    <animate attributeName="width" values="5;30;5" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
                  </rect>
                  <rect x="-20" y="-5" width="35" height="2" fill="#ff00ff" opacity="0.6">
                    <animate attributeName="width" values="8;35;8" dur="2s" begin="1s" repeatCount="indefinite"/>
                  </rect>
                  
                  {/* Status dots */}
                  <circle cx="-15" cy="10" r="2" fill="#00ff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="0" cy="10" r="2" fill="#ffff00">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="15" cy="10" r="2" fill="#ff0000">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                {/* Orbiting particles */}
                <circle cx="60" cy="20" r="3" fill="#00ffff" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="100" cy="60" r="3" fill="#ff00ff" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="7s" repeatCount="indefinite"/>
                </circle>
                <circle cx="60" cy="100" r="3" fill="#ffff00" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="9s" repeatCount="indefinite"/>
                </circle>
                
                <defs>
                  <linearGradient id="center-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#a78bfa"/>
                  </linearGradient>
                  <linearGradient id="center-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899"/>
                    <stop offset="100%" stopColor="#f9a8d4"/>
                  </linearGradient>
                  <linearGradient id="center-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                    <stop offset="50%" stopColor="#3b82f6"/>
                    <stop offset="75%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h1 className="mb-6 reveal flex items-center justify-center gap-4">
            <span>TARS</span>
            <span className="text-4xl md:text-5xl lg:text-6xl">-</span>
            <span>Foundry</span>
          </h1>

          <div className="relative mb-8">
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              A curated collection of <span className="text-gradient font-semibold">Claude sub-agent</span> templates 
              to supercharge your AI workflows
            </p>
            
            {/* Animated typing indicator */}
            <div className="flex justify-center mt-4 gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-ping"></span>
              <span className="w-2 h-2 bg-pink-600 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{agents.length}</div>
              <div className="text-sm text-gray-600">Specialized Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{allDomains.length}</div>
              <div className="text-sm text-gray-600">Domain Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{allTags.length}+</div>
              <div className="text-sm text-gray-600">Unique Capabilities</div>
            </div>
          </div>
          
          {/* Domain Filter Pills with better contrast */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedDomain === 'all' 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-400 hover:shadow-sm'
              }`}
              aria-pressed={selectedDomain === 'all'}
            >
              All Domains
            </button>
            {allDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(selectedDomain === domain ? 'all' : domain)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedDomain === domain 
                    ? `${getDomainClass(domain)} domain-pill text-white shadow-md` 
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-400 hover:shadow-sm'
                }`}
                aria-pressed={selectedDomain === domain}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Table Layout with Featured Cards */}
      <section className="px-4 md:px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {filteredAgents.length === 0 ? (
            <div className="glass-strong rounded-xl p-12 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">No agents found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="btn-gradient"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex gap-6">
              {/* Featured Cards Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Agents</h3>
                <div className="space-y-4">
                  {filteredAgents.slice(0, 2).map((agent, index) => (
                    <div
                      key={agent.id}
                      className="featured-card group cursor-pointer"
                      onClick={() => onViewDetails(agent)}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        opacity: 0
                      }}
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-3">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.016 9.385c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.958z"/>
                        </svg>
                        FEATURED
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{agent.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{agent.summary}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {agent.domain.map((domain) => (
                          <span
                            key={domain}
                            className={`${getDomainClass(domain)} domain-pill text-xs`}
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(agent);
                          }}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex-1 ${
                            copiedId === agent.id 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {copiedId === agent.id ? (
                            <>
                              <svg className="w-4 h-4 mr-1 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Copied
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Prompt
                            </>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(agent);
                          }}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 flex-1"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Table */}
              <div className="flex-1 overflow-x-auto">
                <div className="glass-strong rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Agent</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Domain</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Tags</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAgents.map((agent, index) => (
                        <tr
                          key={agent.id}
                          className="hover:bg-purple-50/30 transition-colors cursor-pointer"
                          onClick={() => onViewDetails(agent)}
                          style={{
                            animationDelay: `${Math.min(index * 0.03, 0.5)}s`,
                            animation: 'fadeIn 0.6s ease-out forwards',
                            opacity: 0
                          }}
                        >
                          <td className="px-4 py-4">
                            <div>
                              <div className="text-base font-semibold text-gray-900">{agent.title}</div>
                              <div className="text-sm text-gray-600 mt-1">{agent.summary}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {agent.domain.map((domain) => (
                                <span
                                  key={domain}
                                  className={`${getDomainClass(domain)} domain-pill text-xs`}
                                >
                                  {domain}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {agent.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
                                >
                                  {tag}
                                </span>
                              ))}
                              {agent.tags.length > 3 && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                  +{agent.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyPrompt(agent);
                                }}
                                className={`p-2 rounded-md text-xs font-medium transition-all flex items-center justify-center ${
                                  copiedId === agent.id 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                aria-label={`Copy prompt for ${agent.title}`}
                              >
                                {copiedId === agent.id ? (
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onViewDetails(agent);
                                }}
                                className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                                aria-label={`View details for ${agent.title}`}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contribution Call-to-Action */}
      <section className="py-16 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            {/* TARS Robot SVG */}
            <div className="mb-6 flex justify-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="animate-float"
              >
                {/* Robot Body */}
                <rect x="35" y="40" width="50" height="60" rx="8" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2"/>
                
                {/* Robot Head */}
                <rect x="40" y="20" width="40" height="25" rx="6" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
                
                {/* Eyes */}
                <circle cx="50" cy="30" r="4" fill="#FFF"/>
                <circle cx="70" cy="30" r="4" fill="#FFF"/>
                <circle cx="51" cy="31" r="2" fill="#1F2937"/>
                <circle cx="71" cy="31" r="2" fill="#1F2937"/>
                
                {/* Antenna */}
                <line x1="60" y1="20" x2="60" y2="10" stroke="#6D28D9" strokeWidth="2"/>
                <circle cx="60" cy="8" r="3" fill="#FCD34D"/>
                
                {/* Arms */}
                <rect x="25" y="50" width="10" height="30" rx="5" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
                <rect x="85" y="50" width="10" height="30" rx="5" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
                
                {/* Sign */}
                <rect x="15" y="75" width="90" height="30" rx="4" fill="#FFF" stroke="#6D28D9" strokeWidth="2"/>
                <text x="60" y="92" textAnchor="middle" className="fill-purple-700 font-bold text-xs">
                  Contribute!
                </text>
                
                {/* Chest Display */}
                <rect x="45" y="50" width="30" height="20" rx="2" fill="#1F2937"/>
                <text x="60" y="63" textAnchor="middle" className="fill-green-400 font-mono text-xs">
                  TARS
                </text>
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              Want to Contribute?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Help us expand the TARS-Foundry Agent Gallery with new specialized agents, improvements, and ideas!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/Wundrfull/TARS-Foundry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient flex items-center gap-2 px-6 py-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              
              <div className="text-gray-600">
                <span className="font-semibold">Reach out to:</span>
                <span className="ml-2 font-bold text-purple-700">Noah Peloquin</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Share your agent ideas, report bugs, or submit pull requests to help make TARS-Foundry even better!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Floating Tag Filter */}
      {allTags.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <details className="relative">
            <summary className="btn-gradient cursor-pointer list-none flex items-center gap-2 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Filter Tags</span>
              {selectedTags.length > 0 && (
                <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-bold">
                  {selectedTags.length}
                </span>
              )}
            </summary>
            
            <div className="absolute bottom-full right-0 mb-3 p-4 glass-strong rounded-xl w-72 max-h-80 overflow-y-auto shadow-xl">
              <h3 className="font-semibold mb-3 text-gray-900">Filter by Tags</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag]);
                        } else {
                          setSelectedTags(selectedTags.filter(t => t !== tag));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-3 w-full btn-ghost text-sm text-gray-700"
                >
                  Clear All Tags
                </button>
              )}
            </div>
          </details>
        </div>
      )}
    </>
  );
};