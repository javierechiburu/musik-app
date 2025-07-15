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
      usuario: {
        Row: {
          id: number
          auth_id: string
          nombre: string
          apellido: string
          email: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          auth_id: string
          nombre: string
          apellido: string
          email: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          auth_id?: string
          nombre?: string
          apellido?: string
          email?: string
          role?: string
          created_at?: string
          updated_at?: string
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