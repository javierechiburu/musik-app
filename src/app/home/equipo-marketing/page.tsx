"use client";

import HeaderPage from "@/components/ui/HeaderPage";
import Image from "next/image";

function MarketingProfile() {
  return (
    <HeaderPage overlayColor="pink" height="md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #EC4899 0%, #8B5CF6 100%)",
                boxShadow: "0 8px 16px rgba(236, 72, 153, 0.3)",
                border: "3px solid rgba(236, 72, 153, 0.2)",
              }}
            >
              <span className="text-6xl font-bold text-white">🚀</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                FADER Marketing Team
              </h3>
              <p className="text-pink-100">
                Impulsa tu música • Estrategias digitales • Alcanza nuevas
                audiencias
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #EC4899",
            }}
          >
            🎯 Estrategias Personalizadas
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #EC4899",
            }}
          >
            📈 Resultados Garantizados
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #EC4899",
            }}
          >
            🌟 Equipo Experto
          </span>
        </div>
      </div>
    </HeaderPage>
  );
}

function BannerPrincipal() {
  return (
    <div
      className="relative rounded-xl p-8 mb-6 overflow-hidden min-h-[200px]"
      style={{
        background:
          "linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #3B82F6 100%)",
        border: "1px solid rgba(236, 72, 153, 0.3)",
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
      }}
    >
      {/* Fondo con imagen */}
      <div className="absolute inset-0">
        <Image
          src="/FADER-1920X1080.jpg"
          alt="Marketing Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(139, 92, 246, 0.8) 50%, rgba(59, 130, 246, 0.7) 100%)",
        }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          🚀 Impulsa Tu Música al Siguiente Nivel
        </h1>
        <p className="text-xl mb-6 drop-shadow-md opacity-95">
          Estrategias de marketing musical diseñadas para artistas que quieren
          destacar
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
            📞 Contactar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiciosDestacados() {
  const servicios = [
    {
      title: "📱 Marketing Digital",
      description:
        "Estrategias en redes sociales, influencers y contenido viral",
      bgImage: "/FADER-1920X1080.jpg",
      color: "from-purple-600/90 to-pink-600/90",
    },
    {
      title: "🎥 Contenido Visual",
      description: "Videos musicales, lyric videos, y contenido para redes",
      bgImage: "/FADER-1920X1080.jpg",
      color: "from-blue-600/90 to-purple-600/90",
    },
    {
      title: "📊 Analytics & Data",
      description: "Análisis de métricas, targeting y optimización de campañas",
      bgImage: "/FADER-1920X1080.jpg",
      color: "from-green-600/90 to-blue-600/90",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden h-48 group cursor-pointer"
          style={{
            border: "1px solid rgba(236, 72, 153, 0.3)",
            boxShadow: "0 8px 32px rgba(236, 72, 153, 0.15)",
          }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <Image
              src={servicio.bgImage}
              alt={servicio.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${servicio.color} group-hover:opacity-90 transition-opacity duration-300`}
          ></div>

          {/* Contenido */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
            <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
              {servicio.title}
            </h3>
            <p className="text-sm opacity-90 drop-shadow-md">
              {servicio.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EquipoCreativo() {
  const miembros = [
    {
      nombre: "María González",
      rol: "Creative Director",
      imagen: "/FADER-1920X1080.jpg",
      especialidad: "Estrategia de Marca",
      email: "maria@fader.com",
      linkedin: "#",
    },
    {
      nombre: "Carlos Mendoza",
      rol: "Social Media Manager",
      imagen: "/FADER-1920X1080.jpg",
      especialidad: "Contenido Viral",
      email: "carlos@fader.com",
      linkedin: "#",
    },
    {
      nombre: "Ana Rodríguez",
      rol: "Video Producer",
      imagen: "/FADER-1920X1080.jpg",
      especialidad: "Producción Audiovisual",
      email: "ana@fader.com",
      linkedin: "#",
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/60 to-pink-900/30 rounded-xl border border-pink-500/30 p-6"
      style={{ boxShadow: "0 8px 32px rgba(236, 72, 153, 0.15)" }}
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        🌟 Conoce a Nuestro Equipo
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {miembros.map((miembro, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Foto del miembro */}
            <div className="relative rounded-xl overflow-hidden mb-4 h-48">
              <Image
                src={miembro.imagen}
                alt={miembro.nombre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent"></div>

              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold text-lg drop-shadow-lg">
                  {miembro.nombre}
                </h4>
                <p className="text-sm opacity-90">{miembro.rol}</p>
              </div>
            </div>

            {/* Detalles */}
            <div className="text-center">
              <p className="text-pink-300 font-medium mb-2">
                {miembro.especialidad}
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href={`mailto:${miembro.email}`}
                  className="px-4 py-2 bg-pink-600/80 text-white rounded-lg hover:bg-pink-500/80 transition-colors text-sm"
                >
                  📧 Email
                </a>
                <a
                  href={miembro.linkedin}
                  className="px-4 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-500/80 transition-colors text-sm"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactoBanner() {
  return (
    <div
      className="relative rounded-xl p-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #7C3AED 100%)",
        border: "1px solid rgba(236, 72, 153, 0.3)",
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)",
      }}
    >
      {/* Fondo con imagen */}
      <div className="absolute inset-0">
        <Image
          src="/FADER-1920X1080.jpg"
          alt="Contact Background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(139, 92, 246, 0.8) 50%, rgba(124, 58, 237, 0.7) 100%)",
        }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
          💼 ¿Listo para hacer crecer tu música?
        </h2>
        <p className="text-lg mb-6 drop-shadow-md opacity-95 max-w-2xl mx-auto">
          Nuestro equipo de marketing musical está aquí para llevar tu carrera
          al siguiente nivel. Contacta con nosotros y empecemos a trabajar
          juntos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="text-2xl mb-2">📞</div>
            <p className="font-semibold">Llamada Gratuita</p>
            <p className="text-sm opacity-90">30 min de consultoría</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="text-2xl mb-2">📧</div>
            <p className="font-semibold">Propuesta Personalizada</p>
            <p className="text-sm opacity-90">Plan adaptado a ti</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
            <div className="text-2xl mb-2">🚀</div>
            <p className="font-semibold">Resultados Rápidos</p>
            <p className="text-sm opacity-90">Ve el impacto desde el día 1</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-pink-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            📞 Agendar Llamada
          </button>
          <button className="px-8 py-4 bg-pink-600/80 backdrop-blur-sm rounded-xl font-semibold text-lg border border-pink-500/50 hover:bg-pink-500/80 transition-all duration-300 hover:scale-105">
            📧 Enviar Mensaje
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EquipoMarketingPage() {
  return (
    <div className="space-y-6">
      {/* Header Profile Section */}
      <MarketingProfile />

      {/* Banner principal */}
      <BannerPrincipal />

      {/* Servicios destacados */}
      <ServiciosDestacados />

      {/* Equipo creativo */}
      <EquipoCreativo />

      {/* Banner de contacto */}
      <ContactoBanner />
    </div>
  );
}
