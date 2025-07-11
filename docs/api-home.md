// ENDPOINTS OFICIALES DE LA API DE CHARTMETRIC PARA ARTISTAS
// URLs exactas según la documentación oficial en pycmc.docs.musicfox.io

const cmid = 2316; // Ejemplo: Chartmetric ID de Rihanna
const apiKey = "YOUR_CHARTMETRIC_API_KEY";
const baseURL = "https://api.chartmetric.com";

const headers = {
'Authorization': `Bearer ${apiKey}`,
'Content-Type': 'application/json'
};

try {
// 1. Información básica y metadata del artista
const artistInfo = await axios.get(`${baseURL}/api/artist/${cmid}`, { headers });
// Proporciona: id, name, image_url, verified, description, genre, country

    // 2. IDs del artista en diferentes plataformas
    const artistIds = await axios.get(`${baseURL}/api/artist/:type/${cmid}/get-ids`, { headers });
    // Proporciona: spotify_id, apple_id, youtube_id, instagram_id, etc.

    // 3. Métricas de fans y estadísticas por plataforma
    const spotifyStats = await axios.get(`${baseURL}/api/artist/${cmid}/stat/spotify`, { headers });
    // Proporciona: followers, monthly_listeners, total_streams

    const instagramStats = await axios.get(`${baseURL}/api/artist/${cmid}/stat/instagram`, { headers });
    // Proporciona: followers, engagement_rate

    const tiktokStats = await axios.get(`${baseURL}/api/artist/${cmid}/stat/tiktok`, { headers });
    // Proporciona: followers, likes, views

    const youtubeStats = await axios.get(`${baseURL}/api/artist/${cmid}/stat/youtube`, { headers });
    // Proporciona: subscribers, views, videos

    const twitterStats = await axios.get(`${baseURL}/api/artist/${cmid}/stat/twitter`, { headers });
    // Proporciona: followers, tweets

    // 4. Posiciones en charts
    const chartsSpotify = await axios.get(`${baseURL}/api/artist/${cmid}/spotify/charts`, { headers });
    // Proporciona: spotify chart positions

    const chartsApple = await axios.get(`${baseURL}/api/artist/${cmid}/applemusic/charts`, { headers });
    // Proporciona: apple music chart positions

    const chartsShazam = await axios.get(`${baseURL}/api/artist/${cmid}/shazam/charts`, { headers });
    // Proporciona: shazam chart positions

    // 5. Playlists donde aparece el artista
    const playlistsSpotify = await axios.get(`${baseURL}/api/artist/${cmid}/spotify/current/playlists`, { headers });
    // Proporciona: playlist appearances en Spotify

    const playlistsApple = await axios.get(`${baseURL}/api/artist/${cmid}/applemusic/current/playlists`, { headers });
    // Proporciona: playlist appearances en Apple Music

    // 6. Datos de audiencia y demografía
    const whereListening = await axios.get(`${baseURL}/api/artist/${cmid}/where-people-listen`, { headers });
    // Proporciona: geographic data de donde escuchan los fans

    const tiktokAudience = await axios.get(`${baseURL}/api/artist/${cmid}/tiktok-audience-stats`, { headers });
    // Proporciona: demographic data de audiencia en TikTok

    // 7. Artistas relacionados
    const relatedArtists = await axios.get(`${baseURL}/api/artist/${cmid}/relatedartists`, { headers });
    // Proporciona: lista de artistas similares

    // 8. Cross-Platform Performance (CPP)
    const cppData = await axios.get(`${baseURL}/api/artist/${cmid}/cpp`, { headers });
    // Proporciona: cm_artist_rank, performance score

    // 9. URLs de redes sociales y streaming
    const socialUrls = await axios.get(`${baseURL}/api/artist/${cmid}/urls`, { headers });
    // Proporciona: spotify_url, instagram_url, tiktok_url, youtube_url, twitter_url

    // Construir la estructura ChartmetricArtistResponse
    return {
      id: artistInfo.data.id,
      name: artistInfo.data.name,
      image_url: artistInfo.data.image_url,
      chartmetric_id: cmid,
      verified: artistInfo.data.verified,
      cm_artist_rank: cppData.data.cm_artist_rank,
      description: artistInfo.data.description,
      genre: artistInfo.data.genre,
      country: artistInfo.data.country,
      social_links: {
        spotify: socialUrls.data.spotify,
        instagram: socialUrls.data.instagram,
        tiktok: socialUrls.data.tiktok,
        youtube: socialUrls.data.youtube,
        twitter: socialUrls.data.twitter,
      },
      followers: {
        spotify: spotifyStats.data.followers,
        instagram: instagramStats.data.followers,
        tiktok: tiktokStats.data.followers,
        youtube: youtubeStats.data.subscribers,
        twitter: twitterStats.data.followers,
      },
      streaming_metrics: {
        monthly_listeners: spotifyStats.data.monthly_listeners,
        playlist_reach: playlistsSpotify.data.total_reach,
        total_streams: spotifyStats.data.total_streams,
      },
      chart_positions: {
        spotify_global: chartsSpotify.data.spotify_global,
        spotify_us: chartsSpotify.data.spotify_us,
        apple_music: chartsApple.data.apple_music,
        shazam: chartsShazam.data.shazam,
      },
    };

} catch (error) {
console.error('Error fetching Chartmetric data:', error);
throw new Error('Failed to fetch artist data from Chartmetric API');
}
