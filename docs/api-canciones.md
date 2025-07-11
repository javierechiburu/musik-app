// ENDPOINTS OFICIALES DE LA API DE CHARTMETRIC PARA DATOS DE CANCIONES
// URLs exactas según la documentación oficial en pycmc.docs.musicfox.io

const cmid = 2316; // Ejemplo: Chartmetric ID del artista (Rihanna)
const apiKey = "YOUR_CHARTMETRIC_API_KEY";
const baseURL = "https://api.chartmetric.com";

const headers = {
'Authorization': `Bearer ${apiKey}`,
'Content-Type': 'application/json'
};

try {
// 1. Obtener tracks del artista
const tracksResponse = await axios.get(`${baseURL}/api/artist/${cmid}/tracks`, { headers });
// Proporciona: lista de tracks con IDs, títulos, álbumes, fechas de lanzamiento

    // 2. Para cada track, obtener información detallada
    const tracksWithMetrics = await Promise.all(
      tracksResponse.data.map(async (track) => {
        const trackId = track.id;

        // Información básica del track
        const trackInfo = await axios.get(`${baseURL}/api/track/${trackId}`, { headers });
        // Proporciona: title, album, duration, isrc, mood, genre

        // Métricas de streaming por track
        const spotifyStats = await axios.get(`${baseURL}/api/track/${trackId}/stat/spotify`, { headers });
        // Proporciona: spotify_streams, saves, playlist_count

        const appleStats = await axios.get(`${baseURL}/api/track/${trackId}/stat/applemusic`, { headers });
        // Proporciona: apple_streams, chart_positions

        const youtubeStats = await axios.get(`${baseURL}/api/track/${trackId}/stat/youtube`, { headers });
        // Proporciona: youtube_views, likes, comments

        // Posiciones en charts por track
        const chartPositions = await axios.get(`${baseURL}/api/track/${trackId}/charts`, { headers });
        // Proporciona: current_position, previous_position, peak_position, weeks_on_chart

        return {
          id: trackId,
          title: trackInfo.data.title,
          album: trackInfo.data.album,
          release_date: trackInfo.data.release_date,
          duration: trackInfo.data.duration,
          isrc: trackInfo.data.isrc,
          mood: trackInfo.data.mood,
          genre: trackInfo.data.genre,
          streaming_metrics: {
            total_streams: (spotifyStats.data.streams + appleStats.data.streams + youtubeStats.data.views).toString(),
            spotify_streams: spotifyStats.data.streams.toString(),
            apple_streams: appleStats.data.streams.toString(),
            youtube_views: youtubeStats.data.views.toString(),
            saves: spotifyStats.data.saves.toString(),
          },
          chart_data: {
            current_position: chartPositions.data.current_position,
            previous_position: chartPositions.data.previous_position,
            peak_position: chartPositions.data.peak_position,
            weeks_on_chart: chartPositions.data.weeks_on_chart,
          },
        };
      })
    );

    // 3. Obtener datos de playlists donde aparecen las canciones del artista
    const playlistsSpotify = await axios.get(`${baseURL}/api/artist/${cmid}/spotify/current/playlists`, { headers });
    // Proporciona: playlist_name, curator, followers, position, date_added

    const playlistsApple = await axios.get(`${baseURL}/api/artist/${cmid}/applemusic/current/playlists`, { headers });
    // Proporciona: playlist_name, curator, followers, position, date_added

    // 4. Obtener posiciones en charts globales y regionales
    const chartsSpotify = await axios.get(`${baseURL}/api/artist/${cmid}/spotify/charts`, { headers });
    // Proporciona: chart_name, country, platform, position, trend

    const chartsApple = await axios.get(`${baseURL}/api/artist/${cmid}/applemusic/charts`, { headers });
    // Proporciona: chart_name, country, platform, position, trend

    const chartsShazam = await axios.get(`${baseURL}/api/artist/${cmid}/shazam/charts`, { headers });
    // Proporciona: chart_name, country, platform, position, trend

    // 5. Obtener datos de trending en redes sociales
    const tiktokTrending = await axios.get(`${baseURL}/api/artist/${cmid}/tiktok-audience-stats`, { headers });
    // Proporciona: trending_score, growth_percentage, viral_moments

    const socialTrending = await axios.get(`${baseURL}/api/artist/${cmid}/stat/instagram`, { headers });
    // Proporciona: engagement_rate, mentions, hashtags

    // Construir la estructura ChartmetricSongsDataResponse
    return {
      tracks: tracksWithMetrics,
      playlists: [
        ...playlistsSpotify.data.map(playlist => ({
          id: playlist.id,
          playlist_name: playlist.name,
          platform: 'Spotify',
          curator: playlist.curator,
          followers: playlist.followers.toString(),
          track_title: playlist.track_title,
          position: playlist.position,
          date_added: playlist.date_added,
          streams: playlist.streams.toString(),
          playlist_type: playlist.type as 'editorial' | 'user',
          is_active: playlist.is_active,
        })),
        ...playlistsApple.data.map(playlist => ({
          id: playlist.id,
          playlist_name: playlist.name,
          platform: 'Apple Music',
          curator: playlist.curator,
          followers: playlist.followers.toString(),
          track_title: playlist.track_title,
          position: playlist.position,
          date_added: playlist.date_added,
          streams: playlist.streams.toString(),
          playlist_type: playlist.type as 'editorial' | 'user',
          is_active: playlist.is_active,
        }))
      ],
      charts: [
        ...chartsSpotify.data.map(chart => ({
          id: chart.id,
          track_title: chart.track_title,
          chart_name: chart.chart_name,
          position: chart.position,
          previous_position: chart.previous_position,
          peak_position: chart.peak_position,
          weeks_on_chart: chart.weeks_on_chart,
          country: chart.country,
          platform: 'Spotify',
          last_updated: chart.last_updated,
          trend: chart.trend as 'up' | 'down' | 'stable',
        })),
        ...chartsApple.data.map(chart => ({
          id: chart.id,
          track_title: chart.track_title,
          chart_name: chart.chart_name,
          position: chart.position,
          previous_position: chart.previous_position,
          peak_position: chart.peak_position,
          weeks_on_chart: chart.weeks_on_chart,
          country: chart.country,
          platform: 'Apple Music',
          last_updated: chart.last_updated,
          trend: chart.trend as 'up' | 'down' | 'stable',
        })),
        ...chartsShazam.data.map(chart => ({
          id: chart.id,
          track_title: chart.track_title,
          chart_name: chart.chart_name,
          position: chart.position,
          previous_position: chart.previous_position,
          peak_position: chart.peak_position,
          weeks_on_chart: chart.weeks_on_chart,
          country: chart.country,
          platform: 'Shazam',
          last_updated: chart.last_updated,
          trend: chart.trend as 'up' | 'down' | 'stable',
        }))
      ],
      trending: [
        {
          id: '1',
          track_title: 'Track from TikTok trending',
          platform: 'TikTok',
          trending_score: tiktokTrending.data.trending_score,
          growth_percentage: tiktokTrending.data.growth_percentage,
          viral_moment: tiktokTrending.data.viral_moment,
          hashtags: tiktokTrending.data.hashtags,
          influencer_mentions: tiktokTrending.data.influencer_mentions,
          user_generated_content: tiktokTrending.data.user_generated_content,
          predicted_peak: tiktokTrending.data.predicted_peak,
          current_momentum: tiktokTrending.data.current_momentum as 'rising' | 'peak' | 'declining',
          regions: tiktokTrending.data.regions,
          age_group: tiktokTrending.data.age_group,
        }
      ],
    };

} catch (error) {
console.error('Error fetching Chartmetric songs data:', error);
throw new Error('Failed to fetch songs data from Chartmetric API');
}
