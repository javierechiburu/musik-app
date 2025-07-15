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
    .from("usuario")
    .select("role")
    .eq("auth_id", user.id)
    .single();

  console.log("profile", profile);

  if (profileError || profile?.role !== "admin") {
    return {
      isAdmin: false,
      error: "Acceso denegado - Solo administradoreees",
    };
  }

  return { isAdmin: true, user };
}

// GET - Obtener todas las cuentas bancarias con filtros
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar acceso de admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const verified = searchParams.get("verified");
    const banco = searchParams.get("banco");
    const search = searchParams.get("search");

    // Obtener todas las cuentas bancarias
    let query = supabase
      .from("cuentas_bancarias")
      .select("*")
      .order("creado_en", { ascending: false });

    // Aplicar filtros
    if (verified !== null) {
      query = query.eq("cuenta_verificada", verified === "true");
    }

    if (banco) {
      query = query.eq("banco", banco);
    }

    if (search) {
      query = query.or(
        `titular.ilike.%${search}%,rut.ilike.%${search}%,numero_cuenta.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error al obtener cuentas bancarias:", error);
      return NextResponse.json(
        { error: "Error al obtener cuentas bancarias", details: error.message },
        { status: 500 }
      );
    }

    // Obtener información de usuarios desde auth.users
    const userIds = [...new Set(data.map((cuenta: any) => cuenta.usuario_id))];

    let formattedData = data;

    if (userIds.length > 0) {
      // Consultar información de usuarios desde auth.users
      const { data: users, error: usersError } =
        await supabase.auth.admin.listUsers();

      if (!usersError && users) {
        const userMap = new Map();
        users.users.forEach((user: any) => {
          userMap.set(user.id, {
            email: user.email,
            nombre:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "N/A",
          });
        });

        formattedData = data.map((cuenta: any) => ({
          ...cuenta,
          usuario: userMap.get(cuenta.usuario_id) || {
            email: "N/A",
            nombre: "N/A",
          },
        }));
      } else {
        // Fallback: solo usar los IDs de usuario
        formattedData = data.map((cuenta: any) => ({
          ...cuenta,
          usuario: {
            email: "N/A",
            nombre: "N/A",
          },
        }));
      }
    }

    return NextResponse.json({
      success: true,
      data: formattedData,
      total: formattedData.length,
    });
  } catch (error) {
    console.error("Error en API lista-bancos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar estado de verificación
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar acceso de admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("id");
    const { cuenta_verificada } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: "ID de cuenta requerido" },
        { status: 400 }
      );
    }

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
      .eq("id", Number(accountId))
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

// DELETE - Eliminar cuenta bancaria
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar acceso de admin
    const { isAdmin, error: authError } = await verifyAdminAccess(supabase);
    if (!isAdmin) {
      return NextResponse.json({ error: authError }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("id");

    if (!accountId) {
      return NextResponse.json(
        { error: "ID de cuenta requerido" },
        { status: 400 }
      );
    }

    // Obtener información de la cuenta antes de eliminarla (para eliminar archivos)
    const { data: account, error: getError } = await supabase
      .from("cuentas_bancarias")
      .select("img_cedula, img_selfie")
      .eq("id", Number(accountId))
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
      .eq("id", Number(accountId));

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
