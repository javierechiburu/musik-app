"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase/supabaseClient";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: string | null;
  isAdmin: boolean;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(false);

  const getUserRole = async (userId: string): Promise<string | null> => {
    try {
      console.log('🔍 Buscando usuario con auth_id:', userId);
      
      const { data, error } = await supabase
        .from("usuario")
        .select("role, must_change_password")
        .eq("auth_id", userId);

      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }

      console.log('📊 Registros encontrados:', data?.length || 0);
      console.log('📋 Datos:', data);

      // Si no hay datos
      if (!data || data.length === 0) {
        console.warn("No se encontró usuario en la tabla usuario");
        return null;
      }

      // Si hay múltiples registros, usar el más reciente para role
      // pero para must_change_password, si al menos uno es true, usar true
      let userData = data[0];
      if (data.length > 1) {
        console.warn(`⚠️ Se encontraron ${data.length} registros para el mismo usuario. Evaluando must_change_password...`);
      }

      const role = userData?.role || "user";
      
      // Revisar si AL MENOS UN registro tiene must_change_password: true
      console.log('🔍 Datos recibidos:', data);
      
      const mustChange = data.some(record => record.must_change_password === true);
      
      console.log('🔍 ¿Existe al menos un must_change_password: true?:', mustChange);
      console.log('🔍 Valores encontrados:', data.map(r => r.must_change_password));
      
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(role)) {
        console.warn("Rol no válido:", role);
        return "user";
      }

      console.log('💾 Configurando estado:', { role, mustChange });
      setUserRole(role);
      setMustChangePassword(mustChange);
      localStorage.setItem("logged_in_user_role", role);
      console.log('✅ Estado configurado - mustChangePassword:', mustChange);
      return role;
    } catch (error) {
      console.error("Error getting user role:", error);
      return null;
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      // Si el login es exitoso y tenemos el usuario, obtener su role
      if (data.user) {
        console.log('🔑 Login exitoso, obteniendo role del usuario...');
        await getUserRole(data.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    try {
      console.log('🔄 AuthContext: Iniciando logout...');
      
      // Limpiar estado local primero
      setUser(null);
      setSession(null);
      setUserRole(null);
      setMustChangePassword(false);
      
      // Limpiar localStorage
      try {
        localStorage.removeItem("logged_in_user_role");
        console.log('✅ AuthContext: localStorage limpiado');
      } catch (error) {
        console.error('Error limpiando localStorage:', error);
      }
      
      // Cerrar sesión en Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error en Supabase signOut:', error);
      } else {
        console.log('✅ AuthContext: Sesión de Supabase cerrada');
      }
      
    } catch (error) {
      console.error("Error during logout:", error);
      // Aún así, limpiar el estado local
      setUser(null);
      setSession(null);
      setUserRole(null);
      setMustChangePassword(false);
      localStorage.removeItem("logged_in_user_role");
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await getUserRole(user.id);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          setSession(session);
          setUser(session?.user || null);

          if (session?.user) {
            await getUserRole(session.user.id);
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        if (mounted) setLoading(false);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          await getUserRole(session.user.id);
        } else {
          localStorage.removeItem("logged_in_user_role");
          setUserRole(null);
          setMustChangePassword(false);
        }

        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    userRole,
    isAdmin: userRole === "admin",
    mustChangePassword,
    login,
    logout,
    getToken,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
