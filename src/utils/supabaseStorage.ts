import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const obtenerSignedUrl = async (path: string): Promise<string | null> => {
  if (!path) return null;
  
  try {
    console.log("🔍 Intentando crear signed URL para path:", path);
    
    // Verificar si el archivo existe primero
    const { data: fileData, error: fileError } = await supabase.storage
      .from("verificacion")
      .list("", { search: path });
    
    console.log("📁 Resultado de búsqueda de archivo:", { fileData, fileError });
    
    const { data, error } = await supabase.storage
      .from("verificacion")
      .createSignedUrl(path, 60 * 60); // 1 hora

    if (error) {
      console.error("❌ Error creando signed URL:", error);
      console.error("❌ Path usado:", path);
      return null;
    }

    console.log("✅ Signed URL creada exitosamente:", data.signedUrl);
    return data.signedUrl;
  } catch (error) {
    console.error("❌ Error inesperado creando signed URL:", error);
    return null;
  }
};

// Función para extraer el path de una URL completa
export const extractPathFromUrl = (url: string): string => {
  try {
    console.log("🔍 Extrayendo path de URL:", url);
    
    // Si la URL contiene el dominio de Supabase, extraer solo el path
    const urlParts = url.split('/');
    console.log("📝 URL parts:", urlParts);
    
    const bucketIndex = urlParts.findIndex(part => part === 'verificacion');
    console.log("🪣 Bucket index:", bucketIndex);
    
    if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
      const extractedPath = urlParts.slice(bucketIndex + 1).join('/');
      console.log("✅ Path extraído:", extractedPath);
      return extractedPath;
    }
    
    // Si no encuentra el bucket, asumir que ya es solo el path
    console.log("⚠️ No se encontró bucket, usando URL completa como path");
    return url;
  } catch (error) {
    console.error("❌ Error extrayendo path de URL:", error);
    return url;
  }
};

// Función helper para obtener signed URL desde una URL completa
export const obtenerSignedUrlFromFullUrl = async (fullUrl: string): Promise<string | null> => {
  const path = extractPathFromUrl(fullUrl);
  return await obtenerSignedUrl(path);
};