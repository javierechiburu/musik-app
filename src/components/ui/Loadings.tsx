export const LoadingSpinner = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)",
      }}
    >
      <div className="relative">
        {/* Elegant sound waves */}
        <div className="flex items-end space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-sm animate-pulse"
              style={{
                width: "3px",
                height: `${16 + i * 4}px`,
                background: "linear-gradient(to top, #667eea, #764ba2)",
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1.2s",
              }}
            ></div>
          ))}
        </div>

        {/* Subtle loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium" style={{ color: "#8B949E" }}>
            Cargando...
          </p>
        </div>
      </div>
    </div>
  );
};
