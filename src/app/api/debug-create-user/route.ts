import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateTempPassword(): string {
  const adjectives = ['Rápido', 'Fuerte', 'Brillante', 'Nuevo', 'Seguro'];
  const nouns = ['León', 'Águila', 'Roca', 'Sol', 'Mar'];
  const numbers = Math.floor(Math.random() * 999) + 100;

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}${noun}${numbers}`;
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔧 === DEBUG CREATE USER API ===');

    const body = await req.json();
    const { email, fullname, username, role } = body;

    console.log('📥 Payload recibido:', body);

    // Validación mínima
    if (!email || !fullname || !username || !role) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: email, fullname, username o role' },
        { status: 400 }
      );
    }

    // Validación formato email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Formato de correo no válido' },
        { status: 400 }
      );
    }

    // 1. Generar contraseña temporal
    const tempPassword = generateTempPassword();
    console.log('🔐 Contraseña temporal generada:', tempPassword);

    // 2. Crear usuario en Auth con user_metadata
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        username,
        fullname,
        role,
        must_change_password: true
      }
    });

    if (authError || !authUser?.user) {
      console.error('❌ Error creando usuario en Auth:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Error creando usuario en Auth' },
        { status: 400 }
      );
    }

    console.log('✅ Usuario creado exitosamente (solo auth). El trigger se encargará de insertar en la tabla usuario.');

    return NextResponse.json({
      message: '✅ Usuario creado exitosamente (DEBUG MODE)',
      userId: authUser.user.id,
      tempPassword,
      userCreated: { email, username, fullname, role }
    });
  } catch (e: any) {
    console.error('🔥 Error inesperado en debug-create-user:', e);
    return NextResponse.json(
      { error: 'Error inesperado del servidor', message: e.message },
      { status: 500 }
    );
  }
}
