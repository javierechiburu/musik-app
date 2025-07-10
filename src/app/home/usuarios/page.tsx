'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase/supabaseClient'
import { useRouter } from 'next/navigation'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({ email: '', username: '', role: 'user' })
  const router = useRouter()

  useEffect(() => {
    const validarAdmin = async () => {
      const { data: session } = await supabase.auth.getUser()
      const { data: perfil } = await supabase
        .from('user')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (perfil?.role !== 'admin') {
        router.push('/no-autorizado')
        return
      }

      setIsAdmin(true)
      fetchUsuarios()
    }

    const fetchUsuarios = async () => {
      const { data } = await supabase.from('user').select('*')
      setUsuarios(data || [])
      setLoading(false)
    }

    validarAdmin()
  }, [])

  const handleChange = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const crearUsuario = async () => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: newUser.email,
      password: 'temporal123' // contraseña temporal
    })

    // if (signUpError) return alert(signUpError.message)
    if (signUpError) {
      console.error('Error en signUp:', signUpError.message)
      alert(`Error: ${signUpError.message}`)
      return
    }

    const userId = signUpData.user.id
    const { error: insertError } = await supabase.from('user').insert([
      {
        id: userId,
        username: newUser.username,
        role: newUser.role,
        created_at: new Date().toISOString()
      }
    ])

    if (insertError) return alert(insertError.message)

    setNewUser({ email: '', username: '', role: 'user' })
    fetchUsuarios()
  }

  const eliminarUsuario = async (id: string) => {
    await supabase.from('user').delete().eq('id', id)
    setUsuarios(usuarios.filter((u) => u.id !== id))
  }

  const fetchUsuarios = async () => {
    const { data } = await supabase.from('user').select('*')
    setUsuarios(data || [])
  }

  if (!isAdmin || loading) return <p className="text-white p-6">Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Administrar Usuarios</h2>
        <p className="text-gray-400 mb-6">Solo usuarios con rol admin pueden ver esta sección</p>

        {/* Formulario para agregar usuario */}
        <div className="grid sm:grid-cols-4 gap-4">
          <input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <input
            name="username"
            type="text"
            value={newUser.username}
            onChange={handleChange}
            placeholder="Username"
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            onClick={crearUsuario}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Crear Usuario
          </button>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Usuarios registrados</h3>
        <div className="space-y-4">
          {usuarios.map((user, i) => (
            <div key={i} className="bg-gray-700 rounded p-4 flex justify-between items-center">
              <div>
                <p className="text-white font-medium">{user.username}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-300">{user.role}</span>
                <button
                  onClick={() => eliminarUsuario(user.id)}
                  className="p-2 text-red-500 hover:bg-gray-600 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
