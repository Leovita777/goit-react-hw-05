import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "ddbba6d2de0871c3c628f5f163bf0320";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGJiYTZkMmRlMDg3MWMzYzYyOGY1ZjE2M2JmMDMyMCIsInN1YiI6IjY2MTZlNmM2OTAyMDEyMDE3YjJhZjFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QAPGuo3_R5yNoSsST-dle8ItvqCdX7oNaKkASwbfNCk";

axios.defaults.headers.common["Authorization"] = token;

export const fetchTrendingList = async () => {
  const response = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
  const { results } = response.data;
  return results;
};

export const fetchMoviesBySearch = async (query) => {
  const response = await axios.get(
    `/search/movie?query=${query}&api_key=${API_KEY}`
  );
  const { results } = response.data;
  return results;
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "Oops! Movie not found" };
    } else {
      return { error: "Oops! Something went wrong! Please reload the page!" };
    }
  }
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const { cast } = response.data;
  return cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  const { results } = response.data;
  return results;
};
