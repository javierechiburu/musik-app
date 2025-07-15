import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { newPassword, currentPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'La nueva contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    if (currentPassword && currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'La nueva contraseña debe ser diferente a la actual' },
        { status: 400 }
      );
    }

    // Intentar obtener usuario desde cookies primero
    const supabaseClient = createRouteHandlerClient({ cookies });
    let { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    // Si no funciona con cookies, intentar con Authorization header
    if (userError || !user) {
      const authHeader = req.headers.get('authorization');
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        
        // Verificar el token usando el cliente admin
        const { data: { user: tokenUser }, error: tokenError } = await supabase.auth.getUser(token);
        
        if (!tokenError && tokenUser) {
          user = tokenUser;
          userError = null;
        }
      }
    }
    
    if (userError || !user) {
      console.error('Error de autenticación:', userError);
      return NextResponse.json(
        { error: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    // Si se proporciona currentPassword, verificarla (cambio desde perfil)
    if (currentPassword) {
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user.email!,
          password: currentPassword,
        });

        if (signInError) {
          return NextResponse.json(
            { error: 'La contraseña actual es incorrecta' },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error('Error verificando contraseña actual:', error);
        return NextResponse.json(
          { error: 'Error verificando la contraseña actual' },
          { status: 500 }
        );
      }
    }

    // Actualizar la contraseña usando el service role client
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Error actualizando contraseña:', updateError);
      return NextResponse.json(
        { error: 'Error al actualizar la contraseña' },
        { status: 500 }
      );
    }

    // Actualizar el flag must_change_password solo si es cambio desde login (sin currentPassword)
    if (!currentPassword) {
      const { error: flagError } = await supabase
        .from('usuario')
        .update({ must_change_password: false })
        .eq('auth_id', user.id);

      if (flagError) {
        console.error('Error actualizando flag de contraseña:', flagError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada exitosamente',
    });

  } catch (error: any) {
    console.error('Error en change-password:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}