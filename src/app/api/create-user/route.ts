// src/app/api/create-user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullname, username, role } = body;

    console.log('📥 Payload recibido:', body);
/* 
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
 */
    // 1. Crear usuario en Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: crypto.randomUUID().slice(0, 12),
      email_confirm: false,
    });
    console.log("authError",authError)

    if (authError || !authUser?.user) {
      console.error('❌ Error creando usuario en Auth:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Error creando usuario en Auth' },
        { status: 400 }
      );
    }

    const userId = authUser.user.id;

    // 2. Insertar en tabla `user`
    const { error: insertError } = await supabase.from('usuario').insert({
      auth_id: userId,
      username,
      fullname,
      role,
    });

    if (insertError) {
      console.error('❌ Error insertando en tabla user:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      });

      return NextResponse.json(
        {
          error: 'Database error creating new user',
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
        },
        { status: 400 }
      );
    }

    // 3. Enviar invitación por email
    const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email);
    if (inviteError) {
      console.warn('⚠️ Usuario creado, pero error al enviar invitación:', inviteError.message);
    }

    return NextResponse.json({
      message: '✅ Usuario creado e invitado por email',
      userId,
    });
  } catch (e: any) {
    console.error('🔥 Error inesperado en /api/create-user:', e);
    return NextResponse.json(
      { error: 'Error inesperado', message: e.message || e.toString() },
      { status: 500 }
    );
  }
}
