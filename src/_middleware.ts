import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const supabase = createMiddlewareClient({ req: request, res: response });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    const pathname = request.nextUrl.pathname;
    const isAuthenticated = !!session?.user && !error;

    console.log("Middleware:", {
      pathname,
      isAuthenticated,
      sessionExists: !!session,
      error,
    });

    const protectedAPIRoutes = [
      "/api/billetera",
      "/api/marketing",
      "/api/marketing-requests",
      "/api/marketing-email",
      "/api/send-marketing-email",
      "/api/send-verification-email",
      "/api/send-withdrawal-request",
      "/api/create-user",
      "/api/admin",
    ];

    if (
      protectedAPIRoutes.some((route) => pathname.startsWith(route)) &&
      !isAuthenticated
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const publicPaths = [
      "/login",
      "/api/auth",
      "/favicon.ico",
      "/_next/static/(.*)",
      "/_next/image/(.*)",
      "/:path*\\.(svg|png|jpg|jpeg|css|js|woff2)",
      "/public/(.*)",
    ];

    const isPublicPath = publicPaths.some((pattern) => {
      const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
      return regex.test(pathname);
    });

    // Permitir acceso a /login incluso si está autenticado 
    // El componente de login manejará la redirección basada en must_change_password
    if (isPublicPath) {
      // COMENTADO: No redirigir automáticamente desde login
      // if (pathname === "/login" && isAuthenticated) {
      //   return NextResponse.redirect(new URL("/home", request.url));
      // }
      return response;
    }

    // Redirigir desde / a la ruta adecuada
    if (pathname === "/") {
      if (isAuthenticated) {
        // Obtener información del usuario para verificar si debe cambiar contraseña
        try {
          const supabase = createMiddlewareClient({ req: request, res: response });
          const { data: userData, error: userError } = await supabase
            .from("usuario")
            .select("must_change_password")
            .eq("auth_id", session?.user.id)
            .single();

          console.log("Middleware - verificando must_change_password:", {
            userId: session?.user.id,
            mustChangePassword: userData?.must_change_password,
            userError
          });

          // Si el usuario debe cambiar contraseña, redirigir a login
          if (userData?.must_change_password) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
        } catch (error) {
          console.error("Error checking must_change_password in middleware:", error);
        }
        
        // Usuario autenticado sin necesidad de cambiar contraseña
        return NextResponse.redirect(new URL("/home", request.url));
      } else {
        // Usuario no autenticado
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Si no está autenticado y la ruta no es pública
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // En caso de error, permitir continuar pero sin autenticación
    const pathname = request.nextUrl.pathname;
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
