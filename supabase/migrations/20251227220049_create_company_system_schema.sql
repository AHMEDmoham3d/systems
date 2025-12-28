/*
  # Company Planning System Schema

  1. New Tables
    - `company_info`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `vision` (text)
      - `mission` (text)
      - `founded_year` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `sectors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `sector_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `status` (text: 'active', 'planned', 'development')
      - `vision` (text)
      - `target_market` (text)
      - `launch_date` (date)
      - `created_at` (timestamptz)
    
    - `product_features`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `feature` (text)
      - `status` (text: 'completed', 'in_progress', 'planned')
      - `created_at` (timestamptz)
    
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `sector_id` (uuid, foreign key, nullable)
      - `email` (text)
      - `joined_date` (date)
      - `bio` (text)
      - `created_at` (timestamptz)
    
    - `financial_projections`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `year` (integer)
      - `quarter` (integer)
      - `revenue_projection` (numeric)
      - `user_projection` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (since this is a company showcase system)
*/

-- Company Info Table
CREATE TABLE IF NOT EXISTS company_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  vision text NOT NULL,
  mission text NOT NULL,
  founded_year integer DEFAULT 2024,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view company info"
  ON company_info FOR SELECT
  TO public
  USING (true);

-- Sectors Table
CREATE TABLE IF NOT EXISTS sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sectors"
  ON sectors FOR SELECT
  TO public
  USING (true);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sector_id uuid REFERENCES sectors(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  vision text NOT NULL,
  target_market text NOT NULL,
  launch_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Product Features Table
CREATE TABLE IF NOT EXISTS product_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  feature text NOT NULL,
  status text NOT NULL DEFAULT 'planned',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product features"
  ON product_features FOR SELECT
  TO public
  USING (true);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  sector_id uuid REFERENCES sectors(id) ON DELETE SET NULL,
  email text NOT NULL,
  joined_date date DEFAULT CURRENT_DATE,
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  TO public
  USING (true);

-- Financial Projections Table
CREATE TABLE IF NOT EXISTS financial_projections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  year integer NOT NULL,
  quarter integer NOT NULL,
  revenue_projection numeric NOT NULL DEFAULT 0,
  user_projection integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE financial_projections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view financial projections"
  ON financial_projections FOR SELECT
  TO public
  USING (true);

-- Insert sample company data
INSERT INTO company_info (name, description, vision, mission, founded_year)
VALUES (
  'CloudSoft Solutions',
  'A global software company providing enterprise-grade SaaS solutions across healthcare, education, and fitness sectors.',
  'To revolutionize how organizations operate through innovative cloud-based solutions that enhance efficiency and user experience.',
  'Delivering cutting-edge SaaS products that empower healthcare providers, educational institutions, and fitness centers to achieve operational excellence.',
  2024
) ON CONFLICT DO NOTHING;

-- Insert sectors
INSERT INTO sectors (name, description, icon) VALUES
  ('Healthcare', 'Comprehensive SaaS solutions for hospitals, clinics, and healthcare providers', 'Heart'),
  ('Education', 'Digital platforms for schools, colleges, and educational institutions', 'GraduationCap'),
  ('Fitness', 'Management systems for gyms, sports clubs, and fitness centers', 'Dumbbell')
ON CONFLICT DO NOTHING;