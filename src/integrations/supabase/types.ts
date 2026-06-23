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
      admin_audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_label: string | null
          entity_type: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      ambassadors: {
        Row: {
          accent_from: string | null
          accent_to: string | null
          application_status: string
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
          application_status?: string
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
          application_status?: string
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
      cms_freshness_alerts: {
        Row: {
          created_at: string
          days_overdue: number | null
          digest_run_id: string
          freshness: string
          id: string
          page_id: string
          published_at: string | null
          review_date: string | null
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          days_overdue?: number | null
          digest_run_id: string
          freshness: string
          id?: string
          page_id: string
          published_at?: string | null
          review_date?: string | null
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          days_overdue?: number | null
          digest_run_id?: string
          freshness?: string
          id?: string
          page_id?: string
          published_at?: string | null
          review_date?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_freshness_alerts_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_generation_logs: {
        Row: {
          created_at: string
          error: string | null
          id: string
          model: string
          page_id: string | null
          primary_keyword: string | null
          prompt: string
          status: string
          tokens_input: number | null
          tokens_output: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          model: string
          page_id?: string | null
          primary_keyword?: string | null
          prompt: string
          status?: string
          tokens_input?: number | null
          tokens_output?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          model?: string
          page_id?: string | null
          primary_keyword?: string | null
          prompt?: string
          status?: string
          tokens_input?: number | null
          tokens_output?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_generation_logs_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_media: {
        Row: {
          alt_text: string | null
          bucket: string | null
          caption: string | null
          created_at: string
          file_size: number | null
          folder: string
          height: number | null
          id: string
          kind: string
          mime_type: string | null
          storage_path: string | null
          tags: string[]
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          uploaded_by: string | null
          url: string
          width: number | null
          youtube_id: string | null
        }
        Insert: {
          alt_text?: string | null
          bucket?: string | null
          caption?: string | null
          created_at?: string
          file_size?: number | null
          folder?: string
          height?: number | null
          id?: string
          kind?: string
          mime_type?: string | null
          storage_path?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
          url: string
          width?: number | null
          youtube_id?: string | null
        }
        Update: {
          alt_text?: string | null
          bucket?: string | null
          caption?: string | null
          created_at?: string
          file_size?: number | null
          folder?: string
          height?: number | null
          id?: string
          kind?: string
          mime_type?: string | null
          storage_path?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
          url?: string
          width?: number | null
          youtube_id?: string | null
        }
        Relationships: []
      }
      cms_navigation: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          label: string
          menu_key: string
          open_in_new_tab: boolean
          parent_id: string | null
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          menu_key: string
          open_in_new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          menu_key?: string
          open_in_new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_navigation_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "cms_navigation"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_page_versions: {
        Row: {
          author_id: string | null
          created_at: string
          id: string
          note: string | null
          page_id: string
          snapshot: Json
          version_number: number
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          id?: string
          note?: string | null
          page_id: string
          snapshot: Json
          version_number: number
        }
        Update: {
          author_id?: string | null
          created_at?: string
          id?: string
          note?: string | null
          page_id?: string
          snapshot?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "cms_page_versions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          author_id: string | null
          author_name: string | null
          canonical_url: string | null
          category: string | null
          city: string | null
          content_html: string
          content_json: Json
          created_at: string
          excerpt: string | null
          hero_image_alt: string | null
          hero_image_url: string | null
          id: string
          kind: string
          meta_description: string | null
          meta_title: string | null
          noindex: boolean
          og_image: string | null
          og_image_generated_at: string | null
          page_type: string
          primary_keyword: string | null
          publish_at: string | null
          publish_gate: Json | null
          published_at: string | null
          related_slugs: string[]
          review_date: string | null
          schema_jsonld: Json | null
          seo_checklist: Json | null
          seo_score: number | null
          slug: string
          sources: Json | null
          status: Database["public"]["Enums"]["cms_page_status"]
          tags: string[]
          title: string
          topic: string | null
          twitter_image: string | null
          updated_at: string
          view_count: number
          wix_auto_sync: boolean
          wix_collection_item_id: string | null
          wix_post_id: string | null
          wix_sync_error: string | null
          wix_sync_status: string | null
          wix_synced_at: string | null
          workflow_status: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          canonical_url?: string | null
          category?: string | null
          city?: string | null
          content_html?: string
          content_json?: Json
          created_at?: string
          excerpt?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          kind?: string
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_image?: string | null
          og_image_generated_at?: string | null
          page_type?: string
          primary_keyword?: string | null
          publish_at?: string | null
          publish_gate?: Json | null
          published_at?: string | null
          related_slugs?: string[]
          review_date?: string | null
          schema_jsonld?: Json | null
          seo_checklist?: Json | null
          seo_score?: number | null
          slug: string
          sources?: Json | null
          status?: Database["public"]["Enums"]["cms_page_status"]
          tags?: string[]
          title: string
          topic?: string | null
          twitter_image?: string | null
          updated_at?: string
          view_count?: number
          wix_auto_sync?: boolean
          wix_collection_item_id?: string | null
          wix_post_id?: string | null
          wix_sync_error?: string | null
          wix_sync_status?: string | null
          wix_synced_at?: string | null
          workflow_status?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          canonical_url?: string | null
          category?: string | null
          city?: string | null
          content_html?: string
          content_json?: Json
          created_at?: string
          excerpt?: string | null
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          kind?: string
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_image?: string | null
          og_image_generated_at?: string | null
          page_type?: string
          primary_keyword?: string | null
          publish_at?: string | null
          publish_gate?: Json | null
          published_at?: string | null
          related_slugs?: string[]
          review_date?: string | null
          schema_jsonld?: Json | null
          seo_checklist?: Json | null
          seo_score?: number | null
          slug?: string
          sources?: Json | null
          status?: Database["public"]["Enums"]["cms_page_status"]
          tags?: string[]
          title?: string
          topic?: string | null
          twitter_image?: string | null
          updated_at?: string
          view_count?: number
          wix_auto_sync?: boolean
          wix_collection_item_id?: string | null
          wix_post_id?: string | null
          wix_sync_error?: string | null
          wix_sync_status?: string | null
          wix_synced_at?: string | null
          workflow_status?: string
        }
        Relationships: []
      }
      cms_redirects: {
        Row: {
          created_at: string
          from_path: string
          id: string
          is_active: boolean
          notes: string | null
          status_code: number
          to_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_path: string
          id?: string
          is_active?: boolean
          notes?: string | null
          status_code?: number
          to_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_path?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          status_code?: number
          to_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      cms_wix_config: {
        Row: {
          auto_push_enabled: boolean
          created_at: string
          id: string
          last_reconcile_at: string | null
          updated_at: string
          wix_blog_member_id: string | null
          wix_collection_id: string | null
          wix_site_id: string | null
        }
        Insert: {
          auto_push_enabled?: boolean
          created_at?: string
          id?: string
          last_reconcile_at?: string | null
          updated_at?: string
          wix_blog_member_id?: string | null
          wix_collection_id?: string | null
          wix_site_id?: string | null
        }
        Update: {
          auto_push_enabled?: boolean
          created_at?: string
          id?: string
          last_reconcile_at?: string | null
          updated_at?: string
          wix_blog_member_id?: string | null
          wix_collection_id?: string | null
          wix_site_id?: string | null
        }
        Relationships: []
      }
      cms_wix_sync_log: {
        Row: {
          action: string
          created_at: string
          error: string | null
          id: string
          page_id: string | null
          request_summary: Json | null
          response_summary: Json | null
          status: string
          target: string
        }
        Insert: {
          action: string
          created_at?: string
          error?: string | null
          id?: string
          page_id?: string | null
          request_summary?: Json | null
          response_summary?: Json | null
          status: string
          target: string
        }
        Update: {
          action?: string
          created_at?: string
          error?: string | null
          id?: string
          page_id?: string | null
          request_summary?: Json | null
          response_summary?: Json | null
          status?: string
          target?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_wix_sync_log_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_booking_links: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          kind: string
          label: string
          prefilled_message: string | null
          slug: string
          updated_at: string
          url: string
          usage_notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          kind: string
          label: string
          prefilled_message?: string | null
          slug: string
          updated_at?: string
          url: string
          usage_notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          kind?: string
          label?: string
          prefilled_message?: string | null
          slug?: string
          updated_at?: string
          url?: string
          usage_notes?: string | null
        }
        Relationships: []
      }
      commerce_offers: {
        Row: {
          applicable_services: string[]
          code: string | null
          created_at: string
          cta_label: string | null
          cta_link_id: string | null
          description: string | null
          eligibility: string | null
          ends_at: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          starts_at: string | null
          terms: string | null
          updated_at: string
        }
        Insert: {
          applicable_services?: string[]
          code?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link_id?: string | null
          description?: string | null
          eligibility?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          starts_at?: string | null
          terms?: string | null
          updated_at?: string
        }
        Update: {
          applicable_services?: string[]
          code?: string | null
          created_at?: string
          cta_label?: string | null
          cta_link_id?: string | null
          description?: string | null
          eligibility?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          starts_at?: string | null
          terms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commerce_offers_cta_link_id_fkey"
            columns: ["cta_link_id"]
            isOneToOne: false
            referencedRelation: "commerce_booking_links"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_prices: {
        Row: {
          amount_pence: number | null
          booking_link_id: string | null
          created_at: string
          cta_label: string | null
          currency: string
          description: string | null
          ends_at: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          kind: string
          name: string
          previous_amount_pence: number | null
          service_slug: string | null
          slug: string
          sort_order: number
          starts_at: string | null
          terms: string | null
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          amount_pence?: number | null
          booking_link_id?: string | null
          created_at?: string
          cta_label?: string | null
          currency?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          kind: string
          name: string
          previous_amount_pence?: number | null
          service_slug?: string | null
          slug: string
          sort_order?: number
          starts_at?: string | null
          terms?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          amount_pence?: number | null
          booking_link_id?: string | null
          created_at?: string
          cta_label?: string | null
          currency?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          kind?: string
          name?: string
          previous_amount_pence?: number | null
          service_slug?: string | null
          slug?: string
          sort_order?: number
          starts_at?: string | null
          terms?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commerce_prices_booking_link_id_fkey"
            columns: ["booking_link_id"]
            isOneToOne: false
            referencedRelation: "commerce_booking_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commerce_prices_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "commerce_venues"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_schedule_exceptions: {
        Row: {
          created_at: string
          exception_date: string
          exception_type: string
          id: string
          new_end_time: string | null
          new_start_time: string | null
          public_notice: string | null
          replacement_venue_id: string | null
          slot_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          exception_date: string
          exception_type: string
          id?: string
          new_end_time?: string | null
          new_start_time?: string | null
          public_notice?: string | null
          replacement_venue_id?: string | null
          slot_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          exception_date?: string
          exception_type?: string
          id?: string
          new_end_time?: string | null
          new_start_time?: string | null
          public_notice?: string | null
          replacement_venue_id?: string | null
          slot_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commerce_schedule_exceptions_replacement_venue_id_fkey"
            columns: ["replacement_venue_id"]
            isOneToOne: false
            referencedRelation: "commerce_venues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commerce_schedule_exceptions_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "commerce_schedule_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_schedule_slots: {
        Row: {
          booking_link_id: string | null
          class_style: string
          created_at: string
          end_time: string
          id: string
          instructor_id: string | null
          is_active: boolean
          level: string | null
          social_end_time: string | null
          social_start_time: string | null
          sort_order: number
          start_time: string
          updated_at: string
          venue_id: string | null
          weekday: number
        }
        Insert: {
          booking_link_id?: string | null
          class_style: string
          created_at?: string
          end_time: string
          id?: string
          instructor_id?: string | null
          is_active?: boolean
          level?: string | null
          social_end_time?: string | null
          social_start_time?: string | null
          sort_order?: number
          start_time: string
          updated_at?: string
          venue_id?: string | null
          weekday: number
        }
        Update: {
          booking_link_id?: string | null
          class_style?: string
          created_at?: string
          end_time?: string
          id?: string
          instructor_id?: string | null
          is_active?: boolean
          level?: string | null
          social_end_time?: string | null
          social_start_time?: string | null
          sort_order?: number
          start_time?: string
          updated_at?: string
          venue_id?: string | null
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "commerce_schedule_slots_booking_link_id_fkey"
            columns: ["booking_link_id"]
            isOneToOne: false
            referencedRelation: "commerce_booking_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commerce_schedule_slots_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "commerce_venues"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_services: {
        Row: {
          availability: string
          category: string
          created_at: string
          cta_label: string | null
          default_booking_link_id: string | null
          id: string
          is_listed: boolean
          name: string
          pause_reason: string | null
          public_notice: string | null
          slug: string
          sort_order: number
          summary: string | null
          updated_at: string
        }
        Insert: {
          availability?: string
          category?: string
          created_at?: string
          cta_label?: string | null
          default_booking_link_id?: string | null
          id?: string
          is_listed?: boolean
          name: string
          pause_reason?: string | null
          public_notice?: string | null
          slug: string
          sort_order?: number
          summary?: string | null
          updated_at?: string
        }
        Update: {
          availability?: string
          category?: string
          created_at?: string
          cta_label?: string | null
          default_booking_link_id?: string | null
          id?: string
          is_listed?: boolean
          name?: string
          pause_reason?: string | null
          public_notice?: string | null
          slug?: string
          sort_order?: number
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commerce_services_default_booking_link_id_fkey"
            columns: ["default_booking_link_id"]
            isOneToOne: false
            referencedRelation: "commerce_booking_links"
            referencedColumns: ["id"]
          },
        ]
      }
      commerce_venues: {
        Row: {
          accessibility_html: string | null
          address_line_1: string | null
          address_line_2: string | null
          created_at: string
          directions_html: string | null
          faqs: Json
          hero_image_url: string | null
          id: string
          is_active: boolean
          map_url: string | null
          name: string
          parking_html: string | null
          postcode: string | null
          seo_description: string | null
          seo_title: string | null
          short_name: string | null
          slug: string
          sort_order: number
          transport_html: string | null
          updated_at: string
        }
        Insert: {
          accessibility_html?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          created_at?: string
          directions_html?: string | null
          faqs?: Json
          hero_image_url?: string | null
          id?: string
          is_active?: boolean
          map_url?: string | null
          name: string
          parking_html?: string | null
          postcode?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_name?: string | null
          slug: string
          sort_order?: number
          transport_html?: string | null
          updated_at?: string
        }
        Update: {
          accessibility_html?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          created_at?: string
          directions_html?: string | null
          faqs?: Json
          hero_image_url?: string | null
          id?: string
          is_active?: boolean
          map_url?: string | null
          name?: string
          parking_html?: string | null
          postcode?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_name?: string | null
          slug?: string
          sort_order?: number
          transport_html?: string | null
          updated_at?: string
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
      email_templates: {
        Row: {
          body_html: string
          body_text: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          merge_fields: Json
          name: string
          slug: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          body_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          merge_fields?: Json
          name: string
          slug: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          body_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          merge_fields?: Json
          name?: string
          slug?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          assigned_to: string | null
          closed_at: string | null
          created_at: string
          due_at: string | null
          email: string
          first_response_at: string | null
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          priority: string
          replied_at: string | null
          source_page: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          due_at?: string | null
          email: string
          first_response_at?: string | null
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          priority?: string
          replied_at?: string | null
          source_page?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          closed_at?: string | null
          created_at?: string
          due_at?: string | null
          email?: string
          first_response_at?: string | null
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          priority?: string
          replied_at?: string | null
          source_page?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiry_notes: {
        Row: {
          author_email: string | null
          author_id: string | null
          content: string
          created_at: string
          enquiry_id: string
          id: string
          kind: string
          pinned: boolean
        }
        Insert: {
          author_email?: string | null
          author_id?: string | null
          content: string
          created_at?: string
          enquiry_id: string
          id?: string
          kind?: string
          pinned?: boolean
        }
        Update: {
          author_email?: string | null
          author_id?: string | null
          content?: string
          created_at?: string
          enquiry_id?: string
          id?: string
          kind?: string
          pinned?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_notes_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
        ]
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
      form_rate_limits: {
        Row: {
          bucket_key: string
          count: number
          form_slug: string
          id: string
          last_seen_at: string
          window_started_at: string
        }
        Insert: {
          bucket_key: string
          count?: number
          form_slug: string
          id?: string
          last_seen_at?: string
          window_started_at?: string
        }
        Update: {
          bucket_key?: string
          count?: number
          form_slug?: string
          id?: string
          last_seen_at?: string
          window_started_at?: string
        }
        Relationships: []
      }
      form_submission_hashes: {
        Row: {
          created_at: string
          form_slug: string
          hash: string
        }
        Insert: {
          created_at?: string
          form_slug: string
          hash: string
        }
        Update: {
          created_at?: string
          form_slug?: string
          hash?: string
        }
        Relationships: []
      }
      forms_config: {
        Row: {
          created_at: string
          description: string | null
          fields: Json
          id: string
          is_active: boolean
          name: string
          slug: string
          submit_label: string
          success_message: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          name: string
          slug: string
          submit_label?: string
          success_message?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          fields?: Json
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          submit_label?: string
          success_message?: string
          updated_at?: string
        }
        Relationships: []
      }
      free_taster_leads: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          message: string | null
          source_page: string | null
          venue_preference: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          message?: string | null
          source_page?: string | null
          venue_preference?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          message?: string | null
          source_page?: string | null
          venue_preference?: string | null
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
      notification_log: {
        Row: {
          created_at: string
          enquiry_type: string | null
          error_message: string | null
          form_slug: string
          id: string
          is_test: boolean
          metadata: Json
          recipient_email: string
          route_id: string | null
          status: string
          submission_id: string | null
          template_name: string
        }
        Insert: {
          created_at?: string
          enquiry_type?: string | null
          error_message?: string | null
          form_slug: string
          id?: string
          is_test?: boolean
          metadata?: Json
          recipient_email: string
          route_id?: string | null
          status?: string
          submission_id?: string | null
          template_name: string
        }
        Update: {
          created_at?: string
          enquiry_type?: string | null
          error_message?: string | null
          form_slug?: string
          id?: string
          is_test?: boolean
          metadata?: Json
          recipient_email?: string
          route_id?: string | null
          status?: string
          submission_id?: string | null
          template_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "notification_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_routes: {
        Row: {
          cc_emails: string[]
          created_at: string
          enquiry_type: string | null
          escalation_minutes: number
          form_slug: string
          id: string
          internal_template_id: string | null
          is_active: boolean
          recipient_email: string
          send_user_confirmation: boolean
          template_name: string
          updated_at: string
          user_confirmation_template: string
          user_template_id: string | null
        }
        Insert: {
          cc_emails?: string[]
          created_at?: string
          enquiry_type?: string | null
          escalation_minutes?: number
          form_slug: string
          id?: string
          internal_template_id?: string | null
          is_active?: boolean
          recipient_email: string
          send_user_confirmation?: boolean
          template_name?: string
          updated_at?: string
          user_confirmation_template?: string
          user_template_id?: string | null
        }
        Update: {
          cc_emails?: string[]
          created_at?: string
          enquiry_type?: string | null
          escalation_minutes?: number
          form_slug?: string
          id?: string
          internal_template_id?: string | null
          is_active?: boolean
          recipient_email?: string
          send_user_confirmation?: boolean
          template_name?: string
          updated_at?: string
          user_confirmation_template?: string
          user_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_routes_internal_template_id_fkey"
            columns: ["internal_template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_routes_user_template_id_fkey"
            columns: ["user_template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
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
      security_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          meta: Json
          page_path: string | null
          severity: string
          source: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          meta?: Json
          page_path?: string | null
          severity?: string
          source: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          meta?: Json
          page_path?: string | null
          severity?: string
          source?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      seo_alerts: {
        Row: {
          acknowledged: boolean
          baseline_value: number
          created_at: string
          current_value: number
          delta_pct: number
          emailed: boolean
          id: string
          message: string
          metric: string
          severity: string
          site: string
        }
        Insert: {
          acknowledged?: boolean
          baseline_value: number
          created_at?: string
          current_value: number
          delta_pct: number
          emailed?: boolean
          id?: string
          message: string
          metric: string
          severity?: string
          site: string
        }
        Update: {
          acknowledged?: boolean
          baseline_value?: number
          created_at?: string
          current_value?: number
          delta_pct?: number
          emailed?: boolean
          id?: string
          message?: string
          metric?: string
          severity?: string
          site?: string
        }
        Relationships: []
      }
      seo_broken_links: {
        Row: {
          error_type: string | null
          first_seen_at: string
          found_on: string | null
          id: string
          last_checked_at: string
          resolved_at: string | null
          status_code: number | null
          url: string
        }
        Insert: {
          error_type?: string | null
          first_seen_at?: string
          found_on?: string | null
          id?: string
          last_checked_at?: string
          resolved_at?: string | null
          status_code?: number | null
          url: string
        }
        Update: {
          error_type?: string | null
          first_seen_at?: string
          found_on?: string | null
          id?: string
          last_checked_at?: string
          resolved_at?: string | null
          status_code?: number | null
          url?: string
        }
        Relationships: []
      }
      seo_gsc_daily: {
        Row: {
          captured_at: string
          clicks: number
          ctr: number
          date: string
          id: string
          impressions: number
          indexed_pages: number | null
          position: number
          site: string
          submitted_pages: number | null
        }
        Insert: {
          captured_at?: string
          clicks?: number
          ctr?: number
          date: string
          id?: string
          impressions?: number
          indexed_pages?: number | null
          position?: number
          site: string
          submitted_pages?: number | null
        }
        Update: {
          captured_at?: string
          clicks?: number
          ctr?: number
          date?: string
          id?: string
          impressions?: number
          indexed_pages?: number | null
          position?: number
          site?: string
          submitted_pages?: number | null
        }
        Relationships: []
      }
      seo_keyword_tracking: {
        Row: {
          baseline_position: number | null
          created_at: string
          current_position: number | null
          database: string
          id: string
          is_active: boolean
          keyword: string
          last_checked_at: string | null
          notes: string | null
          target_url: string
          updated_at: string
        }
        Insert: {
          baseline_position?: number | null
          created_at?: string
          current_position?: number | null
          database?: string
          id?: string
          is_active?: boolean
          keyword: string
          last_checked_at?: string | null
          notes?: string | null
          target_url: string
          updated_at?: string
        }
        Update: {
          baseline_position?: number | null
          created_at?: string
          current_position?: number | null
          database?: string
          id?: string
          is_active?: boolean
          keyword?: string
          last_checked_at?: string | null
          notes?: string | null
          target_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_schema_snapshots: {
        Row: {
          changed_from_previous: boolean
          checked_at: string
          id: string
          schema_hash: string
          schema_json: Json | null
          url: string
        }
        Insert: {
          changed_from_previous?: boolean
          checked_at?: string
          id?: string
          schema_hash: string
          schema_json?: Json | null
          url: string
        }
        Update: {
          changed_from_previous?: boolean
          checked_at?: string
          id?: string
          schema_hash?: string
          schema_json?: Json | null
          url?: string
        }
        Relationships: []
      }
      seo_sitemap_snapshot: {
        Row: {
          added_urls: Json
          captured_at: string
          errors: number | null
          id: string
          indexed: number | null
          last_submitted: string | null
          removed_urls: Json
          site: string
          sitemap_path: string
          submitted: number | null
          urls: Json
          warnings: number | null
        }
        Insert: {
          added_urls?: Json
          captured_at?: string
          errors?: number | null
          id?: string
          indexed?: number | null
          last_submitted?: string | null
          removed_urls?: Json
          site: string
          sitemap_path: string
          submitted?: number | null
          urls?: Json
          warnings?: number | null
        }
        Update: {
          added_urls?: Json
          captured_at?: string
          errors?: number | null
          id?: string
          indexed?: number | null
          last_submitted?: string | null
          removed_urls?: Json
          site?: string
          sitemap_path?: string
          submitted?: number | null
          urls?: Json
          warnings?: number | null
        }
        Relationships: []
      }
      seo_weekly_digests: {
        Row: {
          alerts_count: number
          broken_links_count: number
          freshness_outdated_count: number
          generated_at: string
          id: string
          metrics: Json
          schema_drift_count: number
          week_start: string
        }
        Insert: {
          alerts_count?: number
          broken_links_count?: number
          freshness_outdated_count?: number
          generated_at?: string
          id?: string
          metrics?: Json
          schema_drift_count?: number
          week_start: string
        }
        Update: {
          alerts_count?: number
          broken_links_count?: number
          freshness_outdated_count?: number
          generated_at?: string
          id?: string
          metrics?: Json
          schema_drift_count?: number
          week_start?: string
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
          moderated_at: string | null
          moderated_by: string | null
          moderation_note: string | null
          moderation_status: string
          person_name: string
          platform: string
          quote: string
          rating: number | null
          rotation_rank: number
          source_type: string | null
          source_url: string | null
          submitted_at: string | null
          submitted_by_email: string | null
          submitted_by_name: string | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          context_label?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_note?: string | null
          moderation_status?: string
          person_name: string
          platform?: string
          quote: string
          rating?: number | null
          rotation_rank?: number
          source_type?: string | null
          source_url?: string | null
          submitted_at?: string | null
          submitted_by_email?: string | null
          submitted_by_name?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          context_label?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_note?: string | null
          moderation_status?: string
          person_name?: string
          platform?: string
          quote?: string
          rating?: number | null
          rotation_rank?: number
          source_type?: string | null
          source_url?: string | null
          submitted_at?: string | null
          submitted_by_email?: string | null
          submitted_by_name?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content:
        | { Args: never; Returns: boolean }
        | { Args: { _user_id: string }; Returns: boolean }
      cms_page_freshness: {
        Args: { _published_at: string; _review_date: string }
        Returns: string
      }
      compute_enquiry_due_at: {
        Args: { _priority: string; _subject: string }
        Returns: string
      }
      has_role:
        | {
            Args: { _role: Database["public"]["Enums"]["app_role"] }
            Returns: boolean
          }
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
      is_admin:
        | { Args: never; Returns: boolean }
        | { Args: { _user_id: string }; Returns: boolean }
      provision_my_profile: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      purge_old_security_events: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "owner" | "admin" | "editor" | "viewer"
      cms_page_status: "draft" | "scheduled" | "published" | "archived"
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
      cms_page_status: ["draft", "scheduled", "published", "archived"],
    },
  },
} as const
