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
          id: string;
          auth_id: string;
          username: string;
          fullname: string;
          email: string;
          role: string;
          created_at: string;
          update_at: string;
          must_change_password: boolean;
          verified: boolean;
          chartmetric_id: number | null;
        };
        Insert: {
          id?: string;
          auth_id: string;
          username: string;
          fullname: string;
          email: string;
          role?: string;
          created_at?: string;
          update_at?: string;
          must_change_password?: boolean;
          verified?: boolean;
          chartmetric_id?: number | null;
        };
        Update: {
          id?: string;
          auth_id?: string;
          username?: string;
          fullname?: string;
          email?: string;
          role?: string;
          created_at?: string;
          update_at?: string;
          must_change_password?: boolean;
          verified?: boolean;
          chartmetric_id?: number | null;
        };
        Relationships: [];
      };
      cuentas_bancarias: {
        Row: {
          id: string;
          usuario_id: string | null;
          titular: string | null;
          rut: string | null;
          banco: string | null;
          tipo_cuenta: string | null;
          numero_cuenta: string | null;
          img_cedula: string | null;
          img_selfie: string | null;
          cuenta_verificada: boolean | null;
          creado_en: string | null;
          monto_billetera: number | null;
        };
        Insert: {
          id?: string;
          usuario_id?: string | null;
          titular?: string | null;
          rut?: string | null;
          banco?: string | null;
          tipo_cuenta?: string | null;
          numero_cuenta?: string | null;
          img_cedula?: string | null;
          img_selfie?: string | null;
          cuenta_verificada?: boolean | null;
          creado_en?: string | null;
          monto_billetera?: number | null;
        };
        Update: {
          id?: string;
          usuario_id?: string | null;
          titular?: string | null;
          rut?: string | null;
          banco?: string | null;
          tipo_cuenta?: string | null;
          numero_cuenta?: string | null;
          img_cedula?: string | null;
          img_selfie?: string | null;
          cuenta_verificada?: boolean | null;
          creado_en?: string | null;
          monto_billetera?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "cuentas_bancarias_usuario_id_fkey";
            columns: ["usuario_id"];
            referencedRelation: "usuario";
            referencedColumns: ["id"];
          }
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
