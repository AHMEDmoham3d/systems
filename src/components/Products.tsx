import { Product, ProductFeature, Sector } from '../lib/supabase';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  features: ProductFeature[];
  sectors: Sector[];
}

export default function Products({ products, features, sectors }: ProductsProps) {
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

      <div className="space-y-6">
        {products.map((product) => {
          const sector = sectors.find((s) => s.id === product.sector_id);
          const productFeatures = features.filter((f) => f.product_id === product.id);

          return (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-8">
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
  );
}
