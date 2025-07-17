import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Cliente de Supabase con service role key para operaciones admin
const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Función auxiliar para verificar si el usuario es admin
async function verifyAdminAccess(supabase: any) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("UUUUUUUUUUUUUUUUUUUUUUUUU", user);

  if (userError || !user) {
    return { isAdmin: false, error: "No autorizado" };
  }

  // Verificar si el usuario tiene rol de admin
  const { data: profile, error: profileError } = await supabase
    .from("usuario")
    .select("role")
    .eq("auth_id", user.id)
    .single();

  console.log("profile", profile);

  if (profileError || profile?.role !== "admin") {
    return {
      isAdmin: false,
      error: "Acceso denegado - Solo administradoreees",
    };
  }

  return { isAdmin: true, user };
}

// GET - Obtener usuarios nuevos/no verificados
export async function GET(req: NextRequest) {
  try {
    console.log("🔍 === OBTENER NUEVOS USUARIOS API ===");

    const supabase = await createClient();

    // Verificar que el usuario sea admin
    const { user, isAdmin } = await verifyAdminAccess(supabase);

    if (!user || !isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }

    // Obtener todos los usuarios ordenados por fecha de creación
    // Incluimos usuarios con auth_id temporal (pre-registros) y usuarios verificados
    const { data: usuarios, error } = await supabase
      .from("usuario")
      .select(
        "id, username, fullname, email, created_at, verified, role, auth_id"
      )
      .or("verified.is.null,verified.eq.false")
      .order("created_at", { ascending: false });

    console.log("usuarios", usuarios);
    if (error) {
      console.error("Error obteniendo usuarios:", error);
      return NextResponse.json(
        { error: "Error al obtener usuarios" },
        { status: 500 }
      );
    }

    return NextResponse.json({ usuarios });
  } catch (error: any) {
    console.error("Error inesperado en GET /api/admin/nuevos-usuarios:", error);
    return NextResponse.json(
      { error: "Error inesperado del servidor" },
      { status: 500 }
    );
  }
}

// // POST - Verificar usuario
// export async function POST(req: NextRequest) {
//   try {
//     console.log("✅ === VERIFICAR USUARIO API ===");
//     const supabase = await createClient(); // Cliente de usuario para RLS

//     // 1. Verificar que el usuario que hace la petición sea admin
//     const { user: requestingUser, isAdmin } = await verifyAdminAccess(supabase);

//     if (!requestingUser || !isAdmin) {
//       return NextResponse.json(
//         { error: "Acceso denegado - Se requiere rol de administrador" },
//         { status: 403 }
//       );
//     }

//     const body = await req.json();
//     const { usuarioId } = body;

//     if (!usuarioId) {
//       return NextResponse.json(
//         { error: "ID de usuario es requerido" },
//         { status: 400 }
//       );
//     }

//     // 2. Obtener el usuario de la tabla 'usuario'
//     const { data: existingUserInDb, error: userDbError } = await supabase
//       .from("usuario")
//       .select("id, username, fullname, email, verified, auth_id")
//       .eq("id", usuarioId)
//       .single();

//     if (userDbError || !existingUserInDb) {
//       console.error("❌ Error obteniendo usuario de la DB:", userDbError);
//       return NextResponse.json(
//         { error: "Usuario no encontrado en la base de datos" },
//         { status: 404 }
//       );
//     }

//     if (existingUserInDb.verified) {
//       return NextResponse.json(
//         { error: "Este usuario ya está verificado" },
//         { status: 400 }
//       );
//     }

//     // 3. Guardar datos del usuario antes de eliminarlo
//     const userData = {
//       username: existingUserInDb.username,
//       fullname: existingUserInDb.fullname,
//       email: existingUserInDb.email,
//       auth: existingUserInDb.auth_id,
//       role: "user", // o existingUserInDb.role si quieres mantener el rol original
//     };

//     console.log("💾 Datos del usuario guardados:", userData);

//     // 4. Eliminar el registro de la tabla usuario
//     const { error: deleteError } = await supabaseAdmin
//       .from("usuario")
//       .delete()
//       .eq("id", usuarioId);

//     console.log("usuarioIdusuarioIdusuarioId0", usuarioId);

