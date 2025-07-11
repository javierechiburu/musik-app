import { axiosInstance } from "@/config/axios/axiosInstance";

export interface ChartmetricArtistResponse {
  id: string;
  name: string;
  image_url: string;
  chartmetric_id: number;
  verified: boolean;
  cm_artist_rank: number;
  description: string;
  genre: string[];
  country: string;
  social_links: {
    spotify: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    twitter: string;
  };
  followers: {
    spotify: number;
    instagram: number;
    tiktok: number;
    youtube: number;
    twitter: number;
  };
  streaming_metrics: {
    monthly_listeners: number;
    playlist_reach: number;
    total_streams: number;
  };
  chart_positions: {
    spotify_global: number;
    spotify_us: number;
    apple_music: number;
    shazam: number;
  };
}

const mockArtistData: ChartmetricArtistResponse = {
  id: "artist_12345",
  name: "Artista Ejemplo",
  image_url: "/api/placeholder/300/300",
  chartmetric_id: 123456,
  verified: true,
  cm_artist_rank: 1234,
  description:
    "Artista internacional con millones de reproducciones en todo el mundo",
  genre: ["Pop", "Latino", "Reggaeton"],
  country: "US",
  social_links: {
    spotify: "https://open.spotify.com/artist/ejemplo",
    instagram: "https://instagram.com/artistaejemplo",
    tiktok: "https://tiktok.com/@artistaejemplo",
    youtube: "https://youtube.com/c/artistaejemplo",
    twitter: "https://twitter.com/artistaejemplo",
  },
  followers: {
    spotify: 2500000,
    instagram: 1800000,
    tiktok: 950000,
    youtube: 1200000,
    twitter: 650000,
  },
  streaming_metrics: {
    monthly_listeners: 8500000,
    playlist_reach: 15000000,
    total_streams: 850000000,
  },
  chart_positions: {
    spotify_global: 45,
    spotify_us: 32,
    apple_music: 28,
    shazam: 15,
  },
};

export const fetchArtistData = async (
  artistId?: string
): Promise<ChartmetricArtistResponse> => {
  console.log(artistId);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulación para desarrollo - remover cuando uses la API real
  if (Math.random() > 0.9) {
    throw new Error("Error simulado de red");
  }

  return mockArtistData;
};

export const homeAPIArtista = async (): Promise<ArtistaResponse[] | null> => {
  try {
    const response = await axiosInstance.post("/Colecciones", {
      code: "REGIONES 2018",
    });

    if (response.status !== 200) {
      throw new Error("Error de logout");
    }

    return await response.data.bodyResponse.coleccion.item;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface ArtistaResponse {
  id: string;
  name: string;
  image: string;
  description: string;
}
