import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { Finances } from './components/Finances';
import { Equipment } from './components/Equipment';
import { Events } from './components/Events';
import { MediaDashboard } from './components/MediaDashboard';
import { initializeSampleData } from './utils/sampleData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (!localStorage.getItem('church_members')) {
      initializeSampleData();
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <MediaDashboard />;
      case 'members':
        return <Members />;
      case 'finances':
        return <Finances />;
      case 'equipment':
        return <Equipment />;
      case 'events':
        return <Events />;
      default:
        return <MediaDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;