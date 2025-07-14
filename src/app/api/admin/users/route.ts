import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Función auxiliar para verificar si el usuario es admin
async function verifyAdminRole(request: NextRequest): Promise<{ user: any; isAdmin: boolean }> {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Obtener usuario actual
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return { user: null, isAdmin: false };
    }
    
    // Verificar rol del usuario
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    
    if (roleError || !userData) {
      return { user, isAdmin: false };
    }
    
    return { user, isAdmin: userData.role === "admin" };
  } catch (error) {
    console.error("Error verifying admin role:", error);
    return { user: null, isAdmin: false };
  }
}

// GET - Obtener lista de usuarios (solo admin)
export async function GET(request: NextRequest) {
  try {
    const { user, isAdmin } = await verifyAdminRole(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    
    let query = supabase
      .from("users")
      .select(`
        id,
        email,
        full_name,
        role,
        created_at,
        last_sign_in_at,
        email_confirmed_at
      `)
      .order("created_at", { ascending: false });
    
    // Filtro de búsqueda
    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
    }
    
    // Paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data: users, error, count } = await query;
    
    if (error) {
      return NextResponse.json(
        { error: "Error al obtener usuarios" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    console.error("Error in GET /api/admin/users:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar usuario (solo admin)
export async function PUT(request: NextRequest) {
  try {
    const { user, isAdmin } = await verifyAdminRole(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { userId, updates } = body;
    
    if (!userId || !updates) {
      return NextResponse.json(
        { error: "ID de usuario y datos de actualización son requeridos" },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Campos permitidos para actualización
    const allowedFields = ["role", "full_name"];
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});
    
    if (Object.keys(filteredUpdates).length === 0) {
      return NextResponse.json(
        { error: "No hay campos válidos para actualizar" },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from("users")
      .update(filteredUpdates)
      .eq("id", userId)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json(
        { error: "Error al actualizar usuario" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: "Usuario actualizado exitosamente",
      user: data
    });
  } catch (error) {
    console.error("Error in PUT /api/admin/users:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar usuario (solo admin)
export async function DELETE(request: NextRequest) {
  try {
    const { user, isAdmin } = await verifyAdminRole(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }
    
    // Prevenir que el admin se elimine a sí mismo
    if (userId === user.id) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propia cuenta" },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Eliminar usuario de la tabla personalizada
    const { error: dbError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
    
    if (dbError) {
      return NextResponse.json(
        { error: "Error al eliminar usuario de la base de datos" },
        { status: 500 }
      );
    }
    
    // Eliminar usuario de Auth (requiere service role key)
    // Nota: Esto requiere llamar a la API de admin de Supabase
    // Por seguridad, podríamos marcar el usuario como "inactivo" en su lugar
    
    return NextResponse.json({
      message: "Usuario eliminado exitosamente"
    });
  } catch (error) {
    console.error("Error in DELETE /api/admin/users:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}