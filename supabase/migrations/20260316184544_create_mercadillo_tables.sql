/*
  # Mercadillo de Muchavista Database Schema

  1. New Tables
    - `vendors`
      - `id` (uuid, primary key)
      - `name` (text) - Vendor name
      - `category` (text) - Category type
      - `description` (text) - Short description
      - `image_url` (text) - Photo of the stand
      - `whatsapp` (text) - WhatsApp number for orders
      - `is_featured` (boolean) - Featured/recommended flag
      - `is_super_offer` (boolean) - Super offer flag
      - `position` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `flash_offers`
      - `id` (uuid, primary key)
      - `vendor_id` (uuid, foreign key to vendors)
      - `title` (text) - Offer title
      - `description` (text) - Offer details
      - `price` (text) - Price information
      - `valid_until` (timestamptz) - Expiration date
      - `is_active` (boolean) - Active status
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage their data
*/

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text DEFAULT '',
  whatsapp text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_super_offer boolean DEFAULT false,
  position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create flash_offers table
CREATE TABLE IF NOT EXISTS flash_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  price text DEFAULT '',
  valid_until timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE flash_offers ENABLE ROW LEVEL SECURITY;

-- Policies for vendors table
CREATE POLICY "Anyone can view vendors"
  ON vendors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert vendors"
  ON vendors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vendors"
  ON vendors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vendors"
  ON vendors FOR DELETE
  TO authenticated
  USING (true);

-- Policies for flash_offers table
CREATE POLICY "Anyone can view active offers"
  ON flash_offers FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert offers"
  ON flash_offers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update offers"
  ON flash_offers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete offers"
  ON flash_offers FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample vendors
INSERT INTO vendors (name, category, description, whatsapp, is_featured, is_super_offer, position) VALUES
  ('Pollos Asados El Domingo', 'Gastronomía', 'Los mejores pollos asados de Muchavista. Receta tradicional con leña.', '+34666123456', true, true, 1),
  ('Churros La Playa', 'Gastronomía', 'Churros recién hechos y chocolate caliente. Perfecto para el desayuno.', '+34666234567', true, false, 2),
  ('Frankfurt Alemán', 'Gastronomía', 'Salchichas alemanas auténticas con pan artesanal.', '+34666345678', false, false, 3),
  ('Antigüedades El Rastro', 'Rastro y Antigüedades', 'Tesoros vintage, libros antiguos y objetos de colección.', '+34666456789', true, false, 4),
  ('Frutas del Levante', 'Fruta y Verdura', 'Frutas y verduras frescas de la huerta alicantina.', '+34666567890', false, false, 5),
  ('Moda Outlet', 'Moda y Outlet', 'Ropa de marca a precios increíbles. Nueva temporada.', '+34666678901', false, true, 6),
  ('Café Vista al Mar', 'Zona de Cafetería', 'Café, zumos naturales y tostadas. Terraza con vistas.', '+34666789012', false, false, 7),
  ('Quesos Artesanos', 'Gastronomía', 'Quesos artesanales de la provincia. Degustación gratuita.', '+34666890123', false, false, 8);
