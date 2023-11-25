import axios from "axios";

const getSpotifyAccessToken = async () => {
  // Your Client Credentials
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      },
    }
  );

  return data.access_token;
};

export const searchSpotify = async (query, type) => {
  const accessToken = await getSpotifyAccessToken();
  const encodedQuery = encodeURIComponent(query);

  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const queryId = data[type + "s"].items[0].id;
    const queryGenre = data[type + "s"].items[0].genres[0];

    return {
      data: {
        id: queryId,
        genre: queryGenre,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const fetchSpotifyRecommendations = async (artists, trackUrls) => {
  const accessToken = await getSpotifyAccessToken();

  // Get Spotify IDs and genres for artists
  const artistResults = await Promise.all(
    artists.map((name) => searchSpotify(name, "artist"))
  );

  // Extract artist IDs and genres
  const artistIds = [];
  const genres = new Set();
  artistResults.forEach((result) => {
    if (result.data) {
      artistIds.push(result.data.id);
      genres.add(result.data.genre);
    }
  });

  const trackIds = trackUrls
    .filter((trackUrl) => trackUrl && trackUrl.trim() !== "")
    .map((trackUrl) => trackUrl.split("track/")[1].split("?")[0]);

  // Fetch recommendations using these IDs
  const seedArtists = artistIds
    .slice(0, 5)
    .filter((id) => id)
    .join(",");
  const seedTracks = trackIds
    .filter((id) => id)
    .slice(0, 5)
    .join(",");
  const seedGenres = Array.from(genres)
    .filter((id) => id)
    .slice(0, 5)
    .join(",");

  // Constructing the URL with query parameters
  const baseUrl = "https://api.spotify.com/v1/recommendations";

  const queryParams = new URLSearchParams({ limit: 5 });
  // if (seedGenres) queryParams.set("seed_genres", seedGenres); // TODO: fix genres with spaces
  if (seedArtists) queryParams.set("seed_artists", seedArtists);
  if (seedTracks) queryParams.set("seed_tracks", seedTracks);

  // Ensure at least one seed value is provided
  if (!seedGenres && !seedArtists && !seedTracks) {
    console.error("No seed values provided for Spotify recommendations");
    return { data: null, error: "No seed values provided" };
  }

  try {
    const { data } = await axios.get(`${baseUrl}?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching Spotify recommendations:", error);
    return { data: null, error: error.message };
  }
};
