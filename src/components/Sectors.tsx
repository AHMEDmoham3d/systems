import { Sector } from '../lib/supabase';
import { Heart, GraduationCap, Dumbbell } from 'lucide-react';

interface SectorsProps {
  sectors: Sector[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  GraduationCap,
  Dumbbell,
};

export default function Sectors({ sectors }: SectorsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Sectors</h2>
        <p className="text-gray-600">We provide comprehensive SaaS solutions across three key industries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectors.map((sector) => {
          const Icon = iconMap[sector.icon] || Heart;
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
                <p className="text-gray-600 leading-relaxed">{sector.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
