import React, { createContext, useState } from "react";
import { fetchSpotifyRecommendations } from "@/functions";

export const SpotifyContext = createContext();

function SpotifyProvider({ children }) {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (artists, trackUrls) => {
    const { data, error } = await fetchSpotifyRecommendations(
      artists,
      trackUrls
    );
    if (error) {
      return { success: false, error };
    }

    setRecommendations(data.tracks);
    return { success: true };
  };

  return (
    <SpotifyContext.Provider value={{ recommendations, fetchRecommendations }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export default SpotifyProvider;
