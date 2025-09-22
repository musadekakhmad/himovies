import { notFound } from 'next/navigation';
import {
  getMoviesByGenre,
  getMovieGenres,
} from '../../../../lib/api';
import MovieList from '../../../../components/MovieList';
import Link from 'next/link';
import LoadMoreButton from './LoadMoreButton';

// Utility untuk membuat slug dari nama genre yang SEO-Friendly.
const createGenreSlug = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/&/g, 'and') // Ganti & dengan 'and'
    .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter khusus
    .replace(/\s+/g, '-') // Ganti spasi dengan dash
    .replace(/-+/g, '-') // Hapus multiple dash berturut-turut
    .trim();
};

// Utility untuk decode URL parameter dengan benar
const decodeUrlSlug = (slug) => {
  if (!slug) return '';
  // Decode URI component terlebih dahulu (mengubah %26 kembali menjadi &)
  const decoded = decodeURIComponent(slug);
  // Kemudian proses dengan createGenreSlug untuk konsistensi
  return createGenreSlug(decoded);
};

// Utility untuk mendapatkan nama asli genre dari slug
const getGenreNameFromSlug = (slug, genres) => {
  // Decode slug terlebih dahulu
  const decodedSlug = decodeUrlSlug(slug);
  
  // Cari genre yang matching
  const genre = genres.find(g => createGenreSlug(g.name) === decodedSlug);
  
  return genre ? genre.name : slug.split('-')
    .map(word => {
      // Kembalikan 'and' menjadi '&' untuk tampilan yang lebih natural
      if (word === 'and') return '&';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/\s&\s/g, ' & '); // Format & dengan spasi
};

export async function generateMetadata({ params }) {
  const { genreName } = await params;
  
  const genres = await getMovieGenres();
  const genreTitle = getGenreNameFromSlug(genreName, genres);
  
  const pageUrl = `https://himovies-us.netlify.app/movie/genre/${genreName}`;
  const imageUrl = 'https://live.staticflickr.com/65535/54798923667_dc8a442f8d_b.jpg';

  return {
    title: `Himovies - ${genreTitle} Movies`,
    description: `Find and watch the best ${genreTitle} movies for free on Himovies.`,
    openGraph: {
      title: `Himovies - ${genreTitle} Movies`,
      description: `Find and watch the best ${genreTitle} movies for free on Himovies.`,
      url: pageUrl,
      siteName: 'Himovies',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${genreTitle} genre movie poster`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WatchStream123',
      creator: '@WatchStream123',
      title: `Himovies - ${genreTitle} Movies`,
      description: `Find and watch the best ${genreTitle} movies for free on Himovies.`,
      images: [imageUrl],
    },
    other: {
      'fb:app_id': '100074345305108',
    },
  };
}

export default async function MoviesByGenrePage({ params }) {
  const { genreName } = await params;
  
  const genres = await getMovieGenres();
  
  // Decode URL slug dengan benar
  const processedSlug = decodeUrlSlug(genreName);
  
  console.log('Original URL Slug:', genreName);
  console.log('Processed Slug:', processedSlug);
  console.log('Available genre slugs:', genres.map(g => createGenreSlug(g.name)));
  
  // Mencari genre berdasarkan slug yang sudah diproses
  const genre = genres.find(g => createGenreSlug(g.name) === processedSlug);
  
  const genreId = genre?.id;
  const genreTitle = getGenreNameFromSlug(genreName, genres);

  if (!genreId) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white bg-slate-900 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-400 mb-4">Genre not found.</h1>
        <p className="text-lg">The requested movie genre "{genreName}" could not be found.</p>
        <p className="text-sm text-gray-400 mt-2">
          Processed slug: {processedSlug}
        </p>
        <Link href="/">
          <button className="mt-6 bg-blue-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  // Ambil data halaman pertama
  const initialMovies = await getMoviesByGenre(genreId, 1);

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-900 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
        {genreTitle} Movies
      </h1>
      
      {initialMovies && initialMovies.length > 0 ? (
        <>
          <MovieList movies={initialMovies} />
          {/* Komponen Load More yang terpisah */}
          <LoadMoreButton 
            genreId={genreId} 
            initialPage={1}
          />
        </>
      ) : (
        <p className="text-center text-white">No movies available in this genre.</p>
      )}
    </div>
  );
}