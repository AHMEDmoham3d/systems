import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import {
  CompanyInfo,
  Sector,
  Product,
  ProductFeature,
  TeamMember,
  FinancialProjection,
} from './types';

interface DataState {
  companyInfo: CompanyInfo | null;
  sectors: Sector[];
  products: Product[];
  productFeatures: ProductFeature[];
  teamMembers: TeamMember[];
  financialProjections: FinancialProjection[];
  loading: boolean;
  error: string | null;
}

export function useData(): DataState {
  const [data, setData] = useState<DataState>({
    companyInfo: null,
    sectors: [],
    products: [],
    productFeatures: [],
    teamMembers: [],
    financialProjections: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: companyData, error: companyError },
          { data: sectorsData, error: sectorsError },
          { data: productsData, error: productsError },
          { data: featuresData, error: featuresError },
          { data: teamData, error: teamError },
          { data: projectionsData, error: projectionsError },
        ] = await Promise.all([
          supabase.from('company_info').select('*').single(),
          supabase.from('sectors').select('*'),
          supabase.from('products').select('*'),
          supabase.from('product_features').select('*'),
          supabase.from('team_members').select('*'),
          supabase.from('financial_projections').select('*'),
        ]);

        if (companyError || sectorsError || productsError || featuresError || teamError || projectionsError) {
          throw new Error('Failed to fetch data from Supabase');
        }

        setData({
          companyInfo: companyData as CompanyInfo,
          sectors: sectorsData as Sector[],
          products: productsData as Product[],
          productFeatures: featuresData as ProductFeature[],
          teamMembers: teamData as TeamMember[],
          financialProjections: projectionsData as FinancialProjection[],
          loading: false,
          error: null,
        });
      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        }));
      }
    };

    fetchData();
  }, []);

  return data;
}
