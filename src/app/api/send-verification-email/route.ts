import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, code, amount } = await request.json();

    // Validar datos requeridos
    if (!email || !code || !amount) {
      return NextResponse.json(
        { error: "Email, código y monto son requeridos" },
        { status: 400 }
      );
    }

    // Simular envío de email (en producción usar Resend, SendGrid, etc.)
    console.log(`Enviando código de verificación a ${email}:`);
    console.log(`Código: ${code}`);
    console.log(`Monto del retiro: $${amount}`);

    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    // En un entorno real, aquí enviarías el email:
    /*
    const emailContent = `
      <h2>Código de verificación para retiro</h2>
      <p>Has solicitado un retiro de $${amount}.</p>
      <p>Tu código de verificación es: <strong>${code}</strong></p>
      <p>Este código expira en 10 minutos.</p>
    `;
    
    await sendEmail({
      to: email,
      subject: "Código de verificación para retiro - FADER Records",
      html: emailContent
    });
    */

    return NextResponse.json({
      success: true,
      message: "Código de verificación enviado exitosamente",
      // Solo para desarrollo - no incluir en producción
      devCode: code
    });

  } catch (error) {
    console.error("Error al enviar código de verificación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}