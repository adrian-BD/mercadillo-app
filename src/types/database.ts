export interface Database {
  public: {
    Tables: {
      vendors: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          image_url: string;
          whatsapp: string;
          is_featured: boolean;
          is_super_offer: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['vendors']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['vendors']['Insert']>;
      };
      flash_offers: {
        Row: {
          id: string;
          vendor_id: string;
          title: string;
          description: string;
          price: string;
          valid_until: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flash_offers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['flash_offers']['Insert']>;
      };
    };
  };
}

export type Vendor = Database['public']['Tables']['vendors']['Row'];
export type FlashOffer = Database['public']['Tables']['flash_offers']['Row'];
