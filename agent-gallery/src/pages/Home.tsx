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
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedDomain('all');
  };

  // Get gradient classes for domains
  const getDomainGradient = (domain: string) => {
    const gradients: Record<string, string> = {
      coding: 'from-blue-500 to-purple-600',
      security: 'from-red-500 to-orange-600',
      testing: 'from-green-500 to-teal-600',
      documentation: 'from-indigo-500 to-blue-600',
      architecture: 'from-purple-500 to-pink-600',
      optimization: 'from-yellow-500 to-orange-500',
      compliance: 'from-gray-600 to-gray-800',
      planning: 'from-cyan-500 to-blue-500',
      troubleshooting: 'from-pink-500 to-red-500',
      communication: 'from-teal-500 to-green-500',
    };
    return gradients[domain] || 'from-gray-500 to-gray-700';
  };

  return (
    <>
      {/* Modern Navigation Bar */}
      <nav className="nav-modern">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gradient">
              Agent Gallery
            </h2>
            <span className="text-sm text-zinc-500">
              {filteredAgents.length} agents
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass px-4 py-2 pr-10 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <svg
                className="absolute right-3 top-2.5 w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-4 md:px-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-6 animate-bounce-in">
            TARS-Foundry
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 mb-8 max-w-3xl mx-auto">
            A curated collection of <span className="text-gradient font-semibold">Claude sub-agent</span> templates 
            to supercharge your AI workflows
          </p>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`tag-modern ${selectedDomain === 'all' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : ''}`}
            >
              All Domains
            </button>
            {allDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(selectedDomain === domain ? 'all' : domain)}
                className={`tag-modern ${selectedDomain === domain ? 'bg-gradient-to-r ' + getDomainGradient(domain) + ' text-white' : ''}`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Bento Grid Layout */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredAgents.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <h3 className="text-2xl font-semibold mb-4">No agents found</h3>
              <p className="text-zinc-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="btn-gradient"
              >
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <div className="bento-grid">
              {filteredAgents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`
                    bento-card card-3d group
                    ${index === 0 ? 'bento-card-featured' : ''}
                    ${index === 3 || index === 5 ? 'bento-card-wide' : ''}
                    ${index === 2 ? 'bento-card-tall' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'bounce-in 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {/* Gradient Background for featured card */}
                  {index === 0 && (
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className={`text-xl md:text-2xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-zinc-800'}`}>
                        {agent.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {agent.domain.map((domain) => (
                          <span
                            key={domain}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              index === 0 ? 'bg-white/20 text-white' : 'bg-gradient-to-r ' + getDomainGradient(domain) + ' text-white'
                            }`}
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className={`flex-grow text-sm md:text-base mb-4 ${
                      index === 0 ? 'text-white/90' : 'text-zinc-600'
                    } ${index === 2 ? '' : 'line-clamp-3'}`}>
                      {agent.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.slice(0, index === 0 || index === 2 ? 5 : 3).map((tag) => (
                        <span
                          key={tag}
                          className={`tag-modern text-xs ${
                            index === 0 ? 'bg-white/10 text-white border-white/20' : ''
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {agent.tags.length > (index === 0 || index === 2 ? 5 : 3) && (
                        <span className={`tag-modern text-xs ${
                          index === 0 ? 'bg-white/10 text-white border-white/20' : ''
                        }`}>
                          +{agent.tags.length - (index === 0 || index === 2 ? 5 : 3)}
                        </span>
                      )}
                    </div>

                    {/* Tools & Actions */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        {agent.tools.map((tool) => (
                          <span
                            key={tool}
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                              index === 0 
                                ? 'bg-white/10 text-white backdrop-blur-sm' 
                                : 'glass text-zinc-700'
                            }`}
                            title={tool}
                          >
                            {tool.charAt(0)}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(agent);
                          }}
                          className={`${
                            index === 0 
                              ? 'btn-ghost text-white hover:bg-white/20' 
                              : 'btn-ghost hover:bg-zinc-100'
                          } px-4 py-2 text-sm`}
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => onViewDetails(agent)}
                          className={`${
                            index === 0 
                              ? 'bg-white/20 text-white hover:bg-white/30' 
                              : 'btn-gradient'
                          } px-4 py-2 rounded-full text-sm font-semibold transition-all`}
                        >
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 blur-xl -z-10"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Tag Filter (Modern Sidebar) */}
      {allTags.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <details className="group">
            <summary className="btn-gradient cursor-pointer list-none">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filter by Tags
                {selectedTags.length > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {selectedTags.length}
                  </span>
                )}
              </span>
            </summary>
            
            <div className="absolute bottom-full right-0 mb-4 p-4 glass rounded-2xl w-64 max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-3">Select Tags</h3>
              <div className="space-y-2">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2 cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors">
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
                      className="rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-3 w-full btn-ghost text-sm"
                >
                  Clear Tags
                </button>
              )}
            </div>
          </details>
        </div>
      )}
    </>
  );
};