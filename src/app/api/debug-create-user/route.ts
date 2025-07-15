// Ruta temporal para debuggear la creación de usuarios
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

    // Validación mínima del payload
    if (!email || !fullname || !username || !role) {
      console.warn('❗ Campos requeridos faltantes');
      return NextResponse.json(
        { error: 'Faltan campos requeridos: email, fullname, username o role' },
        { status: 400 }
      );
    }

    // Validación simple de formato de correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Formato de correo no válido' },
        { status: 400 }
      );
    }

    // 1. Generar contraseña temporal
    const tempPassword = generateTempPassword();
    console.log('🔐 Contraseña temporal generada:', tempPassword);

    // 2. Crear usuario en Auth usando el cliente admin
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
    });
    console.log("authError", authError);

    if (authError || !authUser?.user) {
      console.error('❌ Error creando usuario en Auth:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Error creando usuario en Auth' },
        { status: 400 }
      );
    }

    const userId = authUser.user.id;

    // 3. Insertar en tabla usuario
    const { error: insertError } = await supabaseAdmin.from('usuario').insert({
      auth_id: userId,
      username,
      fullname,
      role,
      must_change_password: true,
    });

    if (insertError) {
      console.error('❌ Error insertando en tabla usuario:', insertError);
      return NextResponse.json(
        {
          error: 'Error de base de datos al crear el usuario',
          message: insertError.message,
        },
        { status: 400 }
      );
    }

    console.log('✅ Usuario creado exitosamente');

    return NextResponse.json({
      message: '✅ Usuario creado exitosamente (DEBUG MODE)',
      userId,
      tempPassword, // Solo para debug
      userCreated: {
        email,
        username,
        fullname,
        role
      }
    });
  } catch (e: any) {
    console.error('🔥 Error inesperado en debug-create-user:', e);
    return NextResponse.json(
      { error: 'Error inesperado del servidor', message: e.message },
      { status: 500 }
    );
  }
}