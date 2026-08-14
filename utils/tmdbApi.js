import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getMovieTrailer = async (tmdbId) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    if (response.data.results && response.data.results.length > 0) {
      const trailer = response.data.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );

      return trailer ? trailer.key : null;
    }

    return null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};

export const searchMovieByTitle = async (title) => {
  try {
    const cleanTitle = title.replace(
      /\.(mp4|avi|mkv|mov|wmv|flv|webm)$/i,
      ""
    );

    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        cleanTitle
      )}`
    );

    if (response.data.results && response.data.results.length > 0) {
      const movie = response.data.results[0];

      return {
        title: movie.title,
        description: movie.overview,
        poster: movie.poster_path
          ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
          : null,
        backdrop: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          : null,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        tmdbId: movie.id,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return null;
  }
};

export const enhanceVideosWithTMDB = async (videos) => {
  const enhancedVideos = await Promise.all(
    videos.map(async (video) => {
      const tmdbData = await searchMovieByTitle(
        video.title || video.filename
      );

      return {
        ...video,
        tmdb: tmdbData,
        enhancedTitle:
          tmdbData?.title || video.title || video.filename,
        enhancedDescription:
          tmdbData?.description || video.file_descr || "",
        enhancedPoster:
          tmdbData?.poster ||
          video.thumbnail ||
          video.screenshot ||
          `https://cdn.streamhg.com/snapshots/${
            video.file_code || video.filecode
          }.jpg`,
        enhancedBackdrop:
          tmdbData?.backdrop ||
          video.thumbnail ||
          video.screenshot ||
          `https://cdn.streamhg.com/snapshots/${
            video.file_code || video.filecode
          }.jpg`,
        enhancedRating: tmdbData?.rating || 8.5,
      };
    })
  );

  return enhancedVideos;
};