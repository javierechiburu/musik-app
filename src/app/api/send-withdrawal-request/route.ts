import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { artistName, amount, method, accountInfo, description } = await request.json();

    // Contenido del email
    const emailContent = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; text-align: center;">
          <h1>💰 Nueva Solicitud de Retiro</h1>
          <p>Se ha recibido una nueva solicitud de retiro de fondos</p>
        </div>
        
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Detalles del Artista</h2>
          <p><strong>Artista:</strong> ${artistName}</p>
          <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString('es-CL')}</p>
        </div>
        
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Detalles del Retiro</h2>
          <p><strong>Monto solicitado:</strong> $${amount.toLocaleString()} USD</p>
          <p><strong>Método de pago:</strong> ${method}</p>
          <p><strong>Información de cuenta:</strong></p>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${accountInfo}
          </div>
          ${description ? `
          <p><strong>Descripción adicional:</strong></p>
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${description}
          </div>
          ` : ''}
        </div>
        
        <div style="padding: 20px; background-color: #fff3cd; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="color: #856404; margin-top: 0;">⚠️ Próximos pasos</h3>
          <ul style="color: #856404;">
            <li>Verificar la información de la cuenta del artista</li>
            <li>Confirmar el saldo disponible</li>
            <li>Procesar el pago según el método seleccionado</li>
            <li>Notificar al artista sobre el estado de la solicitud</li>
          </ul>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
          <p>Este email fue generado automáticamente desde el sistema de gestión de artistas.</p>
          <p>Fecha y hora: ${new Date().toLocaleString('es-CL')}</p>
        </div>
      </body>
    </html>
    `;

    // Enviar el email usando Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'admin@musikapp.com',
      to: process.env.ADMIN_EMAIL || 'admin@musikapp.com',
      subject: `💰 Nueva Solicitud de Retiro - ${artistName} - $${amount}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error enviando email con Resend:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error al enviar el email de solicitud' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Solicitud de retiro enviada exitosamente',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error procesando solicitud de retiro:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al procesar la solicitud de retiro' 
      },
      { status: 500 }
    );
  }
}