import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Buffer } from "buffer";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Obtener usuario autenticado desde la sesión
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const titular = formData.get("titular") as string;
    const rut = formData.get("rut") as string;
    const banco = formData.get("banco") as string;
    const tipo_cuenta = formData.get("tipo_cuenta") as string;
    const numero_cuenta = formData.get("numero_cuenta") as string;
    const cedulaFile = formData.get("cedula_file") as File | null;
    const selfieFile = formData.get("selfie_file") as File | null;

    // Validar campos requeridos
    if (!titular || !rut || !banco || !tipo_cuenta || !numero_cuenta) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    let img_cedula: string | null = null;
    let img_selfie: string | null = null;

    // Subir imagen de cédula
    if (cedulaFile && cedulaFile.size > 0) {
      const fileName = `${user.id}_cedula_${Date.now()}.${cedulaFile.name.split(".").pop()}`;
      const buffer = Buffer.from(await cedulaFile.arrayBuffer());

      console.log("📤 Subiendo cédula con fileName:", fileName);

      const { data: cedulaData, error } = await supabase.storage
        .from("verificacion")
        .upload(fileName, buffer, {
          contentType: cedulaFile.type,
        });

      console.log("📤 Resultado subida cédula:", { cedulaData, error });

      if (error) {
        console.error("Error al subir cédula:", error);
        return NextResponse.json(
          { error: "Error al subir imagen de cédula", details: error.message },
          { status: 500 }
        );
      }

      // Verificar que el archivo se subió correctamente
      const { data: verifyData, error: verifyError } = await supabase.storage
        .from("verificacion")
        .list("", { search: fileName });
      
      console.log("🔍 Verificación archivo subido:", { verifyData, verifyError });

      // Guardar solo el path, no la URL pública
      img_cedula = cedulaData.path;
      console.log("✅ Path de cédula guardado:", img_cedula);
    }

    // Subir imagen de selfie
    if (selfieFile && selfieFile.size > 0) {
      const fileName = `${user.id}_selfie_${Date.now()}.${selfieFile.name.split(".").pop()}`;
      const buffer = Buffer.from(await selfieFile.arrayBuffer());

      console.log("📤 Subiendo selfie con fileName:", fileName);

      const { data: selfieData, error } = await supabase.storage
        .from("verificacion")
        .upload(fileName, buffer, {
          contentType: selfieFile.type,
        });

      console.log("📤 Resultado subida selfie:", { selfieData, error });

      if (error) {
        console.error("Error al subir selfie:", error);
        return NextResponse.json(
          { error: "Error al subir imagen de selfie", details: error.message },
          { status: 500 }
        );
      }

      // Verificar que el archivo se subió correctamente
      const { data: verifyData, error: verifyError } = await supabase.storage
        .from("verificacion")
        .list("", { search: fileName });
      
      console.log("🔍 Verificación archivo subido:", { verifyData, verifyError });

      // Guardar solo el path, no la URL pública
      img_selfie = selfieData.path;
      console.log("✅ Path de selfie guardado:", img_selfie);
    }

    // Insertar en la tabla

    console.log(user.id);
    const { data, error: insertError } = await supabase
      .from("cuentas_bancarias")
      .insert({
        usuario_id: user.id,
        titular,
        rut,
        banco,
        tipo_cuenta,
        numero_cuenta,
        img_cedula,
        img_selfie,
        cuenta_verificada: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error al insertar cuenta bancaria:", insertError);
      return NextResponse.json(
        {
          error: "Error al registrar cuenta bancaria",
          details: insertError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Cuenta bancaria registrada correctamente",
    });
  } catch (error) {
    console.error("Error en API cuenta-bancaria:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data, error: getError } = await supabase
      .from("cuentas_bancarias")
      .select("*")
      .eq("usuario_id", user.id)
      .single();

    if (getError && getError.code !== "PGRST116") {
      console.error("Error al obtener cuenta bancaria:", getError);
      return NextResponse.json(
        {
          error: "Error al obtener cuenta bancaria",
          details: getError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || null,
    });
  } catch (error) {
    console.error("Error en API cuenta-bancaria GET:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
