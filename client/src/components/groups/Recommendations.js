import React, { useContext, useEffect, useState } from "react";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@/components/Snackbar";
import { SpotifyContext } from "@/context/SpotifyContext";
import { SongContext } from "@/context/SongContext";

const Recommendations = () => {
  const { recommendations, fetchRecommendations } = useContext(SpotifyContext);
  const { songs } = useContext(SongContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artists = songs.map((song) => song.author);
      const urls = songs.map((song) => song.url);
      const { error: recommendationError } = await fetchRecommendations(
        artists,
        urls
      );
      if (recommendationError) {
        setError(
          `Error fetching recommendations:${recommendationError.message}`
        );
      }
    };

    fetchData();
  }, [songs]);

  console.log(recommendations);
  return (
    <Box sx={{ marginBottom: 2 }}>
      {recommendations?.length !== 0 && (
        <>
          <Typography
            variant="h4"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            Recommendations
          </Typography>
          {recommendations.map((track) => (
            <SpotifyEmbed
              key={track.id}
              link={track.external_urls.spotify}
              wide
            />
          ))}
        </>
      )}

      <Snackbar message={error} setMessage={setError} status="error" />
    </Box>
  );
};

export default Recommendations;
