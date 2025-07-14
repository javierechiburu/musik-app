import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/config/supabase/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    const { id_usuario, monto, tipo_pago, datos_pago } = body;
    
    if (!id_usuario || !monto || !tipo_pago || !datos_pago) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Insertar en la tabla billetera usando RPC para evitar problemas de RLS
    const { data, error } = await supabase.rpc("insert_billetera_request", {
      p_id_usuario: id_usuario,
      p_monto: monto,
      p_tipo_pago: tipo_pago,
      p_datos_pago: datos_pago
    });

    if (error) {
      console.error("Error al insertar en billetera:", error);
      return NextResponse.json(
        { error: "Error al guardar la solicitud de retiro" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en API billetera:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id_usuario = searchParams.get("id_usuario");

    if (!id_usuario) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }

    // Obtener solicitudes de retiro del usuario
    const { data, error } = await supabase
      .from("billetera")
      .select("*")
      .eq("id_usuario", id_usuario)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener datos de billetera:", error);
      return NextResponse.json(
        { error: "Error al obtener solicitudes de retiro" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error en API billetera GET:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}