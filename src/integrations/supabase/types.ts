export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
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
      crm_activity_log: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          related_lead_id: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: string
          related_lead_id?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          related_lead_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activity_log_related_lead_id_fkey"
            columns: ["related_lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_follow_ups: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          is_recurring: boolean | null
          lead_id: string | null
          notes: string | null
          recurrence_interval: string | null
          scheduled_at: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          is_recurring?: boolean | null
          lead_id?: string | null
          notes?: string | null
          recurrence_interval?: string | null
          scheduled_at: string
          title: string
          type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          is_recurring?: boolean | null
          lead_id?: string | null
          notes?: string | null
          recurrence_interval?: string | null
          scheduled_at?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_follow_ups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_lead_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_lead_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          address: string | null
          assigned_to: string | null
          company: string | null
          created_at: string
          created_by: string
          email: string | null
          id: string
          linkedin: string | null
          name: string
          phone: string | null
          stage: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          created_by: string
          email?: string | null
          id?: string
          linkedin?: string | null
          name: string
          phone?: string | null
          stage?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          id?: string
          linkedin?: string | null
          name?: string
          phone?: string | null
          stage?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_leads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_sales_goals: {
        Row: {
          actual_amount: number
          created_at: string
          goal_amount: number
          id: string
          month: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_amount?: number
          created_at?: string
          goal_amount?: number
          id?: string
          month: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_amount?: number
          created_at?: string
          goal_amount?: number
          id?: string
          month?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_sales_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dfwquotes: {
        Row: {
          archived: boolean
          color_choice: string
          created_at: string
          custom_sqft: number | null
          email: string
          estimated_price: number
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
          email: string
          estimated_price: number
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
          email?: string
          estimated_price?: number
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
      floor_packets: {
        Row: {
          additional_spaces: Json | null
          created_at: string
          custom_sqft: number | null
          email: string
          estimated_price: number
          garage_type: string
          id: string
          name: string
          phone: string
          ready_to_proceed: boolean
          selected_color: string
          updated_at: string
          visualization_url: string | null
        }
        Insert: {
          additional_spaces?: Json | null
          created_at?: string
          custom_sqft?: number | null
          email: string
          estimated_price: number
          garage_type: string
          id?: string
          name: string
          phone: string
          ready_to_proceed?: boolean
          selected_color: string
          updated_at?: string
          visualization_url?: string | null
        }
        Update: {
          additional_spaces?: Json | null
          created_at?: string
          custom_sqft?: number | null
          email?: string
          estimated_price?: number
          garage_type?: string
          id?: string
          name?: string
          phone?: string
          ready_to_proceed?: boolean
          selected_color?: string
          updated_at?: string
          visualization_url?: string | null
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
      giveaway: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          referred_by: string | null
          status: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          referred_by?: string | null
          status?: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          referred_by?: string | null
          status?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "Lead Form Subissions": {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          original_photo_url: string | null
          phone: string
          privacy_policy_agreed: boolean
          questions_comments: string | null
          rendered_photo_url: string | null
          selected_color: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          original_photo_url?: string | null
          phone: string
          privacy_policy_agreed?: boolean
          questions_comments?: string | null
          rendered_photo_url?: string | null
          selected_color?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          original_photo_url?: string | null
          phone?: string
          privacy_policy_agreed?: boolean
          questions_comments?: string | null
          rendered_photo_url?: string | null
          selected_color?: string | null
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
      pending_invites: {
        Row: {
          created_at: string
          email: string
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "pending_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      profiles: {
        Row: {
          created_at: string
          deactivated_at: string | null
          full_name: string | null
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          deactivated_at?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          deactivated_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      prospecting_logs: {
        Row: {
          added_to_jobber: boolean
          contact_name: string | null
          contacted_at: string
          created_at: string
          id: string
          note: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          added_to_jobber?: boolean
          contact_name?: string | null
          contacted_at?: string
          created_at?: string
          id?: string
          note?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          added_to_jobber?: boolean
          contact_name?: string | null
          contacted_at?: string
          created_at?: string
          id?: string
          note?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospecting_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      sales_records: {
        Row: {
          amount: number
          created_at: string
          customer_name: string
          description: string | null
          id: string
          rep_id: string
          sold_at: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          customer_name: string
          description?: string | null
          id?: string
          rep_id: string
          sold_at?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_name?: string
          description?: string | null
          id?: string
          rep_id?: string
          sold_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_records_rep_id_fkey"
            columns: ["rep_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_items: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          file_url: string | null
          id: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visualizer_analytics: {
        Row: {
          color_name: string | null
          converted: boolean | null
          created_at: string
          event_type: string
          garage_size: string | null
          id: string
          session_id: string
          timestamp: string
        }
        Insert: {
          color_name?: string | null
          converted?: boolean | null
          created_at?: string
          event_type: string
          garage_size?: string | null
          id?: string
          session_id: string
          timestamp?: string
        }
        Update: {
          color_name?: string | null
          converted?: boolean | null
          created_at?: string
          event_type?: string
          garage_size?: string | null
          id?: string
          session_id?: string
          timestamp?: string
        }
        Relationships: []
      }
      webhook_settings: {
        Row: {
          dfw_webhook_url: string | null
          floor_packet_webhook_url: string | null
          id: number
          lead_webhook_url: string | null
          updated_at: string | null
          zapier_webhook_url: string | null
        }
        Insert: {
          dfw_webhook_url?: string | null
          floor_packet_webhook_url?: string | null
          id?: number
          lead_webhook_url?: string | null
          updated_at?: string | null
          zapier_webhook_url?: string | null
        }
        Update: {
          dfw_webhook_url?: string | null
          floor_packet_webhook_url?: string | null
          id?: number
          lead_webhook_url?: string | null
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
      check_duplicate_lead: {
        Args: { check_email: string; check_phone: string }
        Returns: {
          created_by_name: string
          email: string
          id: string
          name: string
          phone: string
        }[]
      }
      get_crm_leaderboard: {
        Args: { end_date: string; start_date: string }
        Returns: {
          appointments_booked: number
          full_name: string
          leads_added: number
          notes_added: number
          user_id: string
        }[]
      }
      get_prospecting_leaderboard: {
        Args: { week_end: string; week_start: string }
        Returns: {
          contacts: number
          full_name: string
          user_id: string
        }[]
      }
      get_sales_leaderboard: {
        Args: { month_end: string; month_start: string }
        Returns: {
          deals: number
          full_name: string
          revenue: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "rep"
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
    Enums: {
      app_role: ["admin", "rep"],
    },
  },
} as const
