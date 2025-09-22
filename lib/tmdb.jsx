// lib/tmdb.js

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getAllMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { results: [] };
  }
}

export async function getAllTVSeries(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV series');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching TV series:', error);
    return { results: [] };
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function getTVSeriesDetails(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV series details');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching TV series details:', error);
    return null;
  }
}