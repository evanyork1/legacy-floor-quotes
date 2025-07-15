export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      commercial_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          project_description: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          project_description: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          project_description?: string
          status?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string
          is_featured: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url: string
          is_featured?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string
          is_featured?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      location_pricing: {
        Row: {
          id: number
          location: string
          price_2_car: number
          price_3_car: number
          price_4_car: number
          price_per_sqft: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          location: string
          price_2_car?: number
          price_3_car?: number
          price_4_car?: number
          price_per_sqft?: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          location?: string
          price_2_car?: number
          price_3_car?: number
          price_4_car?: number
          price_per_sqft?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_settings: {
        Row: {
          id: number
          location: string
          price_2_car: number
          price_3_car: number
          price_4_car: number
          price_per_sqft: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          location?: string
          price_2_car?: number
          price_3_car?: number
          price_4_car?: number
          price_per_sqft?: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          location?: string
          price_2_car?: number
          price_3_car?: number
          price_4_car?: number
          price_per_sqft?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          archived: boolean
          color_choice: string
          created_at: string
          custom_sqft: number | null
          damage_photos: string[] | null
          email: string
          estimated_price: number
          exterior_photos: string[] | null
          garage_type: string
          id: string
          lead_source: string
          name: string
          other_space_type: string | null
          phone: string
          space_type: string | null
          status: string
          zip_code: string
        }
        Insert: {
          archived?: boolean
          color_choice: string
          created_at?: string
          custom_sqft?: number | null
          damage_photos?: string[] | null
          email: string
          estimated_price: number
          exterior_photos?: string[] | null
          garage_type: string
          id?: string
          lead_source?: string
          name: string
          other_space_type?: string | null
          phone: string
          space_type?: string | null
          status?: string
          zip_code: string
        }
        Update: {
          archived?: boolean
          color_choice?: string
          created_at?: string
          custom_sqft?: number | null
          damage_photos?: string[] | null
          email?: string
          estimated_price?: number
          exterior_photos?: string[] | null
          garage_type?: string
          id?: string
          lead_source?: string
          name?: string
          other_space_type?: string | null
          phone?: string
          space_type?: string | null
          status?: string
          zip_code?: string
        }
        Relationships: []
      }
      quotes_dfw: {
        Row: {
          archived: boolean
          color_choice: string
          created_at: string
          custom_sqft: number | null
          damage_photos: string[] | null
          email: string
          estimated_price: number
          exterior_photos: string[] | null
          garage_type: string
          id: string
          lead_source: string
          name: string
          other_space_type: string | null
          phone: string
          space_type: string | null
          status: string
          zip_code: string
        }
        Insert: {
          archived?: boolean
          color_choice: string
          created_at?: string
          custom_sqft?: number | null
          damage_photos?: string[] | null
          email: string
          estimated_price: number
          exterior_photos?: string[] | null
          garage_type: string
          id?: string
          lead_source?: string
          name: string
          other_space_type?: string | null
          phone: string
          space_type?: string | null
          status?: string
          zip_code: string
        }
        Update: {
          archived?: boolean
          color_choice?: string
          created_at?: string
          custom_sqft?: number | null
          damage_photos?: string[] | null
          email?: string
          estimated_price?: number
          exterior_photos?: string[] | null
          garage_type?: string
          id?: string
          lead_source?: string
          name?: string
          other_space_type?: string | null
          phone?: string
          space_type?: string | null
          status?: string
          zip_code?: string
        }
        Relationships: []
      }
      webhook_settings: {
        Row: {
          dfw_webhook_url: string | null
          id: number
          updated_at: string | null
          zapier_webhook_url: string | null
        }
        Insert: {
          dfw_webhook_url?: string | null
          id?: number
          updated_at?: string | null
          zapier_webhook_url?: string | null
        }
        Update: {
          dfw_webhook_url?: string | null
          id?: number
          updated_at?: string | null
          zapier_webhook_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
