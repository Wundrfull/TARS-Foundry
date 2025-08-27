import { useState, useMemo, lazy, Suspense } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { Agent } from './types/agent';
import agentsData from './data/agents.json';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const AgentDetail = lazy(() => import('./pages/AgentDetail').then(module => ({ default: module.AgentDetail })));
const GettingStarted = lazy(() => import('./pages/GettingStarted'));

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'getting-started'>('home');
  const agents = useMemo(() => agentsData as Agent[], []);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleBackToGallery = () => {
    setSelectedAgent(null);
  };

  const handleNavigate = (page: 'home' | 'getting-started') => {
    setCurrentPage(page);
    setSelectedAgent(null);
  };

  return (
    <HeroUIProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Gradient Orbs */}
        <div className="fixed inset-0 -z-10">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>
        
        {/* Noise Texture Overlay for depth */}
        <div className="noise-overlay"></div>
        
        {/* Main Content */}
        <div className="relative z-10">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading agents...</p>
              </div>
            </div>
          }>
            {selectedAgent ? (
              <AgentDetail
                agent={selectedAgent}
                onBack={handleBackToGallery}
              />
            ) : currentPage === 'getting-started' ? (
              <GettingStarted onNavigate={handleNavigate} />
            ) : (
              <Home
                agents={agents}
                onViewDetails={handleViewDetails}
                onNavigate={handleNavigate}
              />
            )}
          </Suspense>
        </div>
      </div>
    </HeroUIProvider>
  );
}

export default App;