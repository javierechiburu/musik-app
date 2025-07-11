export interface ChartmetricTrackResponse {
  id: string;
  title: string;
  album: string;
  release_date: string;
  duration: string;
  isrc: string;
  mood: string;
  genre: string;
  streaming_metrics: {
    total_streams: string;
    spotify_streams: string;
    apple_streams: string;
    youtube_views: string;
    saves: string;
  };
  chart_data: {
    current_position: number;
    previous_position: number;
    peak_position: number;
    weeks_on_chart: number;
  };
}

export interface ChartmetricPlaylistResponse {
  id: string;
  playlist_name: string;
  platform: string;
  curator: string;
  followers: string;
  track_title: string;
  position: number;
  date_added: string;
  streams: string;
  playlist_type: "editorial" | "user";
  is_active: boolean;
}

export interface ChartmetricChartResponse {
  id: string;
  track_title: string;
  chart_name: string;
  position: number;
  previous_position: number;
  peak_position: number;
  weeks_on_chart: number;
  country: string;
  platform: string;
  last_updated: string;
  trend: "up" | "down" | "stable";
}

export interface ChartmetricTrendingResponse {
  id: string;
  track_title: string;
  platform: string;
  trending_score: number;
  growth_percentage: string;
  viral_moment: string;
  hashtags: string[];
  influencer_mentions: number;
  user_generated_content: number;
  predicted_peak: string;
  current_momentum: "rising" | "peak" | "declining";
  regions: string[];
  age_group: string;
}

export interface ChartmetricSongsDataResponse {
  tracks: ChartmetricTrackResponse[];
  playlists: ChartmetricPlaylistResponse[];
  charts: ChartmetricChartResponse[];
  trending: ChartmetricTrendingResponse[];
}

