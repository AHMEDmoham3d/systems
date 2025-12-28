import { FinancialProjection, Product } from '../lib/supabase';
import { TrendingUp, Users } from 'lucide-react';

interface ProjectionsProps {
  projections: FinancialProjection[];
  products: Product[];
}

export default function Projections({ projections, products }: ProjectionsProps) {
  const productProjections = products.map((product) => {
    const data = projections.filter((p) => p.product_id === product.id);
    const totalRevenue = data.reduce((sum, p) => sum + Number(p.revenue_projection), 0);
    const totalUsers = data.length > 0 ? data[data.length - 1].user_projection : 0;

    return {
      product,
      projections: data.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.quarter - b.quarter;
      }),
      totalRevenue,
      totalUsers,
    };
  }).filter(p => p.projections.length > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Financial Projections</h2>
        <p className="text-gray-600">Revenue and user growth forecasts for our products</p>
      </div>

      <div className="space-y-6">
        {productProjections.map(({ product, projections: data, totalRevenue, totalUsers }) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Projected Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Target Clients</p>
                    <p className="text-lg font-semibold text-gray-900">{formatNumber(totalUsers)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Period</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Clients</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((projection, index) => {
                    const prevProjection = index > 0 ? data[index - 1] : null;
                    const growth = prevProjection
                      ? ((Number(projection.revenue_projection) - Number(prevProjection.revenue_projection)) /
                          Number(prevProjection.revenue_projection)) *
                        100
                      : 0;

                    return (
                      <tr key={projection.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          Q{projection.quarter} {projection.year}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                          {formatCurrency(Number(projection.revenue_projection))}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right">
                          {formatNumber(projection.user_projection)}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          {index > 0 ? (
                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {growth >= 0 ? '+' : ''}
                              {growth.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
