import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar datos requeridos
    if (!body.tools || !body.segmentation) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Formatear herramientas seleccionadas
    const selectedTools = Object.entries(body.tools)
      .filter(([selected]) => selected)
      .map(([tool]) => {
        const toolNames: { [key: string]: string } = {
          googleAds: "Google Ads",
          marquee: "Spotify Marquee",
          meta: "Meta Ads",
          tiktokAds: "TikTok Ads",
          kali: "Kali",
          mediosDigitales: "Medios Digitales",
          mediosTradicionales: "Medios Tradicionales",
        };
        return toolNames[tool] || tool;
      });

    // Crear contenido del email
    const emailContent = `
      <h2>Nueva Solicitud de Marketing</h2>
      <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
      
      <h3>Herramientas Seleccionadas:</h3>
      <ul>
        ${selectedTools.map((tool) => `<li>${tool}</li>`).join("")}
      </ul>
      
      <h3>Segmentación:</h3>
      <p><strong>Países:</strong> ${body.segmentation.countries.join(", ") || "No especificado"}</p>
      <p><strong>Géneros:</strong> ${body.segmentation.genders.join(", ") || "No especificado"}</p>
      <p><strong>Edades:</strong> ${body.segmentation.ages.join(", ") || "No especificado"}</p>
      <p><strong>Géneros Musicales:</strong> ${body.segmentation.genres.join(", ") || "No especificado"}</p>
      
      <h3>Información Adicional:</h3>
      <p><strong>Presupuesto:</strong> ${body.budget || "No especificado"}</p>
      <p><strong>Notas:</strong> ${body.additional_notes || "Sin notas adicionales"}</p>
    `;

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "marketing@yourdomain.com",
      to: ["marketing@yourdomain.com"],
      subject: "Nueva Solicitud de Marketing",
      html: emailContent,
    });

    if (error) {
      console.error("Error al enviar email:", error);
      return NextResponse.json(
        { error: "Error al enviar email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email enviado exitosamente",
      timestamp: new Date().toISOString(),
      data: data,
    });
  } catch (error) {
    console.error("Error en API marketing-email:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