const mockSongsData: ChartmetricSongsDataResponse = {
  tracks: [
    {
      id: "1",
      title: "Midnight Dreams",
      album: "Neon Nights",
      release_date: "2024-01-15",
      duration: "3:42",
      isrc: "USUM71234567",
      mood: "Melancólico",
      genre: "Electronic Pop",
      streaming_metrics: {
        total_streams: "2.4M",
        spotify_streams: "1.8M",
        apple_streams: "420K",
        youtube_views: "180K",
        saves: "89K",
      },
      chart_data: {
        current_position: 12,
        previous_position: 18,
        peak_position: 8,
        weeks_on_chart: 8,
      },
    },
    {
      id: "2",
      title: "Electric Soul",
      album: "Future Beats",
      release_date: "2024-02-28",
      duration: "4:15",
      isrc: "USUM71234568",
      mood: "Energético",
      genre: "Electronic",
      streaming_metrics: {
        total_streams: "1.8M",
        spotify_streams: "1.2M",
        apple_streams: "380K",
        youtube_views: "220K",
        saves: "67K",
      },
      chart_data: {
        current_position: 25,
        previous_position: 32,
        peak_position: 22,
        weeks_on_chart: 6,
      },
    },
    {
      id: "3",
      title: "Stellar Waves",
      album: "Cosmic Journey",
      release_date: "2024-03-10",
      duration: "3:28",
      isrc: "USUM71234569",
      mood: "Inspirador",
      genre: "Ambient Electronic",
      streaming_metrics: {
        total_streams: "3.1M",
        spotify_streams: "2.1M",
        apple_streams: "560K",
        youtube_views: "440K",
        saves: "112K",
      },
      chart_data: {
        current_position: 8,
        previous_position: 15,
        peak_position: 5,
        weeks_on_chart: 4,
      },
    },
  ],
  playlists: [
    {
      id: "1",
      playlist_name: "Electronic Hits 2024",
      platform: "Spotify",
      curator: "Spotify Editorial",
      followers: "2.4M",
      track_title: "Midnight Dreams",
      position: 15,
      date_added: "2024-01-20",
      streams: "890K",
      playlist_type: "editorial",
      is_active: true,
    },
    {
      id: "2",
      playlist_name: "Future Bass Essentials",
      platform: "Apple Music",
      curator: "Apple Music",
      followers: "1.8M",
      track_title: "Electric Soul",
      position: 8,
      date_added: "2024-03-01",
      streams: "567K",
      playlist_type: "editorial",
      is_active: true,
    },
    {
      id: "3",
      playlist_name: "Chill Electronic Vibes",
      platform: "YouTube Music",
      curator: "Independent Creator",
      followers: "340K",
      track_title: "Stellar Waves",
      position: 3,
      date_added: "2024-03-15",
      streams: "234K",
      playlist_type: "user",
      is_active: true,
    },
  ],
  charts: [
    {
      id: "1",
      track_title: "Midnight Dreams",
      chart_name: "Global Electronic Charts",
      position: 12,
      previous_position: 18,
      peak_position: 8,
      weeks_on_chart: 8,
      country: "Global",
      platform: "Spotify",
      last_updated: "2024-04-01",
      trend: "up",
    },
    {
      id: "2",
      track_title: "Electric Soul",
      chart_name: "Dance/Electronic Songs",
      position: 25,
      previous_position: 32,
      peak_position: 22,
      weeks_on_chart: 6,
      country: "Estados Unidos",
      platform: "Billboard",
      last_updated: "2024-04-01",
      trend: "up",
    },
    {
      id: "3",
      track_title: "Stellar Waves",
      chart_name: "Electronic Hot 100",
      position: 8,
      previous_position: 15,
      peak_position: 5,
      weeks_on_chart: 4,
      country: "Reino Unido",
      platform: "Spotify",
      last_updated: "2024-04-01",
      trend: "up",
    },
  ],
  trending: [
    {
      id: "1",
      track_title: "Midnight Dreams",
      platform: "TikTok",
      trending_score: 92,
      growth_percentage: "+340%",
      viral_moment: "Trending con challenge #MidnightVibes",
      hashtags: ["MidnightVibes", "ElectronicMusic", "DanceChallenge"],
      influencer_mentions: 847,
      user_generated_content: 12400,
      predicted_peak: "Próxima semana",
      current_momentum: "rising",
      regions: ["US", "UK", "CA", "AU"],
      age_group: "18-24",
    },
    {
      id: "2",
      track_title: "Electric Soul",
      platform: "Instagram",
      trending_score: 78,
      growth_percentage: "+180%",
      viral_moment: "Viral en Reels de fitness",
      hashtags: ["ElectricSoul", "WorkoutMusic", "FitnessMotivation"],
      influencer_mentions: 523,
      user_generated_content: 8900,
      predicted_peak: "En 3 días",
      current_momentum: "peak",
      regions: ["US", "MX", "BR"],
      age_group: "25-34",
    },
    {
      id: "3",
      track_title: "Stellar Waves",
      platform: "YouTube",
      trending_score: 85,
      growth_percentage: "+220%",
      viral_moment: "Usado en videos de relajación",
      hashtags: ["StellarWaves", "ChillMusic", "Meditation"],
      influencer_mentions: 234,
      user_generated_content: 5600,
      predicted_peak: "Hace 2 días",
      current_momentum: "declining",
      regions: ["US", "UK", "DE", "FR"],
      age_group: "25-45",
    },
  ],
};

export const fetchSongsData =
  async (): Promise<ChartmetricSongsDataResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulación para desarrollo - remover cuando uses la API real
    if (Math.random() > 0.85) {
      throw new Error("Error simulado al obtener datos de canciones");
    }

    return mockSongsData;
  };

export const fetchTracksData = async (): Promise<
  ChartmetricTrackResponse[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (Math.random() > 0.9) {
    throw new Error("Error simulado al obtener datos de tracks");
  }

  return mockSongsData.tracks;
};

export const fetchPlaylistsData = async (): Promise<
  ChartmetricPlaylistResponse[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (Math.random() > 0.9) {
    throw new Error("Error simulado al obtener datos de playlists");
  }

  return mockSongsData.playlists;
};

export const fetchChartsData = async (): Promise<
  ChartmetricChartResponse[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (Math.random() > 0.9) {
    throw new Error("Error simulado al obtener datos de charts");
  }

  return mockSongsData.charts;
};

export const fetchTrendingData = async (): Promise<
  ChartmetricTrendingResponse[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (Math.random() > 0.9) {
    throw new Error("Error simulado al obtener datos de trending");
  }

  return mockSongsData.trending;
};
