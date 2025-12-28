import { Building2 } from 'lucide-react';

interface HeaderProps {
  companyName: string;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({ companyName, onNavigate, activeSection }: HeaderProps) {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'sectors', label: 'Sectors' },
    { id: 'products', label: 'Products' },
    { id: 'team', label: 'Team' },
    { id: 'projections', label: 'Projections' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-gray-900" />
            <h1 className="text-xl font-semibold text-gray-900">{companyName}</h1>
          </div>
          <nav className="flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
