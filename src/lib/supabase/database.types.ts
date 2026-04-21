export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          client_name: string
          logo_url: string | null
          description: string | null
          cover_image: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          logo_url?: string | null
          description?: string | null
          cover_image?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          logo_url?: string | null
          description?: string | null
          cover_image?: string | null
          category?: string | null
          created_at?: string
        }
      }
    }
  }
}
