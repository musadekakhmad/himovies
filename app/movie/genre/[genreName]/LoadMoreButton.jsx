'use client';

import { useState } from 'react';
import { getMoviesByGenre } from '../../../../lib/api';
import MovieList from '../../../../components/MovieList';

export default function LoadMoreButton({ genreId, initialPage }) {
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const nextMovies = await getMoviesByGenre(genreId, nextPage);
      
      if (nextMovies && nextMovies.length > 0) {
        setMovies(prev => [...prev, ...nextMovies]);
        setPage(nextPage);
        
        // Scroll ke elemen terakhir yang baru dimuat
        setTimeout(() => {
          const elements = document.querySelectorAll('.movie-item');
          if (elements.length > 0) {
            elements[elements.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Render movies tambahan yang telah dimuat */}
      {movies.length > 0 && <MovieList movies={movies} />}
      
      {/* Tombol Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="load-more-button px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Load More Movies'}
          </button>
        </div>
      )}
    </>
  );
}