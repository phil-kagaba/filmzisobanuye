
import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const TMDB_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL ||
  "https://api.themoviedb.org/3";

const TMDB_IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";


// ========================================
// SEARCH MOVIE
// ========================================

export const searchMovieByTitle = async (title) => {
  try {
    if (!title) {
      console.log("TMDB: No title provided");
      return null;
    }

    if (!TMDB_API_KEY) {
      console.error("TMDB API KEY IS MISSING");
      return null;
    }

    // Remove video extensions
    const cleanTitle = title
      .replace(/\.(mp4|avi|mkv|mov|wmv|flv|webm)$/i, "")
      .trim();

    console.log("TMDB searching:", cleanTitle);

    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie`,
      {
        params: {
          api_key: TMDB_API_KEY,
          query: cleanTitle,
          language: "en-US",
        },
      }
    );

    console.log(
      "TMDB results:",
      response.data.results
    );

    if (
      !response.data.results ||
      response.data.results.length === 0
    ) {
      console.log(
        "TMDB: Movie not found:",
        cleanTitle
      );

      return null;
    }

    const movie = response.data.results[0];

    return {
      title: movie.title,

      description:
        movie.overview || "",

      poster: movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : null,

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null,

      rating:
        movie.vote_average || 0,

      releaseDate:
        movie.release_date || "",

      tmdbId:
        movie.id,
    };

  } catch (error) {
    console.error(
      "TMDB SEARCH ERROR:",
      error.response?.data ||
        error.message
    );

    return null;
  }
};


// ========================================
// GET TRAILER
// ========================================

export const getMovieTrailer = async (tmdbId) => {
  try {
    if (!tmdbId || !TMDB_API_KEY) {
      return null;
    }

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${tmdbId}/videos`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
        },
      }
    );

    const videos =
      response.data?.results || [];

    const trailer = videos.find(
      (video) =>
        video.site === "YouTube" &&
        (
          video.type === "Trailer" ||
          video.type === "Teaser"
        )
    );

    return trailer
      ? trailer.key
      : null;

  } catch (error) {
    console.error(
      "TMDB TRAILER ERROR:",
      error.response?.data ||
        error.message
    );

    return null;
  }
};


// ========================================
// ENHANCE STREAMHG VIDEOS
// ========================================

export const enhanceVideosWithTMDB = async (
  videos
) => {

  if (!Array.isArray(videos)) {
    return [];
  }

  console.log(
    "Enhancing",
    videos.length,
    "videos with TMDB..."
  );

  const enhancedVideos =
    await Promise.all(
      videos.map(async (video) => {

        const title =
          video.title ||
          video.filename ||
          "";

        const tmdbData =
          await searchMovieByTitle(title);

        return {
          ...video,

          tmdb: tmdbData,

          enhancedTitle:
            tmdbData?.title ||
            title,

          enhancedDescription:
            tmdbData?.description ||
            video.file_descr ||
            "",

          enhancedPoster:
            tmdbData?.poster ||
            video.thumbnail ||
            video.screenshot ||
            null,

          enhancedBackdrop:
            tmdbData?.backdrop ||
            video.thumbnail ||
            video.screenshot ||
            null,

          enhancedRating:
            tmdbData?.rating ||
            0,

          enhancedReleaseDate:
            tmdbData?.releaseDate ||
            "",
        };
      })
    );

  console.log(
    "TMDB enhancement complete:",
    enhancedVideos
  );

  return enhancedVideos;
};