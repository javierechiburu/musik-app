import HeaderPage from "@/components/ui/HeaderPage";

export default function WalletProfile() {
  return (
    <HeaderPage overlayColor="blue" height="md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
                border: "3px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Mi Billetera Digital
              </h3>
              <p className="text-green-100">
                Gestión financiera para artistas • Retiros y Ganancias • FADER
                Records
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            💰 Cuenta Verificada
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            ✅ Disponible para Retiros
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #10B981",
            }}
          >
            🏦 Cuenta Premium
          </span>
        </div>
      </div>
    </HeaderPage>
  );
}