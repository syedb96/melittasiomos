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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ambassadors: {
        Row: {
          accent_from: string | null
          accent_to: string | null
          created_at: string
          id: string
          instagram_url: string | null
          is_published: boolean
          name: string
          photo_url: string | null
          referral_count: number
          sort_order: number
          tagline: string | null
          updated_at: string
        }
        Insert: {
          accent_from?: string | null
          accent_to?: string | null
          created_at?: string
          id?: string
          instagram_url?: string | null
          is_published?: boolean
          name: string
          photo_url?: string | null
          referral_count?: number
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          accent_from?: string | null
          accent_to?: string | null
          created_at?: string
          id?: string
          instagram_url?: string | null
          is_published?: boolean
          name?: string
          photo_url?: string | null
          referral_count?: number
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      approved_admin_emails: {
        Row: {
          created_at: string
          default_role: Database["public"]["Enums"]["app_role"]
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string
          default_role?: Database["public"]["Enums"]["app_role"]
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string
          default_role?: Database["public"]["Enums"]["app_role"]
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          enquiry_type: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          enquiry_type: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          enquiry_type?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      cta_events: {
        Row: {
          created_at: string
          cta_label: string | null
          cta_type: string | null
          destination: string | null
          id: string
          path: string
          session_id: string | null
        }
        Insert: {
          created_at?: string
          cta_label?: string | null
          cta_type?: string | null
          destination?: string | null
          id?: string
          path: string
          session_id?: string | null
        }
        Update: {
          created_at?: string
          cta_label?: string | null
          cta_type?: string | null
          destination?: string | null
          id?: string
          path?: string
          session_id?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          source_page: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          source_page?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          source_page?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          body: string | null
          calendar_url: string | null
          cover_image_url: string | null
          created_at: string
          end_datetime: string | null
          event_type: string
          id: string
          is_featured: boolean
          is_published: boolean
          slug: string
          start_datetime: string
          summary: string | null
          ticket_url: string | null
          title: string
          updated_at: string
          venue_address: string | null
          venue_name: string | null
        }
        Insert: {
          body?: string | null
          calendar_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          end_datetime?: string | null
          event_type?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          slug: string
          start_datetime: string
          summary?: string | null
          ticket_url?: string | null
          title: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Update: {
          body?: string | null
          calendar_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          end_datetime?: string | null
          event_type?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          slug?: string
          start_datetime?: string
          summary?: string | null
          ticket_url?: string | null
          title?: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Relationships: []
      }
      gallery_albums: {
        Row: {
          category: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_assets: {
        Row: {
          album_id: string | null
          alt_text: string | null
          caption: string | null
          created_at: string
          file_path: string | null
          focal_point_x: number | null
          focal_point_y: number | null
          id: string
          image_url: string
          is_featured: boolean
          is_published: boolean
          location_tag: string | null
          media_type: string
          orientation: string | null
          service_tag: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          album_id?: string | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path?: string | null
          focal_point_x?: number | null
          focal_point_y?: number | null
          id?: string
          image_url: string
          is_featured?: boolean
          is_published?: boolean
          location_tag?: string | null
          media_type?: string
          orientation?: string | null
          service_tag?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          album_id?: string | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path?: string | null
          focal_point_x?: number | null
          focal_point_y?: number | null
          id?: string
          image_url?: string
          is_featured?: boolean
          is_published?: boolean
          location_tag?: string | null
          media_type?: string
          orientation?: string | null
          service_tag?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_assets_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "gallery_albums"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          device_type: string | null
          id: string
          page_title: string | null
          path: string
          referrer: string | null
          session_id: string | null
          viewed_at: string
        }
        Insert: {
          device_type?: string | null
          id?: string
          page_title?: string | null
          path: string
          referrer?: string | null
          session_id?: string | null
          viewed_at?: string
        }
        Update: {
          device_type?: string | null
          id?: string
          page_title?: string | null
          path?: string
          referrer?: string | null
          session_id?: string | null
          viewed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          provider: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          provider?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          provider?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value_json: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value_json?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value_json?: Json
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          full_bio: string | null
          id: string
          instagram_url: string | null
          is_published: boolean
          name: string
          profile_image_url: string | null
          role_title: string
          short_bio: string | null
          slug: string
          sort_order: number
          specialties: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_bio?: string | null
          id?: string
          instagram_url?: string | null
          is_published?: boolean
          name: string
          profile_image_url?: string | null
          role_title: string
          short_bio?: string | null
          slug: string
          sort_order?: number
          specialties?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_bio?: string | null
          id?: string
          instagram_url?: string | null
          is_published?: boolean
          name?: string
          profile_image_url?: string | null
          role_title?: string
          short_bio?: string | null
          slug?: string
          sort_order?: number
          specialties?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          context_label: string | null
          created_at: string
          id: string
          image_url: string | null
          is_featured: boolean
          is_published: boolean
          person_name: string
          quote: string
          rating: number | null
          source_type: string | null
          source_url: string | null
          updated_at: string
        }
        Insert: {
          context_label?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          person_name: string
          quote: string
          rating?: number | null
          source_type?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          context_label?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          person_name?: string
          quote?: string
          rating?: number | null
          source_type?: string | null
          source_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "owner" | "admin" | "editor" | "viewer"
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
      app_role: ["owner", "admin", "editor", "viewer"],
    },
  },
} as const
