"use client";

import { useState } from 'react';
import ArtistProfileHeader from '@/components/home/ArtistProfileHeader';
import ArtistNavigation from '@/components/home/ArtistNavigation';
import TabContent from '@/components/home/TabContent';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock artist data - replace with actual Chartmetric API call
  const artistData = {
    name: "Artista Ejemplo",
    image: "/api/placeholder/300/300",
    verifiedBadge: true,
    chartmetricRank: 1234,
    description: "Artista internacional con millones de reproducciones en todo el mundo",
    socialLinks: {
      spotify: "https://open.spotify.com/artist/ejemplo",
      instagram: "https://instagram.com/artistaejemplo",
      tiktok: "https://tiktok.com/@artistaejemplo",
      youtube: "https://youtube.com/c/artistaejemplo",
      twitter: "https://twitter.com/artistaejemplo"
    },
    followers: {
      spotify: 2500000,
      instagram: 1800000,
      tiktok: 950000,
      youtube: 1200000,
      twitter: 650000
    },
    streaming: {
      monthlyListeners: 8500000,
      playlistReach: 15000000,
      totalStreams: 850000000
    },
    charts: {
      spotifyGlobal: 45,
      spotifyUS: 32,
      appleMusic: 28,
      shazam: 15
    }
  };

  return (
    <div className="space-y-6">
      {/* Artist Profile Header */}
      <ArtistProfileHeader
        name={artistData.name}
        image={artistData.image}
        verifiedBadge={artistData.verifiedBadge}
        chartmetricRank={artistData.chartmetricRank}
        description={artistData.description}
        socialLinks={artistData.socialLinks}
      />

      {/* Navigation Tabs */}
      <ArtistNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <TabContent activeTab={activeTab} artistData={artistData} />

    </div>
  );
}