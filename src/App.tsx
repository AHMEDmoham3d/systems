import { useState } from 'react';
import {
  companyInfo,
  sectors,
  products,
  productFeatures,
  teamMembers,
  financialProjections,
} from './data/company';
import Header from './components/Header';
import Overview from './components/Overview';
import Sectors from './components/Sectors';
import Products from './components/Products';
import Team from './components/Team';
import Projections from './components/Projections';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        companyName={companyInfo.name}
        onNavigate={setActiveSection}
        activeSection={activeSection}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === 'overview' && <Overview company={companyInfo} />}
        {activeSection === 'sectors' && <Sectors sectors={sectors} />}
        {activeSection === 'products' && (
          <Products products={products} features={productFeatures} sectors={sectors} />
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
