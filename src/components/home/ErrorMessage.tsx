interface ErrorMessageProps {
  readonly error: Error;
  readonly onRetry: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen space-y-4"
      style={{
        background:
          "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)",
      }}
    >
      <div
        className="text-center p-8 rounded-2xl border backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#F0F6FC" }}>
          Error al cargar los datos
        </h2>
        <p className="mb-4" style={{ color: "#8B949E" }}>
          {error.message}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
          }}
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}