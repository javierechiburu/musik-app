import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase con service role key para operaciones admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PreRegistroData {
  username: string;
  fullname: string;
  email: string;
  role: string;
  must_change_password: boolean;
  verified: boolean;
}

export async function POST(req: NextRequest) {
  try {
    console.log(
      "🚀 === INICIO DE PRE-REGISTRO API ===",
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const { username, fullname, email } = body as PreRegistroData;

    console.log("📥 Payload recibido:", body);

    if (!email || !fullname || !username) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: email, fullname o username" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Formato de correo no válido" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim();

    // Verificar email existente en tabla usuario
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("usuario")
      .select("id, email")
      .eq("email", normalizedEmail)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      return NextResponse.json(
        { error: "Error verificando email existente" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email ya está registrado" },
        { status: 400 }
      );
    }

    // Verificar username existente (case-insensitive)
    const { data: existingUsername, error: usernameError } = await supabaseAdmin
      .from("usuario")
      .select("id")
      .ilike("username", normalizedUsername)
      .limit(1);

    if (usernameError) {
      return NextResponse.json(
        { error: "Error verificando nombre de usuario existente" },
        { status: 500 }
      );
    }

    if (existingUsername && existingUsername.length > 0) {
      return NextResponse.json(
        { error: "Este nombre artístico ya está registrado" },
        { status: 400 }
      );
    }

    // Generar UUID temporal único para auth_id
    const generateUUID = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };

    const tempAuthId = generateUUID();

    // Insertar solo en la tabla usuario (pre-registro)
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("usuario")
      .insert({
        auth_id: tempAuthId,
        username: normalizedUsername,
        fullname: fullname.trim(),
        email: normalizedEmail,
        role: "user",
        must_change_password: true,
        verified: false,
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
        chartmetric_id: null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Error insertando pre-registro:", insertError);

      // Manejar errores específicos
      if (insertError.code === "23505") {
        if (insertError.message.includes("username")) {
          return NextResponse.json(
            { error: `El nombre artístico "${username}" ya está registrado` },
            { status: 400 }
          );
        }
        if (insertError.message.includes("email")) {
          return NextResponse.json(
            { error: "Este email ya está registrado" },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        {
          error: "Error de base de datos al crear el pre-registro",
          message: insertError.message,
        },
        { status: 400 }
      );
    }

    console.log("✅ Pre-registro creado exitosamente:", newUser);

    return NextResponse.json({
      message: "✅ Pre-registro exitoso",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        fullname: newUser.fullname,
        role: newUser.role,
        verified: newUser.verified,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error inesperado del servidor",
        message: error.message || error.toString(),
      },
      { status: 500 }
    );
  }
}
