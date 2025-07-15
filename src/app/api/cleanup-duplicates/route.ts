import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    console.log('🧹 === LIMPIEZA DE DUPLICADOS ===');

    // 1. Encontrar todos los auth_id que tienen registros duplicados
    const { data: duplicates, error: findError } = await supabaseAdmin
      .from('usuario')
      .select('auth_id, id, created_at')
      .order('auth_id')
      .order('created_at', { ascending: false }); // Más reciente primero

    if (findError) {
      console.error('❌ Error buscando duplicados:', findError);
      return NextResponse.json(
        { error: 'Error buscando duplicados', details: findError },
        { status: 500 }
      );
    }

    // 2. Agrupar por auth_id y encontrar duplicados
    const authIdGroups: { [key: string]: any[] } = {};
    
    duplicates?.forEach(user => {
      if (!authIdGroups[user.auth_id]) {
        authIdGroups[user.auth_id] = [];
      }
      authIdGroups[user.auth_id].push(user);
    });

    // 3. Identificar y eliminar duplicados
    const duplicateStats = {
      totalAuthIds: Object.keys(authIdGroups).length,
      duplicatedAuthIds: 0,
      recordsToDelete: 0,
      deleted: 0
    };

    const toDelete: number[] = [];

    Object.entries(authIdGroups).forEach(([authId, users]) => {
      if (users.length > 1) {
        duplicateStats.duplicatedAuthIds++;
        duplicateStats.recordsToDelete += users.length - 1;
        
        console.log(`🔍 Auth ID ${authId} tiene ${users.length} registros`);
        
        // Mantener solo el más reciente, marcar el resto para eliminación
        const sortedUsers = users.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        // Eliminar todos excepto el primero (más reciente)
        for (let i = 1; i < sortedUsers.length; i++) {
          toDelete.push(sortedUsers[i].id);
          console.log(`❌ Marcando para eliminar: ID ${sortedUsers[i].id} (${sortedUsers[i].created_at})`);
        }
        
        console.log(`✅ Manteniendo: ID ${sortedUsers[0].id} (${sortedUsers[0].created_at})`);
      }
    });

    // 4. Eliminar los duplicados
    if (toDelete.length > 0) {
      console.log(`🗑️ Eliminando ${toDelete.length} registros duplicados...`);
      
      const { error: deleteError } = await supabaseAdmin
        .from('usuario')
        .delete()
        .in('id', toDelete);

      if (deleteError) {
        console.error('❌ Error eliminando duplicados:', deleteError);
        return NextResponse.json(
          { error: 'Error eliminando duplicados', details: deleteError },
          { status: 500 }
        );
      }

      duplicateStats.deleted = toDelete.length;
      console.log(`✅ ${toDelete.length} registros duplicados eliminados exitosamente`);
    }

    return NextResponse.json({
      success: true,
      message: 'Limpieza de duplicados completada',
      stats: duplicateStats,
      deletedIds: toDelete
    });

  } catch (error: any) {
    console.error('❌ Error en cleanup-duplicates:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}