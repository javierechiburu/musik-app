import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Configurar Resend API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Tipos para los datos del formulario
interface MarketingFormData {
  tools: {
    googleAds: boolean;
    marquee: boolean;
    meta: boolean;
    tiktokAds: boolean;
    kali: boolean;
    mediosDigitales: boolean;
    mediosTradicionales: boolean;
  };
  segmentation: {
    countries: string[];
    genders: string[];
    ages: string[];
    genres: string[];
  };
  budget: string;
  campaign_objective: string;
  content_type: string;
  timeline: string;
  additional_notes: string;
}

// Template HTML del email
const createEmailTemplate = (data: MarketingFormData) => {
  const selectedTools = Object.entries(data.tools)
    .filter(([, selected]) => selected)
    .map(([tool]) => {
      const toolNames = {
        googleAds: "Google Ads",
        marquee: "Spotify Marquee",
        meta: "Meta Ads",
        tiktokAds: "TikTok Ads",
        kali: "Kali",
        mediosDigitales: "Medios Digitales",
        mediosTradicionales: "Medios Tradicionales",
      };
      return toolNames[tool as keyof typeof toolNames] || tool;
    });

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Solicitud de Campaña de Marketing</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .header p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
          background: #ffffff;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }
        .section h2 {
          margin: 0 0 15px 0;
          color: #2d3748;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-content {
          color: #4a5568;
          line-height: 1.6;
        }
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          margin-top: 10px;
        }
        .tool-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
        }
        .segmentation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }
        .segmentation-item h3 {
          color: #2d3748;
          font-size: 16px;
          margin: 0 0 10px 0;
          font-weight: 600;
        }
        .segmentation-list {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .segmentation-tag {
          display: inline-block;
          background: #edf2f7;
          color: #4a5568;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin: 2px;
        }
        .budget-highlight {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          padding: 15px 20px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          margin: 10px 0;
        }
        .notes-box {
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          padding: 15px;
          margin-top: 10px;
        }
        .footer {
          background: #2d3748;
          color: white;
          text-align: center;
          padding: 30px;
          font-size: 14px;
        }
        .footer a {
          color: #667eea;
          text-decoration: none;
        }
        .timestamp {
          background: #e2e8f0;
          padding: 10px 15px;
          border-radius: 8px;
          color: #4a5568;
          font-size: 14px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎵 Nueva Solicitud de Campaña</h1>
          <p>Solicitud de Marketing Musical</p>
        </div>
        
        <div class="content">
          <div class="timestamp">
            📅 Fecha de solicitud: ${new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <div class="section">
            <h2>🚀 Herramientas Seleccionadas</h2>
            <div class="section-content">
              <div class="tools-grid">
                ${selectedTools
                  .map((tool) => `<div class="tool-badge">${tool}</div>`)
                  .join("")}
              </div>
              ${
                selectedTools.length === 0
                  ? "<p>No se seleccionaron herramientas específicas</p>"
                  : ""
              }
            </div>
          </div>

          <div class="section">
            <h2>🎯 Segmentación de Audiencia</h2>
            <div class="section-content">
              <div class="segmentation-grid">
                <div class="segmentation-item">
                  <h3>🌍 Países</h3>
                  <div class="segmentation-list">
                    ${
                      data.segmentation.countries.length > 0
                        ? data.segmentation.countries
                            .map(
                              (country) =>
                                `<span class="segmentation-tag">${country}</span>`
                            )
                            .join("")
                        : '<span class="segmentation-tag">Sin especificar</span>'
                    }
                  </div>
                </div>
                
                <div class="segmentation-item">
                  <h3>🎵 Géneros</h3>
                  <div class="segmentation-list">
                    ${
                      data.segmentation.genres.length > 0
                        ? data.segmentation.genres
                            .map(
                              (genre) =>
                                `<span class="segmentation-tag">${genre}</span>`
                            )
                            .join("")
                        : '<span class="segmentation-tag">Sin especificar</span>'
                    }
                  </div>
                </div>
                
                <div class="segmentation-item">
                  <h3>👥 Edad</h3>
                  <div class="segmentation-list">
                    ${
                      data.segmentation.ages.length > 0
                        ? data.segmentation.ages
                            .map(
                              (age) =>
                                `<span class="segmentation-tag">${age}</span>`
                            )
                            .join("")
                        : '<span class="segmentation-tag">Sin especificar</span>'
                    }
                  </div>
                </div>
                
                <div class="segmentation-item">
                  <h3>⚧️ Género</h3>
                  <div class="segmentation-list">
                    ${
                      data.segmentation.genders.length > 0
                        ? data.segmentation.genders
                            .map(
                              (gender) =>
                                `<span class="segmentation-tag">${gender}</span>`
                            )
                            .join("")
                        : '<span class="segmentation-tag">Sin especificar</span>'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>💰 Presupuesto</h2>
            <div class="section-content">
              <div class="budget-highlight">
                ${data.budget || "No especificado"}
              </div>
            </div>
          </div>

          ${
            data.additional_notes
              ? `
          <div class="section">
            <h2>📝 Notas Adicionales</h2>
            <div class="section-content">
              <div class="notes-box">
                ${data.additional_notes.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          `
              : ""
          }
        </div>
        
        <div class="footer">
          <p>Esta solicitud fue generada automáticamente desde el panel de marketing.</p>
          <p>Para responder o hacer seguimiento, contacta al equipo de marketing.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    console.log("acaaa");
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API key no configurada" },
        { status: 500 }
      );
    }

    // Verificar que el email de destino esté configurado
    if (!process.env.MARKETING_EMAIL_TO) {
      return NextResponse.json(
        { error: "Email de destino no configurado" },
        { status: 500 }
      );
    }

    // Parsear los datos del formulario
    const formData: MarketingFormData = await request.json();
    console.log("acaaa");

    // Validar datos mínimos
    if (!formData.tools && !formData.segmentation) {
      return NextResponse.json(
        { error: "Datos del formulario incompletos" },
        { status: 400 }
      );
    }

    // Crear el contenido del email
    const htmlContent = createEmailTemplate(formData);

    // Crear texto plano alternativo
    const selectedTools = Object.entries(formData.tools)
      .filter(([, selected]) => selected)
      .map(([tool]) => tool)
      .join(", ");

    const textContent = `
Nueva Solicitud de Campaña de Marketing

Fecha: ${new Date().toLocaleDateString("es-ES")}

Herramientas seleccionadas: ${selectedTools || "Ninguna"}

Segmentación:
- Países: ${formData.segmentation.countries.join(", ") || "Sin especificar"}
- Géneros: ${formData.segmentation.genres.join(", ") || "Sin especificar"}
- Edad: ${formData.segmentation.ages.join(", ") || "Sin especificar"}
- Género: ${formData.segmentation.genders.join(", ") || "Sin especificar"}

Presupuesto: ${formData.budget || "No especificado"}

Notas adicionales: ${formData.additional_notes || "Ninguna"}
    `;

    // Enviar el email con Resend
    // Para desarrollo usar: 'Musik App <onboarding@resend.dev>'
    // Para producción usar: process.env.RESEND_FROM_EMAIL
    const fromEmail =
      process.env.NODE_ENV === "production"
        ? process.env.RESEND_FROM_EMAIL || "noreply@musikapp.com"
        : "Musik App <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [process.env.MARKETING_EMAIL_TO],
      subject: `🎵 Nueva Solicitud de Campaña - ${new Date().toLocaleDateString(
        "es-ES"
      )}`,
      text: textContent,
      html: htmlContent,
      // Agregar tags para tracking (equivalente a categories en SendGrid)
      tags: [
        {
          name: "category",
          value: "marketing-request",
        },
        {
          name: "source",
          value: "marketing-form",
        },
        {
          name: "tools_count",
          value: Object.values(formData.tools)
            .filter(Boolean)
            .length.toString(),
        },
        {
          name: "countries_count",
          value: formData.segmentation.countries.length.toString(),
        },
      ],
    });

    if (error) {
      console.error("Error de Resend:", error);
      return NextResponse.json(
        {
          error: "Error al enviar email",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email enviado exitosamente",
        timestamp: new Date().toISOString(),
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando email:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
