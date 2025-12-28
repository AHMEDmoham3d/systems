export interface CompanyInfo {
  id: string;
  name: string;
  description: string;
  vision: string;
  mission: string;
  founded_year: number;
  created_at?: string;
  updated_at?: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at?: string;
}

export interface Product {
  id: string;
  sector_id: string;
  name: string;
  description: string;
  status: 'active' | 'planned' | 'development';
  vision: string;
  target_market: string;
  launch_date: string;
  created_at?: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  feature: string;
  status: 'completed' | 'in_progress' | 'planned';
  created_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  sector_id: string | null;
  email: string;
  joined_date: string;
  bio: string;
  created_at?: string;
}

export interface FinancialProjection {
  id: string;
  product_id: string;
  year: number;
  quarter: number;
  revenue_projection: number;
  user_projection: number;
  created_at?: string;
}
