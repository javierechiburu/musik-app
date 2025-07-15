// src/app/api/create-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con service role key para operaciones admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Función para generar contraseña temporal legible
function generateTempPassword(): string {
  const adjectives = ['Rápido', 'Fuerte', 'Brillante', 'Nuevo', 'Seguro'];
  const nouns = ['León', 'Águila', 'Roca', 'Sol', 'Mar'];
  const numbers = Math.floor(Math.random() * 999) + 100;
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}${noun}${numbers}`;
}

// Función auxiliar para verificar si el usuario es admin (simplificada)
async function verifyAdminRole(req: NextRequest): Promise<{ user: any; isAdmin: boolean }> {
  try {
    // Obtener el token de autorización del header
    const authorization = req.headers.get('authorization');
    console.log('🔍 Authorization header:', authorization ? 'Presente' : 'Ausente');
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      console.log('❌ No authorization header found or invalid format');
      return { user: null, isAdmin: false };
    }

    const token = authorization.replace('Bearer ', '');
    console.log('🔑 Token extraído:', token ? 'Presente' : 'Ausente');
    
    // Verificar el token con Supabase usando el cliente admin
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      console.log('❌ Error getting user:', error?.message || 'No user found');
      return { user: null, isAdmin: false };
    }
    
    console.log('✅ Usuario verificado:', user.email);
    
    // Verificar el rol del usuario en la base de datos
    const { data: userData, error: roleError } = await supabaseAdmin
      .from("usuario")
      .select("role")
      .eq("auth_id", user.id)
      .single();
    
    if (roleError || !userData) {
      console.log('❌ Error getting user role:', roleError?.message || 'No user data found');
      return { user, isAdmin: false };
    }
    
    console.log('👤 Rol del usuario:', userData.role);
    return { user, isAdmin: userData.role === "admin" };
  } catch (error) {
    console.error("❌ Error verifying admin role:", error);
    return { user: null, isAdmin: false };
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 === INICIO DE CREATE USER API ===');
    console.log('📝 Headers recibidos:', Object.fromEntries(req.headers.entries()));
    
    // Verificar que el usuario sea admin
    const { user, isAdmin } = await verifyAdminRole(req);
    
    console.log('🔐 Resultado de verificación:', { 
      userExists: !!user, 
      userEmail: user?.email || 'N/A',
      isAdmin 
    });
    
    if (!user) {
      console.log('❌ FALLO: Usuario no encontrado o token inválido');
      return NextResponse.json(
        { error: "No autorizado - Token inválido" },
        { status: 401 }
      );
    }
    
    if (!isAdmin) {
      console.log('❌ FALLO: Usuario no es admin');
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }
    
    console.log('✅ Verificación exitosa, continuando con creación de usuario...');

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
      email_confirm: true, // Confirmamos el email automáticamente
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

    // 3. Verificar si ya existe un usuario con este auth_id
    const { data: existingUser } = await supabaseAdmin
      .from('usuario')
      .select('id')
      .eq('auth_id', userId);

    if (existingUser && existingUser.length > 0) {
      console.warn('⚠️ Usuario ya existe en la tabla usuario, actualizando...');
      
      // Actualizar el usuario existente en lugar de crear uno nuevo
      const { error: updateError } = await supabaseAdmin
        .from('usuario')
        .update({
          username,
          fullname,
          role,
          must_change_password: true,
        })
        .eq('auth_id', userId);

      if (updateError) {
        console.error('❌ Error actualizando usuario existente:', updateError);
        return NextResponse.json(
          {
            error: 'Error actualizando usuario existente',
            message: updateError.message,
          },
          { status: 400 }
        );
      }
    } else {
      // 4. Insertar nuevo usuario en tabla `usuario`
      const { error: insertError } = await supabaseAdmin.from('usuario').insert({
        auth_id: userId,
        username,
        fullname,
        role,
        must_change_password: true, // Flag para forzar cambio de contraseña
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
    }

    // 4. Enviar email de bienvenida con credenciales
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const emailResponse = await fetch(`${siteUrl}/api/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullname,
          tempPassword,
          username,
        }),
      });

      if (!emailResponse.ok) {
        console.warn('⚠️ Usuario creado, pero error al enviar email de bienvenida');
      } else {
        console.log('📧 Email de bienvenida enviado exitosamente');
      }
    } catch (emailError) {
      console.warn('⚠️ Error al enviar email de bienvenida:', emailError);
    }

    return NextResponse.json({
      message: '✅ Usuario creado exitosamente',
      userId,
      tempPasswordSent: true,
      userCreated: {
        email,
        username,
        fullname,
        role
      }
    });
  } catch (e: any) {
    console.error('🔥 Error inesperado en /api/create-user:', e);
    return NextResponse.json(
      { error: 'Error inesperado del servidor', message: e.message || e.toString() },
      { status: 500 }
    );
  }
}