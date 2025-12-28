import { TeamMember, Sector } from '../lib/supabase';
import { Mail, Calendar } from 'lucide-react';

interface TeamProps {
  team: TeamMember[];
  sectors: Sector[];
}

export default function Team({ team, sectors }: TeamProps) {
  const executives = team.filter((member) => !member.sector_id);
  const sectorTeams = sectors.map((sector) => ({
    sector,
    members: team.filter((member) => member.sector_id === sector.id),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Team</h2>
        <p className="text-gray-600">Meet the talented people behind our success</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Leadership</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executives.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{member.role}</p>
              <p className="text-sm text-gray-500 mb-4">{member.bio}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Joined {new Date(member.joined_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sectorTeams.map(({ sector, members }) => (
        <div key={sector.id}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{sector.name} Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 mb-4">{member.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Joined {new Date(member.joined_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
