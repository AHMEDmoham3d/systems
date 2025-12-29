import { useState } from 'react';
import { Product, ProductFeature, Sector, FinancialProjection } from '../lib/types';
import { CheckCircle2, Clock, Circle, X } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  features: ProductFeature[];
  sectors: Sector[];
  projections: FinancialProjection[];
}

export default function Products({ products, features, sectors, projections }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group products by sector and order sectors: education, healthcare, fitness
  const sectorOrder = ['education', 'healthcare', 'fitness'];
  const groupedProducts = sectorOrder.map(sectorId => {
    const sector = sectors.find(s => s.id === sectorId);
    const sectorProducts = products.filter(p => p.sector_id === sectorId);
    return { sector, products: sectorProducts };
  }).filter(group => group.products.length > 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-50 text-green-700 border-green-200',
      development: 'bg-blue-50 text-blue-700 border-blue-200',
      planned: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.planned;
  };

  const getFeatureIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Products</h2>
        <p className="text-gray-600">Comprehensive SaaS solutions for modern businesses</p>
      </div>

      <div className="space-y-8">
        {groupedProducts.map(({ sector, products: sectorProducts }) => (
          <div key={sector?.id} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{sector?.name} Sector</h2>
            <div className="space-y-6">
              {sectorProducts.map((product) => {
                const productFeatures = features.filter((f) => f.product_id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-gray-200 p-8 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                              product.status
                            )}`}
                          >
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{sector?.name} Sector</p>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Vision</h4>
                        <p className="text-sm text-gray-600">{product.vision}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Target Market</h4>
                        <p className="text-sm text-gray-600">{product.target_market}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {productFeatures.map((feature) => (
                          <div key={feature.id} className="flex items-center gap-2">
                            {getFeatureIcon(feature.status)}
                            <span className="text-sm text-gray-600">{feature.feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        Launch Date: {new Date(product.launch_date).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedProduct.name}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Vision</h3>
                    <p className="text-gray-600">{selectedProduct.vision}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Target Market</h3>
                    <p className="text-gray-600">{selectedProduct.target_market}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.filter(f => f.product_id === selectedProduct.id).map((feature) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        {getFeatureIcon(feature.status)}
                        <span className="text-sm text-gray-600">{feature.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Projections</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue ($)</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projections.filter(p => p.product_id === selectedProduct.id).map((projection) => (
                          <tr key={projection.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.year}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q{projection.quarter}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${projection.revenue_projection.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{projection.user_projection}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