//     if (deleteError) {
//       console.error("❌ Error eliminando usuario de la tabla:", deleteError);
//       return NextResponse.json(
//         { error: "Error eliminando registro de usuario" },
//         { status: 500 }
//       );
//     }

//     console.log("🗑️ Usuario eliminado de la tabla usuario");

//     // 5. Generar contraseña temporal
//     function generateTempPassword(): string {
//       const adjectives = ["Rápido", "Fuerte", "Brillante", "Nuevo", "Seguro"];
//       const nouns = ["León", "Águila", "Roca", "Sol", "Mar"];
//       const numbers = Math.floor(Math.random() * 999) + 100;

//       const adjective =
//         adjectives[Math.floor(Math.random() * adjectives.length)];
//       const noun = nouns[Math.floor(Math.random() * nouns.length)];

//       return `${adjective}${noun}${numbers}`;
//     }

//     const tempPassword = generateTempPassword();
//     console.log("🔐 Contraseña temporal generada:", tempPassword);

//     // 6. Crear usuario en Supabase Auth
//     console.log(`🔐 Creando usuario Auth para email: ${userData.email}`);
//     const { data: newAuthUserData, error: createError } =
//       await supabaseAdmin.auth.admin.createUser({
//         email: userData.email,
//         password: tempPassword,
//         email_confirm: true,
//         user_metadata: {
//           username: userData.username,
//           fullname: userData.fullname,
//           role: userData.role,
//           must_change_password: true,
//           verified: true,
//         },
//       });

//     if (createError || !newAuthUserData?.user) {
//       console.error("❌ Error creando usuario en Auth:", createError);

//       // 7. Recrear registro en la tabla usuario con el auth_id real
//       const { data: newUserRecord, error: insertError } = await supabaseAdmin
//         .from("usuario")
//         .insert({
//           auth_id: userData.auth,
//           username: userData.username,
//           fullname: userData.fullname,
//           email: userData.email,
//           role: userData.role,
//           verified: true,
//           must_change_password: true,
//           created_at: new Date().toISOString(),
//           update_at: new Date().toISOString(),
//           chartmetric_id: null,
//         })
//         .select()
//         .single();

//       if (insertError) {
//         console.error("❌ Error recreando usuario en tabla:", insertError);

//         return NextResponse.json(
//           { error: "Error recreando registro de usuario" },
//           { status: 500 }
//         );
//       }

//       console.log(
//         "✅ Usuario recreado en tabla con auth_id real:",
//         newUserRecord.id
//       );

//       return NextResponse.json(
//         { error: createError?.message || "Error al crear usuario en Auth" },
//         { status: 500 }
//       );
//     }

//     const authUser = newAuthUserData.user;
//     console.log("✅ Usuario creado en Auth:", authUser.id);

//     // 7. Buscar el usuario recién creado por createUser
//     const { data: createdUserRecord, error: findError } = await supabaseAdmin
//       .from("usuario")
//       .select("*")
//       .eq("auth_id", authUser.id)
//       .single();

//     if (findError || !createdUserRecord) {
//       console.error("❌ Error encontrando usuario creado:", findError);
//       return NextResponse.json(
//         { error: "Error encontrando usuario recién creado" },
//         { status: 500 }
//       );
//     }

//     console.log("✅ Usuario encontrado en tabla:", createdUserRecord.id);

//     // 8. Crear registro en tabla cuentas_bancarias con el nuevo ID
//     const { error: bankInsertError } = await supabaseAdmin
//       .from("cuentas_bancarias")
//       .insert({ usuario_id: createdUserRecord.id });

//     if (bankInsertError) {
//       console.error("❌ Error creando cuenta bancaria:", bankInsertError);
//       console.warn("⚠️ Usuario verificado pero sin cuenta bancaria creada");
//     } else {
//       console.log("✅ Cuenta bancaria creada para nuevo registro.");
//     }

//     // 7. Enviar email de verificación usando Resend
//     try {
//       const emailContent = `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
//             ¡Cuenta Verificada y Activada!
//           </h2>
//           <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
          
//           <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
//             <h3 style="color: #155724; margin-top: 0;">🎉 ¡Bienvenido a Musik App!</h3>
//             <p style="color: #155724;">
//               Tu cuenta ha sido verificada y activada exitosamente por el administrador. 
//               Ya puedes iniciar sesión en la plataforma.
//             </p>
//           </div>
          
