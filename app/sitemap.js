import { getAllMovies, getAllTVSeries } from '../lib/tmdb';

const BASE_URL = 'https://himovies-us.netlify.app';

export default async function sitemap() {
  try {
    // Fetch movies and TV series data
    const [movies, tvSeries] = await Promise.all([
      getAllMovies(1), // Get first page of movies
      getAllTVSeries(1) // Get first page of TV series
    ]);

    // Generate URLs for movies
    const movieUrls = movies.results.map(movie => ({
      url: `${BASE_URL}/movie/${movie.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    // Generate URLs for TV series
    const tvSeriesUrls = tvSeries.results.map(series => ({
      url: `${BASE_URL}/tv-series/${series.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    // Static pages
    const staticPages = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/movies`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/tv-series`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/search`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];

    return [...staticPages, ...movieUrls, ...tvSeriesUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to just static pages if there's an error
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${BASE_URL}/movies`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/tv-series`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}