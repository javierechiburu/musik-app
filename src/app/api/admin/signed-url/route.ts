import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Verifica si el usuario actual es administrador
async function verifyAdminAccess(supabase: any) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { isAdmin: false, error: "No autorizado" };
  }

  // Consulta la tabla usuario para obtener el rol
  const { data: profile, error: profileError } = await supabase
    .from("usuario")
    .select("role")
    .eq("auth_id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      isAdmin: false,
      error: "Acceso denegado - Solo administradores",
    };
  }

  return { isAdmin: true, user };
}

// POST - Crea una signed URL temporal para una imagen privada
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar si el usuario es admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    // Obtener el path enviado en el body
    const { path: fullUrl } = await request.json();

    if (!fullUrl) {
      return NextResponse.json(
        { error: "El campo 'path' es requerido" },
        { status: 400 }
      );
    }

    // Extraer la ruta relativa al bucket "verificacion"
    const matches = fullUrl.match(/verificacion\/(.+)$/);
    const internalPath = matches?.[1];

    if (!internalPath) {
      return NextResponse.json(
        { error: "La URL proporcionada no es válida" },
        { status: 400 }
      );
    }

    // Crear signed URL válida por 1 hora
    const { data, error } = await supabase.storage
      .from("verificacion")
      .createSignedUrl(internalPath, 60 * 60); // 1 hora

    if (error) {
      console.log("E---", error);
      return NextResponse.json(
        {
          error: "Error al crear la URL temporal",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
    });
  } catch (error) {
    console.error("❌ Error interno en signed-url:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
