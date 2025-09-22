// Gunakan API_KEY dari environment variable
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

// Gunakan API_URL dari environment variable
const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;

// Fungsi untuk menambahkan API Key ke URL
const addApiKeyToUrl = (url) => {
  // Pastikan API_KEY ada sebelum menambahkan
  if (!API_KEY) {
    console.error("TMDB_API_KEY is not defined. Please set it in your .env file.");
    // Anda bisa memilih untuk melempar error di sini atau mengembalikan URL tanpa key
    // throw new Error("TMDB_API_KEY is not defined.");
    return url; 
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}api_key=${API_KEY}`;
};

// Fungsi untuk mendapatkan film berdasarkan ID
export async function getMovieById(movieId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${movieId}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch movie with ID: ${movieId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan ID
export async function getTvSeriesById(tvId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${tvId}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series with ID: ${tvId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan video (trailer) film
export async function getMovieVideos(movieId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${movieId}/videos`));
    if (!res.ok) {
      throw new Error(`Failed to fetch movie videos for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan video (trailer) serial TV
export async function getTvSeriesVideos(tvId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${tvId}/videos`));
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series videos for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) film
export async function getMovieCredits(movieId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${movieId}/credits`));
    if (!res.ok) {
      throw new Error(`Failed to fetch movie credits for ID: ${movieId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan film
export async function getMovieReviews(movieId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${movieId}/reviews`));
    if (!res.ok) {
      throw new Error(`Failed to fetch movie reviews for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) serial TV
export async function getTvSeriesCredits(tvId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${tvId}/credits`));
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series credits for ID: ${tvId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan serial TV
export async function getTvSeriesReviews(tvId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${tvId}/reviews`));
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series reviews for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film atau serial TV berdasarkan query
export async function searchMoviesAndTv(query, page = 1) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}`));
    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan kategori
export async function getMoviesByCategory(category, page = 1) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${category}?page=${page}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} movies`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan kategori
export async function getTvSeriesByCategory(category, page = 1) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${category}?page=${page}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} TV series`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film serupa
export async function getSimilarMovies(movieId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/movie/${movieId}/similar`));
    if (!res.ok) {
      throw new Error(`Failed to fetch similar movies for ID: ${movieId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV serupa
export async function getSimilarTvSeries(tvId) {
  try {
    // Tambahkan API key ke URL
    const res = await fetch(addApiKeyToUrl(`${API_URL}/tv/${tvId}/similar`));
    if (!res.ok) {
      throw new Error(`Failed to fetch similar TV series for ID: ${tvId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film berdasarkan judul
export const getMovieByTitle = async (title) => {
    try {
        // Tambahkan API key ke URL
        const response = await fetch(addApiKeyToUrl(`${API_URL}/search/movie?query=${encodeURIComponent(title)}`));
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        return data.results && data.results.length > 0 ? data.results : null;
    } catch (error) {
        console.error(`Error fetching movie by title: ${title}`, error);
        return null;
    }
};

// Fungsi untuk mencari serial TV berdasarkan judul
export const getTvSeriesByTitle = async (title) => {
  try {
    // Tambahkan API key ke URL
    const response = await fetch(addApiKeyToUrl(`${API_URL}/search/tv?query=${encodeURIComponent(title)}`));
    if (!response.ok) {
      throw new Error('Failed to fetch TV series details');
    }
    const data = await response.json();
    return data.results && data.results.length > 0 ? data.results : null;
  } catch (error) {
    console.error(`Error fetching TV series by title: ${title}`, error);
    return null;
  }
};

// Fungsi untuk mendapatkan film berdasarkan genre
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const res = await fetch(addApiKeyToUrl(`${API_URL}/discover/movie?with_genres=${genreId}&page=${page}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch movies for genre: ${genreId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan genre
export async function getTvSeriesByGenre(genreId, page = 1) {
  try {
    const res = await fetch(addApiKeyToUrl(`${API_URL}/discover/tv?with_genres=${genreId}&page=${page}`));
    if (!res.ok) {
      throw new Error(`Failed to fetch TV series for genre: ${genreId}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series for genre ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan semua genre film
export async function getMovieGenres() {
  try {
    const res = await fetch(addApiKeyToUrl(`${API_URL}/genre/movie/list`));
    if (!res.ok) {
      throw new Error('Failed to fetch movie genres');
    }
    const data = await res.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan semua genre TV series
export async function getTvSeriesGenres() {
  try {
    const res = await fetch(addApiKeyToUrl(`${API_URL}/genre/tv/list`));
    if (!res.ok) {
      throw new Error('Failed to fetch TV series genres');
    }
    const data = await res.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching TV series genres:', error);
    return [];
  }
}