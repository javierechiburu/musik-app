export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      usuario: {
        Row: {
          id: number;
          auth_id: string;
          nombre: string;
          apellido: string;
          email: string;
          role: string;
          created_at: string;
          updated_at: string;
          must_change_password: boolean;
        };
        Insert: {
          id?: number;
          auth_id: string;
          nombre: string;
          apellido: string;
          email: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
          must_change_password?: boolean;
        };
        Update: {
          id?: number;
          auth_id?: string;
          nombre?: string;
          apellido?: string;
          email?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
          must_change_password?: boolean;
        };
        Relationships: [];
      };
      cuentas_bancarias: {
        Row: {
          id: number;
          usuario_id: string;
          titular: string;
          rut: string;
          banco: string;
          tipo_cuenta: string;
          numero_cuenta: string;
          cuenta_verificada: boolean;
          img_cedula: string | null;
          img_selfie: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          usuario_id: string;
          titular: string;
          rut: string;
          banco: string;
          tipo_cuenta: string;
          numero_cuenta: string;
          cuenta_verificada?: boolean;
          img_cedula?: string | null;
          img_selfie?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          usuario_id?: string;
          titular?: string;
          rut?: string;
          banco?: string;
          tipo_cuenta?: string;
          numero_cuenta?: string;
          cuenta_verificada?: boolean;
          img_cedula?: string | null;
          img_selfie?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cuentas_bancarias_usuario_id_fkey";
            columns: ["usuario_id"];
            referencedRelation: "usuario";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
