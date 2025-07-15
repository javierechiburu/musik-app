import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailData {
  email: string;
  fullname: string;
  tempPassword: string;
  username: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log('📧 === INICIO SEND WELCOME EMAIL ===');
    const { email, fullname, tempPassword, username }: WelcomeEmailData = await req.json();

    console.log('📝 Datos recibidos:', { email, fullname, username, hasPassword: !!tempPassword });

    if (!email || !fullname || !tempPassword || !username) {
      console.error('❌ Faltan campos requeridos');
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Usar el email configurado en las variables de entorno
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    console.log('📤 Enviando desde:', fromEmail);
    console.log('📨 Enviando a:', email);

    const { data, error } = await resend.emails.send({
      from: `FADER Records <${fromEmail}>`,
      to: [email],
      subject: 'Bienvenido a FADER Records - Credenciales de acceso',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="/FADER_LOGO.svg" alt="FADER Records" style="width: 150px; height: auto;" />
          </div>
          
          <h1 style="color: #333; text-align: center; margin-bottom: 30px;">
            ¡Bienvenido a FADER Records!
          </h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Hola <strong>${fullname}</strong>,
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Tu cuenta ha sido creada exitosamente en la plataforma FADER Records. 
            A continuación encontrarás tus credenciales de acceso:
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #333; margin-top: 0;">Credenciales de acceso:</h3>
            <p style="margin: 10px 0;"><strong>Usuario:</strong> ${username}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Contraseña temporal:</strong> <code style="background: #e9ecef; padding: 4px 8px; border-radius: 4px; font-family: 'Courier New', monospace;">${tempPassword}</code></p>
          </div>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-weight: bold;">⚠️ Importante:</p>
            <p style="margin: 10px 0 0 0; color: #856404;">
              Esta es una contraseña temporal. Al iniciar sesión por primera vez, 
              se te solicitará cambiarla por una nueva contraseña de tu elección.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Iniciar sesión
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2024 FADER Records. Todos los derechos reservados.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email de bienvenida:', error);
      console.error('❌ Detalles del error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Error al enviar el email de bienvenida', details: error },
        { status: 500 }
      );
    }

    console.log('✅ Email enviado exitosamente');
    console.log('📬 ID del mensaje:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email de bienvenida enviado exitosamente',
      messageId: data?.id,
    });

  } catch (error: any) {
    console.error('Error en send-welcome-email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}