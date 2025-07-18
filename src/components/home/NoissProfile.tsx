import HeaderPage from "../ui/HeaderPage";

export default function NoissProfile() {
  return (
    <HeaderPage overlayColor="pink" height="md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)",
                boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)",
                border: "3px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <span className="text-6xl font-bold text-white">N</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Noiss</h3>
              <p className="text-purple-100">
                Artista Chileno • Ranking #4237 🇨🇱 • ALDIA Records
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center space-x-3 mt-4">
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #C4B5FD",
            }}
          >
            🎵 En desarrollo
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #C4B5FD",
            }}
          >
            📈 Crecimiento
          </span>
          <span
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-800"
            style={{
              border: "1px solid #C4B5FD",
            }}
          >
            ⭐ Premium
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="text-sm text-white font-medium">
          Redes Sociales
        </div>
        <div className="flex space-x-3">
          {/* Spotify */}
          <a
            href="#"
            className="w-10 h-10 bg-[#1DB954]/20 hover:bg-[#1DB954]/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-[#1DB954]/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#1DB954" }}
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.599-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.183 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="w-10 h-10 bg-[#E1306C]/20 hover:bg-[#E1306C]/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-[#E1306C]/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#E1306C" }}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            className="w-10 h-10 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-[#FF0000]/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#FF0000" }}
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="#"
            className="w-10 h-10 bg-[#010101]/20 hover:bg-[#010101]/30 rounded-lg flex items-center justify-center transition-all duration-300 group border border-[#010101]/30"
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#010101" }}
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>

      </div>
    </HeaderPage>
  );
}