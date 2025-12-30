import { useState } from 'react';
import { useData } from './lib/useData';
import Header from './components/Header';
import Overview from './components/Overview';
import Sectors from './components/Sectors';
import Products from './components/Products';
import Team from './components/Team';
import Projections from './components/Projections';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    companyInfo,
    sectors,
    products,
    productFeatures,
    teamMembers,
    financialProjections,
    sectorContent,
    loading,
    error,
  } = useData(refreshKey);

  const handleContentChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !companyInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        companyName={companyInfo.name}
        onNavigate={setActiveSection}
        activeSection={activeSection}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'overview' && <Overview company={companyInfo} />}
        {activeSection === 'sectors' && <Sectors sectors={sectors} sectorContent={sectorContent} onContentChange={handleContentChange} />}
        {activeSection === 'products' && (
          <Products products={products} features={productFeatures} sectors={sectors} projections={financialProjections} />
        )}
        {activeSection === 'team' && <Team team={teamMembers} sectors={sectors} />}
        {activeSection === 'projections' && (
          <Projections projections={financialProjections} products={products} />
        )}
      </main>
    </div>
  );
}

export default App;
