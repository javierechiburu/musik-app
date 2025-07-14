import { NextResponse } from "next/server";
import { supabase } from "@/config/supabase/supabaseClient";

export async function GET() {
  try {
    // Obtener datos de la tabla marketing
    const { data, error } = await supabase
      .from("marketing")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener solicitudes:", error);
      return NextResponse.json(
        {
          error: "Error al obtener solicitudes de marketing",
          details: error.message,
        },
        { status: 500 }
      );
    }

    // Transformar los datos de la base de datos al formato esperado por el frontend
    const transformedData = data.map((item) => ({
      id: item.id.toString(),
      title: `Campaña Marketing - ${new Date(item.created_at).toLocaleDateString()}`,
      tools: getToolsFromSegmentation(item),
      budget: item.monto
        ? `$${item.monto.toLocaleString()}`
        : "No especificado",
      objective: "Promoción musical",
      timeline: "Por definir",
      status: getStatusFromId(item.id_estado),
      createdAt: new Date(item.created_at).toLocaleDateString(),
      updatedAt: new Date(item.created_at).toLocaleDateString(),
      notes: item.descripcion || "Sin notas adicionales",
      segmentation: {
        countries: item.ids_paises || [],
        genders: item.ids_generos || [],
        ages: item.ids_edades || [],
        genres: item.ids_generos_musicales || [],
      },
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error en API marketing-requests:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Función para obtener herramientas basadas en la segmentación
function getToolsFromSegmentation(item: unknown): string[] {
  const tools = [];

  // Lógica para inferir herramientas basada en la segmentación
  if (item.ids_paises && item.ids_paises.length > 0) {
    tools.push("Google Ads");
  }
  if (item.ids_generos_musicales && item.ids_generos_musicales.length > 0) {
    tools.push("Spotify Marquee");
  }
  if (
    item.ids_edades &&
    item.ids_edades.some(
      (age: string) => age.includes("18-24") || age.includes("24-34")
    )
  ) {
    tools.push("Meta Ads", "TikTok Ads");
  }

  return tools.length > 0 ? tools : ["Marketing General"];
}

// Función para mapear ID de estado a string
function getStatusFromId(id_estado: number): string {
  const statusMap: { [key: number]: string } = {
    1: "pending",
    2: "approved",
    3: "in_progress",
    4: "completed",
    5: "rejected",
  };

  return statusMap[id_estado] || "pending";
}
