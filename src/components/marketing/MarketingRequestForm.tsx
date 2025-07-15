"use client";

import { useState } from "react";
import HeaderPage from "../ui/HeaderPage";

interface MarketingRequestFormProps {
  readonly onSubmit: (formData: any) => void;
  readonly isLoading?: boolean;
}

export default function MarketingRequestForm({
  onSubmit,
  isLoading = false,
}: MarketingRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Herramientas seleccionadas
    tools: {
      googleAds: false,
      marquee: false,
      meta: false,
      tiktokAds: false,
      kali: false,
      mediosDigitales: false,
      mediosTradicionales: false,
    },
    // Segmentación
    segmentation: {
      countries: [],
      genders: [],
      ages: [],
      genres: [],
    },
    // Información adicional
    budget: "",
    campaign_objective: "",
    content_type: "",
    timeline: "",
    additional_notes: "",
  });

  const countries = [
    "Chile",
    "Argentina",
    "Uruguay",
    "Bolivia",
    "Perú",
    "Brasil",
    "Paraguay",
    "Colombia",
    "Puerto Rico",
    "Nicaragua",
    "Guatemala",
    "México",
    "Costa Rica",
    "España",
    "Estados Unidos",
    "Canadá",
    "Francia",
    "Reino Unido",
  ];

  const genders = ["Mujer", "Hombre", "No binario"];
  const ageGroups = [
    "18-24",
    "24-34",
    "34-44",
    "44-54",
    "54-64",
    "64-74",
    "74-84",
  ];
  const genres = [
    "Rock",
    "Rock Alternativo",
    "Rock Clásico",
    "Punk",
    "Hard Rock",
    "Metal",
    "Heavy Metal",
    "Death Metal",
    "Black Metal",
    "Metalcore",
    "Post-Rock",
    "Rock Progresivo",
    "Pop",
    "Pop Latino",
    "K-Pop",
    "Electro Pop",
    "Dream Pop",
    "Bubblegum Pop",
    "Synthpop",
    "J-Pop",
    "EDM",
    "House",
    "Deep House",
    "Tech House",
    "Electrónica",
    "Hip-Hop",
    "Rap",
    "Trap",
    "R&B",
    "Soul",
    "Funk",
    "Jazz",
    "Blues",
    "Country",
    "Folk",
    "Reggae",
    "Reggaeton",
    "Salsa",
    "Bachata",
    "Merengue",
    "Cumbia",
    "Vallenato",
  ];

  const steps = [
    {
      id: 1,
      title: "Herramientas",
      icon: "🚀",
      description: "Selecciona las plataformas",
    },
    {
      id: 2,
      title: "Audiencia",
      icon: "🎯",
      description: "Define tu público objetivo",
    },
    {
      id: 3,
      title: "Detalles",
      icon: "📝",
      description: "Completa la información",
    },
  ];

  const toolsData = [
    {
      key: "googleAds",
      label: "Google Ads",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      description: "Búsqueda y Display",
    },
    {
      key: "marquee",
      label: "Spotify Marquee",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      color: "from-green-500 to-green-600",
      description: "Promoción en Spotify",
    },
    {
      key: "meta",
      label: "Meta Ads",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "from-blue-500 to-purple-600",
      description: "Facebook e Instagram",
    },
    {
      key: "tiktokAds",
      label: "TikTok Ads",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: "from-pink-500 to-red-600",
      description: "Videos virales",
    },
    {
      key: "kali",
      label: "Kali",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
          <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      description: "Analytics avanzado",
    },
    {
      key: "mediosDigitales",
      label: "Medios Digitales",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 13H4V5h16v11z"/>
        </svg>
      ),
      color: "from-cyan-500 to-cyan-600",
      description: "Prensa digital",
    },
    {
      key: "mediosTradicionales",
      label: "Medios Tradicionales",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-.83-.51-1.57-1.24-1.85L12 10.5 3.24 6.15zM12 9L4 6h16l-8 3z"/>
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
      description: "Radio, TV, Prensa",
    },
  ];

  const handleToolChange = (tool: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [tool]: checked,
      },
    }));
  };

  const handleSegmentationChange = (
    type: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      segmentation: {
        ...prev.segmentation,
        [type]: checked
          ? [
              ...prev.segmentation[type as keyof typeof prev.segmentation],
              value,
            ]
          : prev.segmentation[type as keyof typeof prev.segmentation].filter(
              (item: string) => item !== value
            ),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getSelectedCount = (type: string) => {
    return formData.segmentation[type as keyof typeof formData.segmentation]
      .length;
  };

  const getSelectedToolsCount = () => {
    return Object.values(formData.tools).filter(Boolean).length;
  };

  return (
    <div className="space-y-8">
      {/* Header con progreso mejorado */}
      <HeaderPage overlayColor="pink">
        <div className="p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Solicitar Campaña de Marketing
                </h2>
                <p className="text-purple-200 text-base">
                  Crea una campaña personalizada para tu música
                </p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-white text-sm">Paso {currentStep} de 3</p>
              <div className="w-32 bg-purple-800/50 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stepper mejorado */}
          <div className="flex items-center justify-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                        : "bg-gray-700/50 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="text-center mt-2">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </HeaderPage>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paso 1: Herramientas */}
        {currentStep === 1 && (
          <div className="bg-gradient-to-br from-indigo-950/20 to-blue-950/20 backdrop-blur border border-gray-700/50 rounded-xl p-8 transition-all duration-500 ease-in-out">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Selecciona tus Herramientas
                  </h3>
                  <p className="text-gray-400">
                    Elige las plataformas donde quieres promocionar tu música
                  </p>
                </div>
              </div>
              <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-medium">
                  {getSelectedToolsCount()} seleccionadas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsData.map((tool) => (
                <label
                  key={tool.key}
                  className={`group relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                    formData.tools[tool.key as keyof typeof formData.tools]
                      ? "border-purple-500 bg-gradient-to-br from-purple-900/30 to-pink-900/30 scale-105 shadow-xl"
                      : "border-gray-700/50 bg-gray-700/20 hover:border-gray-600 hover:bg-gray-700/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.tools[tool.key as keyof typeof formData.tools]
                    }
                    onChange={(e) =>
                      handleToolChange(tool.key, e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${tool.color} shadow-lg`}
                    >
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {tool.label}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {tool.description}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        formData.tools[tool.key as keyof typeof formData.tools]
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-500"
                      }`}
                    >
                      {formData.tools[
                        tool.key as keyof typeof formData.tools
                      ] && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Paso 2: Segmentación */}
        {currentStep === 2 && (
          <div className="bg-gradient-to-br from-indigo-950/20 to-blue-950/20 backdrop-blur border border-gray-700/50 rounded-xl p-8 transition-all duration-500 ease-in-out">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Define tu Audiencia
                </h3>
                <p className="text-gray-400">
                  Selecciona el público objetivo para tu campaña
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Países */}
              <div className="bg-gray-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">🌍</span> Países
                  </h4>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    {getSelectedCount("countries")} seleccionados
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600">
                  {countries.map((country) => (
                    <label
                      key={country}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-600/30 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSegmentationChange(
                            "countries",
                            country,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-600 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-300">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Géneros Musicales */}
              <div className="bg-gray-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">🎵</span> Géneros Musicales
                  </h4>
                  <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm">
                    {getSelectedCount("genres")} seleccionados
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600">
                  <div className="grid grid-cols-1 gap-2">
                    {genres.map((genre) => (
                      <label
                        key={genre}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-600/30 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleSegmentationChange(
                              "genres",
                              genre,
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-600 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-300">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Edad */}
              <div className="bg-gray-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">👥</span> Grupos de Edad
                  </h4>
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    {getSelectedCount("ages")} seleccionados
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {ageGroups.map((age) => (
                    <label
                      key={age}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-600/30 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSegmentationChange(
                            "ages",
                            age,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-600 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-gray-300">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Género */}
              <div className="bg-gray-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">⚧️</span> Identidad de Género
                  </h4>
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                    {getSelectedCount("genders")} seleccionados
                  </span>
                </div>
                <div className="space-y-3">
                  {genders.map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-600/30 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSegmentationChange(
                            "genders",
                            gender,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-300">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 3: Información Adicional */}
        {currentStep === 3 && (
          <div className="bg-gradient-to-br from-indigo-950/20 to-blue-950/20 backdrop-blur border border-gray-700/50 rounded-xl p-8 transition-all duration-500 ease-in-out">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Detalles de la Campaña
                </h3>
                <p className="text-gray-400">
                  Completa la información específica de tu campaña
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-300 mb-3"
                >
                  💰 Presupuesto
                </label>
                <input
                  id="budget"
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, budget: e.target.value }))
                  }
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Ej: $1,00 - $1,000"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="additional_notes"
                className="block text-sm font-medium text-gray-300 mb-3"
              >
                📄 Notas Adicionales
              </label>
              <textarea
                id="additional_notes"
                value={formData.additional_notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additional_notes: e.target.value,
                  }))
                }
                rows={4}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe detalles específicos de tu campaña, objetivos especiales, o cualquier información relevante..."
              />
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between items-center bg-gradient-to-br from-indigo-950/20 to-blue-950/20 rounded-xl p-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevStep();
            }}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              currentStep === 1
                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Anterior</span>
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextStep();
              }}
              className="flex items-center space-x-2 px-6 py-3 bg-violet-500 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
            >
              <span>Siguiente</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl transition-all shadow-lg ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
              <span>{isLoading ? "Enviando..." : "Enviar Solicitud"}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
