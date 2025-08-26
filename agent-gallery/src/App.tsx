import { useState, useMemo } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { Home } from './pages/Home';
import { AgentDetail } from './pages/AgentDetail';
import { Agent } from './types/agent';
import agentsData from './data/agents.json';

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const agents = useMemo(() => agentsData as Agent[], []);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleBackToGallery = () => {
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
          {selectedAgent ? (
            <AgentDetail
              agent={selectedAgent}
              onBack={handleBackToGallery}
            />
          ) : (
            <Home
              agents={agents}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>
    </HeroUIProvider>
  );
}

export default App;