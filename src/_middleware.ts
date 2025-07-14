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

    // Redirigir de /login a /home si ya está autenticado
    if (isPublicPath) {
      if (pathname === "/login" && isAuthenticated) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      return response;
    }

    // Redirigir desde / a la ruta adecuada
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(isAuthenticated ? "/home" : "/login", request.url)
      );
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
