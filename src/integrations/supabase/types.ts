export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      pricing_settings: {
        Row: {
          id: number
          price_2_car: number
          price_3_car: number
          price_4_car: number
          price_per_sqft: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          price_2_car?: number
          price_3_car?: number
          price_4_car?: number
          price_per_sqft?: number
          updated_at?: string | null
        }
        Update: {
          id?: number
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
          id: number
          updated_at: string | null
          zapier_webhook_url: string | null
        }
        Insert: {
          id?: number
          updated_at?: string | null
          zapier_webhook_url?: string | null
        }
        Update: {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
