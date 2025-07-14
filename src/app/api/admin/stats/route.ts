import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Función auxiliar para verificar si el usuario es admin
async function verifyAdminRole(): Promise<{ user: any; isAdmin: boolean }> {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { user: null, isAdmin: false };
    }

    const { data: userData, error: roleError } = await supabase
      .from("usuario")
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

// GET - Obtener estadísticas del sistema (solo admin)
export async function GET() {
  try {
    const { user, isAdmin } = await verifyAdminRole();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Obtener estadísticas paralelas
    const [usersStats, marketingStats, billeteraStats, recentActivity] =
      await Promise.all([
        // Estadísticas de usuarios
        supabase.from("usuario").select("role, created_at", { count: "exact" }),

        // Estadísticas de marketing
        supabase
          .from("marketing")
          .select("id_estado, created_at", { count: "exact" }),

        // Estadísticas de billetera
        supabase
          .from("billetera")
          .select("monto, created_at", { count: "exact" }),

        // Actividad reciente (últimos 30 días)
        supabase
          .from("usuario")
          .select("created_at, full_name, role")
          .gte(
            "created_at",
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          )
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

    // Procesar estadísticas de usuarios
    const totalUsers = usersStats.count || 0;
    const adminUsers =
      usersStats.data?.filter((u) => u.role === "admin").length || 0;
    const regularUsers = totalUsers - adminUsers;

    // Usuarios registrados hoy
    const today = new Date().toISOString().split("T")[0];
    const newUsersToday =
      usersStats.data?.filter((u) => u.created_at.startsWith(today)).length ||
      0;

    // Procesar estadísticas de marketing
    const totalMarketingRequests = marketingStats.count || 0;
    const pendingMarketing =
      marketingStats.data?.filter((m) => m.id_estado === 1).length || 0;
    const approvedMarketing =
      marketingStats.data?.filter((m) => m.id_estado === 2).length || 0;

    // Procesar estadísticas de billetera
    const totalWithdrawals = billeteraStats.count || 0;
    const totalWithdrawalAmount =
      billeteraStats.data?.reduce((sum, b) => sum + (b.monto || 0), 0) || 0;

    // Actividad reciente
    const recentUsers =
      recentActivity.data?.map((u) => ({
        name: u.full_name,
        role: u.role,
        date: u.created_at,
      })) || [];

    return NextResponse.json({
      users: {
        total: totalUsers,
        admin: adminUsers,
        regular: regularUsers,
        newToday: newUsersToday,
      },
      marketing: {
        total: totalMarketingRequests,
        pending: pendingMarketing,
        approved: approvedMarketing,
        completionRate:
          totalMarketingRequests > 0
            ? ((approvedMarketing / totalMarketingRequests) * 100).toFixed(1)
            : "0",
      },
      billetera: {
        totalRequests: totalWithdrawals,
        totalAmount: totalWithdrawalAmount,
        averageAmount:
          totalWithdrawals > 0
            ? (totalWithdrawalAmount / totalWithdrawals).toFixed(2)
            : "0",
      },
      recentActivity: recentUsers,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in GET /api/admin/stats:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
