import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Función para verificar si el usuario es admin
async function verifyAdminAccess(supabase: any) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { isAdmin: false, error: "No autorizado" };
  }

  // Verificar si el usuario tiene rol de admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return { isAdmin: false, error: "Acceso denegado - Solo administradores" };
  }

  return { isAdmin: true, user };
}

// PATCH - Actualizar estado de verificación de cuenta específica
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Verificar acceso de admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    const { id } = params;
    const { cuenta_verificada } = await request.json();

    if (typeof cuenta_verificada !== "boolean") {
      return NextResponse.json(
        { error: "Estado de verificación inválido" },
        { status: 400 }
      );
    }

    // Actualizar estado de verificación
    const { data, error } = await supabase
      .from("cuentas_bancarias")
      .update({ cuenta_verificada })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar verificación:", error);
      return NextResponse.json(
        { error: "Error al actualizar verificación", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: `Cuenta ${cuenta_verificada ? "verificada" : "marcada como no verificada"} correctamente`,
    });
  } catch (error) {
    console.error("Error en API lista-bancos PATCH:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar cuenta bancaria específica
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Verificar acceso de admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    const { id } = params;

    // Obtener información de la cuenta antes de eliminarla (para eliminar archivos)
    const { data: account, error: getError } = await supabase
      .from("cuentas_bancarias")
      .select("img_cedula, img_selfie")
      .eq("id", id)
      .single();

    if (getError) {
      console.error("Error al obtener cuenta:", getError);
      return NextResponse.json(
        { error: "Cuenta no encontrada", details: getError.message },
        { status: 404 }
      );
    }

    // Eliminar cuenta de la base de datos
    const { error: deleteError } = await supabase
      .from("cuentas_bancarias")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error al eliminar cuenta:", deleteError);
      return NextResponse.json(
        { error: "Error al eliminar cuenta", details: deleteError.message },
        { status: 500 }
      );
    }

    // Opcional: Eliminar archivos de storage si existen
    if (account.img_cedula) {
      const cedulaPath = account.img_cedula.split("/").pop();
      if (cedulaPath) {
        await supabase.storage.from("verificacion").remove([cedulaPath]);
      }
    }

    if (account.img_selfie) {
      const selfiePath = account.img_selfie.split("/").pop();
      if (selfiePath) {
        await supabase.storage.from("verificacion").remove([selfiePath]);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cuenta bancaria eliminada correctamente",
    });
  } catch (error) {
    console.error("Error en API lista-bancos DELETE:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}