import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verificar buckets existentes
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    console.log("📦 Buckets disponibles:", buckets);
    
    if (bucketsError) {
      console.error("❌ Error listando buckets:", bucketsError);
    }
    
    // Verificar archivos en el bucket verificacion
    const { data: files, error: filesError } = await supabase.storage
      .from("verificacion")
      .list("", { limit: 100 });
    
    console.log("📁 Archivos en bucket verificacion:", files);
    
    if (filesError) {
      console.error("❌ Error listando archivos:", filesError);
    }
    
    // Verificar información del bucket
    const verificacionBucket = buckets?.find(b => b.name === "verificacion");
    console.log("🪣 Info del bucket verificacion:", verificacionBucket);
    
    return NextResponse.json({
      success: true,
      buckets: buckets || [],
      files: files || [],
      verificacionBucket: verificacionBucket || null,
      bucketsError: bucketsError?.message || null,
      filesError: filesError?.message || null,
    });
  } catch (error) {
    console.error("❌ Error en debug-storage:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", details: error },
      { status: 500 }
    );
  }
}