//           <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #495057; margin-top: 0;">Información de tu Cuenta:</h3>
//             <p><strong>Nombre:</strong> ${userData.fullname}</p>
//             <p><strong>Nombre Artístico:</strong> ${userData.username}</p>
//             <p><strong>Email:</strong> ${userData.email}</p>
//           </div>
          
//           <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
//             <h3 style="color: #856404; margin-top: 0;">Credenciales de Acceso:</h3>
//             <p><strong>Usuario:</strong> ${userData.email}</p>
//             <p><strong>Contraseña:</strong> <code style="background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${tempPassword}</code></p>
//             <p style="font-size: 12px; color: #6c757d;">
//               <em>⚠️ Por seguridad, debes cambiar esta contraseña en tu primer inicio de sesión.</em>
//             </p>
//           </div>
          
//           <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #0c5460; margin-top: 0;">Próximos Pasos:</h3>
//             <ol style="color: #0c5460; padding-left: 20px;">
//               <li>Inicia sesión en la plataforma con las credenciales proporcionadas</li>
//               <li>Cambia tu contraseña temporal por una nueva y segura</li>
//               <li>Completa tu perfil y configura tu cuenta bancaria</li>
//               <li>¡Comienza a gestionar tu música!</li>
//             </ol>
//           </div>
          
//           <div style="text-align: center; margin: 30px 0;">
//             <a href="${
//               process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
//             }/login" 
//               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
//               Iniciar Sesión Ahora
//             </a>
//           </div>
          
//           <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
//           <p style="font-size: 14px; color: #6c757d; text-align: center;">
//             <em>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al equipo de soporte.</em>
//           </p>
//         </div>
//       `;

//       const { data, error } = await resend.emails.send({
//         from: "onboarding@resend.dev",
//         to: ["javierechiburu.g@gmail.com"], // Envía al email del usuario, no solo a ti
//         subject: "🎉 ¡Tu cuenta en Musik App ha sido activada!",
//         html: emailContent,
//       });

//       if (error) {
//         console.warn(
//           "⚠️ Usuario verificado, pero error al enviar email:",
//           error
//         );
//       } else {
//         console.log("📧 Email de verificación enviado exitosamente:", data);
//       }
//     } catch (emailError) {
//       console.warn(
//         "⚠️ Error al enviar email de verificación (catch):",
//         emailError
//       );
//     }

