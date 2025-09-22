"use client";

import Link from 'next/link';
import { FaVideo, FaChevronDown } from 'react-icons/fa';
import SearchBar from '../SearchBar';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [isMovieHovered, setIsMovieHovered] = useState(false);
  const [isTvHovered, setIsTvHovered] = useState(false);

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch movie genres
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const movieData = await movieResponse.json();
        setMovieGenres(movieData.genres);

        // Fetch TV genres
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const tvData = await tvResponse.json();
        setTvGenres(tvData.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fungsi untuk membuat slug dari nama genre
  const createGenreSlug = (name) => {
    if (!name) return '';
    return name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-6">
          {/* PERUBAHAN DI SINI: href="/" -> href="/about" */}
          <Link href="/about" className="flex items-center space-x-2 text-white hover:text-yellow-500 transition-colors">
            <FaVideo className="text-2xl" />
            <span className="text-xl font-bold">Himovies</span>
          </Link>
          
          <Link href="/" className="text-white hover:text-green-500 transition-colors font-bold">
            Home
          </Link>
          
          {/* Movies dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsMovieHovered(true)}
            onMouseLeave={() => setIsMovieHovered(false)}
          >
            <button className="flex items-center text-white hover:text-blue-500 transition-colors font-bold space-x-1">
              <span>Movies</span>
              <FaChevronDown className="text-xs" />
            </button>
            <div className={`absolute left-0 mt-2 w-64 bg-slate-800 rounded-md shadow-lg py-2 z-50 transition-all duration-300 ${isMovieHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 font-semibold">
                Movie Genres
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {movieGenres.map(genre => (
                    <Link
                      key={genre.id}
                      href={`/movie/genre/${createGenreSlug(genre.name)}`}
                      className="block px-3 py-2 text-sm text-white hover:bg-blue-700 rounded-md transition-colors"
                      onClick={() => setIsMovieHovered(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* TV Series dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsTvHovered(true)}
            onMouseLeave={() => setIsTvHovered(false)}
          >
            <button className="flex items-center text-white hover:text-red-500 transition-colors font-bold space-x-1">
              <span>TV Series</span>
              <FaChevronDown className="text-xs" />
            </button>
            <div className={`absolute left-0 mt-2 w-64 bg-slate-800 rounded-md shadow-lg py-2 z-50 transition-all duration-300 ${isTvHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 font-semibold">
                TV Series Genres
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {tvGenres.map(genre => (
                    <Link
                      key={genre.id}
                      href={`/tv-series/genre/${createGenreSlug(genre.name)}`}
                      className="block px-3 py-2 text-sm text-white hover:bg-red-700 rounded-md transition-colors"
                      onClick={() => setIsTvHovered(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}