import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    console.log('🧪 === TEST EMAIL API ===');
    
    // Verificar configuración de Resend
    console.log('🔑 RESEND_API_KEY presente:', !!process.env.RESEND_API_KEY);
    console.log('📧 RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
    
    const body = await req.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log('📤 Enviando email de prueba...');
    console.log('📨 Desde:', fromEmail);
    console.log('📨 Para:', email);
    
    const { data, error } = await resend.emails.send({
      from: `FADER Records Test <${fromEmail}>`,
      to: [email],
      subject: 'Email de Prueba - FADER Records',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">
            🧪 Email de Prueba
          </h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Este es un email de prueba para verificar que Resend está funcionando correctamente.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #333; margin-top: 0;">Detalles de configuración:</h3>
            <p style="margin: 10px 0;"><strong>Enviado desde:</strong> ${fromEmail}</p>
            <p style="margin: 10px 0;"><strong>Enviado a:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Si recibes este email, la configuración de Resend está funcionando correctamente.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email de prueba:', error);
      console.error('❌ Detalles del error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: 'Error al enviar el email de prueba', 
          details: error,
          resendConfig: {
            hasApiKey: !!process.env.RESEND_API_KEY,
            fromEmail: fromEmail
          }
        },
        { status: 500 }
      );
    }

    console.log('✅ Email de prueba enviado exitosamente');
    console.log('📬 ID del mensaje:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email de prueba enviado exitosamente',
      messageId: data?.id,
      from: fromEmail,
      to: email
    });

  } catch (error: any) {
    console.error('❌ Error en test-email:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error.message,
        resendConfig: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          fromEmail: process.env.RESEND_FROM_EMAIL
        }
      },
      { status: 500 }
    );
  }
}