import React, { useState, useMemo, useEffect } from 'react';
import { Agent } from '../types/agent';

interface HomeProps {
  agents: Agent[];
  onViewDetails: (agent: Agent) => void;
}

export const Home: React.FC<HomeProps> = ({ agents, onViewDetails }) => {
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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-6 reveal">
            TARS-Foundry
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            A curated collection of <span className="text-gradient font-semibold">Claude sub-agent</span> templates 
            to supercharge your AI workflows
          </p>
          
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

      {/* Main Content - Improved Bento Grid */}
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
            <div className="bento-grid">
              {filteredAgents.map((agent, index) => {
                const isFeatured = index === 0;
                const isWide = index === 3 || index === 5;
                const isTall = index === 2;
                
                return (
                  <div
                    key={agent.id}
                    className={`
                      bento-card group card-content
                      ${isFeatured ? 'bento-card-featured' : ''}
                      ${isWide ? 'bento-card-wide' : ''}
                      ${isTall ? 'bento-card-tall' : ''}
                    `}
                    style={{
                      animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0
                    }}
                    onClick={() => onViewDetails(agent)}
                    role="article"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onViewDetails(agent);
                      }
                    }}
                  >
                    {/* Card Header */}
                    <div className="card-header">
                      <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
                        isFeatured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {agent.title}
                      </h3>
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

                    {/* Card Body */}
                    <div className="card-body">
                      <p className={`text-sm md:text-base ${
                        isFeatured ? 'text-white/95' : 'text-gray-600'
                      } ${isTall || isFeatured ? '' : 'line-clamp-2'}`}>
                        {agent.summary}
                      </p>
                      
                      {/* Tags with proper styling */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {agent.tags.slice(0, isFeatured || isTall ? 5 : 3).map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isFeatured 
                                ? 'bg-white/20 text-white border border-white/30' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {agent.tags.length > (isFeatured || isTall ? 5 : 3) && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isFeatured 
                              ? 'bg-white/20 text-white border border-white/30' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            +{agent.tags.length - (isFeatured || isTall ? 5 : 3)} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className={`card-footer flex items-center justify-between ${
                      isFeatured ? 'border-white/20' : ''
                    }`}>
                      {/* Tools Display */}
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          isFeatured ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          Tools:
                        </span>
                        <div className="flex gap-1">
                          {agent.tools.map((tool) => (
                            <span
                              key={tool}
                              className={`tool-badge ${
                                isFeatured 
                                  ? 'bg-white/20 text-white border-white/30' 
                                  : ''
                              }`}
                              title={tool}
                            >
                              {toolIcons[tool] || tool.charAt(0)}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(agent);
                          }}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            isFeatured 
                              ? 'bg-white/20 text-white hover:bg-white/30' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${copiedId === agent.id ? 'bg-green-500 text-white' : ''}`}
                          aria-label={`Copy prompt for ${agent.title}`}
                        >
                          {copiedId === agent.id ? '✓ Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(agent);
                          }}
                          className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                            isFeatured 
                              ? 'bg-white text-purple-700 hover:bg-gray-100' 
                              : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                          }`}
                          aria-label={`View details for ${agent.title}`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              <h3 className="font-semibold mb-3 text-gray-900">Select Tags</h3>
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