import { useState } from 'react';
import { Sector, SectorContent } from '../lib/types';
import { Heart, GraduationCap, Dumbbell, Plus, Edit, Trash2 } from 'lucide-react';
import { deleteSectorContent } from '../lib/sectorContent';
import ContentModal from './ContentModal';

interface SectorsProps {
  sectors: Sector[];
  sectorContent: SectorContent[];
  onContentChange: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  GraduationCap,
  Dumbbell,
};

export default function Sectors({ sectors, sectorContent, onContentChange }: SectorsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [editingContent, setEditingContent] = useState<SectorContent | undefined>();

  const handleAddContent = (sectorId: string) => {
    setSelectedSector(sectorId);
    setEditingContent(undefined);
    setModalOpen(true);
  };

  const handleEditContent = (content: SectorContent) => {
    setSelectedSector(content.sector_id);
    setEditingContent(content);
    setModalOpen(true);
  };

  const handleDeleteContent = async (content: SectorContent) => {
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteSectorContent(content.id, content.sector_id);
        onContentChange();
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  const handleSave = () => {
    onContentChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Sectors</h2>
        <p className="text-gray-600">We provide comprehensive SaaS solutions across three key industries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectors.map((sector) => {
          const Icon = iconMap[sector.icon] || Heart;
          const sectorContents = sectorContent.filter(content => content.sector_id === sector.id);

          return (
            <div
              key={sector.id}
              className="bg-white rounded-lg border border-gray-200 p-8 hover:border-gray-300 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{sector.description}</p>

                <button
                  onClick={() => handleAddContent(sector.id)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Content</span>
                </button>

                <div className="w-full space-y-3">
                  {sectorContents.map((content) => (
                    <div key={content.id} className="bg-gray-50 rounded-md p-3">
                      <h4 className="font-medium text-gray-900 mb-2">{content.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{content.content}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditContent(content)}
                          className="p-1 text-gray-500 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContent(content)}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ContentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sectorId={selectedSector}
        content={editingContent}
        onSave={handleSave}
      />
    </div>
  );
}