//     return NextResponse.json({
//       message: "Usuario verificado exitosamente",
//       user: {
//         id: createdUserRecord.id,
//         username: userData.username,
//         fullname: userData.fullname,
//         email: userData.email,
//         verified: createdUserRecord.verified,
//         authId: authUser.id,
//       },
//     });
//   } catch (error: any) {
//     console.error(
//       "Error inesperado en POST /api/admin/nuevos-usuarios:",
//       error
//     );
//     return NextResponse.json(
//       {
//         error: "Error inesperado del servidor",
//         message: error.message || error.toString(),
//       },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    console.log("✅ === VERIFICAR USUARIO API ===");
    const supabase = await createClient(); // Cliente de usuario para RLS

    // 1. Verificar que el usuario que hace la petición sea admin
    const { user: requestingUser, isAdmin } = await verifyAdminAccess(supabase);

    if (!requestingUser || !isAdmin) {
      return NextResponse.json(
        { error: "Acceso denegado - Se requiere rol de administrador" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { usuarioId } = body;

    if (!usuarioId) {
      return NextResponse.json(
        { error: "ID de usuario es requerido" },
        { status: 400 }
      );
    }

    // 2. Obtener el usuario de la tabla 'usuario'
    const { data: existingUser, error: userDbError } = await supabaseAdmin
      .from("usuario")
      .select("id, username, fullname, email, verified, auth_id")
      .eq("id", usuarioId)
      .single();

    if (userDbError || !existingUser) {
      console.error("❌ Error obteniendo usuario de la DB:", userDbError);
      return NextResponse.json(
        { error: "Usuario no encontrado en la base de datos" },
        { status: 404 }
      );
    }

    if (existingUser.verified) {
      return NextResponse.json(
        { error: "Este usuario ya está verificado" },
        { status: 400 }
      );
    }

    // 3. Generar contraseña temporal
    function generateTempPassword(): string {
      const adjectives = ["Rápido", "Fuerte", "Brillante", "Nuevo", "Seguro"];
      const nouns = ["León", "Águila", "Roca", "Sol", "Mar"];
      const numbers = Math.floor(Math.random() * 999) + 100;

      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];

      return `${adjective}${noun}${numbers}`;
    }

    const tempPassword = generateTempPassword();
    console.log("🔐 Contraseña temporal generada:", tempPassword);

    // 4. Crear usuario en Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: existingUser.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        username: existingUser.username,
        fullname: existingUser.fullname,
        role: "user",
        must_change_password: true,
        verified: true
      }
    });

    if (authError || !authUser?.user) {
      console.error("❌ Error creando usuario en Auth:", authError);
      return NextResponse.json(
        { error: authError?.message || "Error creando usuario en Auth" },
        { status: 500 }
      );
    }

    console.log("✅ Usuario creado en Auth:", authUser.user.id);

    // 5. Actualizar el usuario en la tabla: verified = true, must_change_password = true, auth_id actualizado
    const { error: updateError } = await supabaseAdmin
      .from("usuario")
      .update({
        verified: true,
        must_change_password: true,
        auth_id: authUser.user.id,
        update_at: new Date().toISOString(),
      })
      .eq("id", usuarioId);

    if (updateError) {
      console.error("❌ Error actualizando usuario:", updateError);
      return NextResponse.json(
        { error: "No se pudo actualizar el estado del usuario" },
        { status: 500 }
      );
    }

    console.log("✅ Usuario actualizado correctamente con auth_id:", authUser.user.id);

    // 6. Enviar correo de confirmación con contraseña temporal
    try {
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            ¡Cuenta Verificada y Activada!
          </h2>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
          
          <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #155724; margin-top: 0;">🎉 ¡Bienvenido a Musik App!</h3>
            <p style="color: #155724;">
              Tu cuenta ha sido verificada y activada exitosamente por el administrador. 
              Ya puedes iniciar sesión en la plataforma.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Información de tu Cuenta:</h3>
            <p><strong>Nombre:</strong> ${existingUser.fullname}</p>
            <p><strong>Nombre Artístico:</strong> ${existingUser.username}</p>
            <p><strong>Email:</strong> ${existingUser.email}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">Credenciales de Acceso:</h3>
            <p><strong>Usuario:</strong> ${existingUser.email}</p>
            <p><strong>Contraseña:</strong> <code style="background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${tempPassword}</code></p>
            <p style="font-size: 12px; color: #6c757d;">
              <em>⚠️ Por seguridad, debes cambiar esta contraseña en tu primer inicio de sesión.</em>
            </p>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Próximos Pasos:</h3>
            <ol style="color: #0c5460; padding-left: 20px;">
              <li>Inicia sesión en la plataforma con las credenciales proporcionadas</li>
              <li>Cambia tu contraseña temporal por una nueva y segura</li>
              <li>Completa tu perfil y configura tu cuenta bancaria</li>
              <li>¡Comienza a gestionar tu música!</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
            }/login" 
              style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Iniciar Sesión Ahora
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
          <p style="font-size: 14px; color: #6c757d; text-align: center;">
            <em>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al equipo de soporte.</em>
          </p>
        </div>
      `;

      const { error: emailError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [existingUser.email],
        subject: "🎉 ¡Tu cuenta en Musik App ha sido verificada!",
        html: emailContent,
      });

      if (emailError) {
        console.warn("⚠️ Usuario verificado, pero error al enviar email:", emailError);
      } else {
        console.log("📧 Email de confirmación enviado a:", existingUser.email);
      }
    } catch (err) {
      console.warn("⚠️ Error al enviar email:", err);
    }

    return NextResponse.json({
      message: "Usuario verificado exitosamente",
      user: {
        id: existingUser.id,
        username: existingUser.username,
        fullname: existingUser.fullname,
        email: existingUser.email,
        verified: true,
        authId: authUser.user.id,
      },
      tempPassword: tempPassword,
    });
  } catch (error: any) {
    console.error("Error inesperado en POST /api/admin/nuevos-usuarios:", error);
    return NextResponse.json(
      {
        error: "Error inesperado del servidor",
        message: error.message || error.toString(),
      },
      { status: 500 }
    );
  }
}
