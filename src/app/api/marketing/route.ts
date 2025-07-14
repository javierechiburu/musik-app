import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/config/supabase/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos requeridos
    if (!body.ids_paises || !body.ids_generos || !body.ids_edades || !body.ids_generos_musicales) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Insertar datos en la tabla marketing usando RPC
    const { data, error } = await supabase
      .rpc('insert_marketing_request', { marketing_data: body });

    if (error) {
      console.error('Error al insertar en marketing:', error);
      return NextResponse.json(
        { error: "Error al insertar datos en la base de datos", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: "Datos insertados correctamente"
    });

  } catch (error) {
    console.error('Error en API marketing:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}