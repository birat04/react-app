import { useEffect, useState } from 'react'
import Search from './components/search.jsx'
import Spinner from './components/spinner.jsx'
import MovieCard from './components/movie-card.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'

const heroImage = 'https://via.placeholder.com/1200x400/0f0d23/ffffff?text=Movie+Search'
const fallbackImage = 'https://via.placeholder.com/500x750/0f0d23/ffffff?text=No+Image'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  console.error('TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env file');
}

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
    setPage(1);
  }, 500, [searchTerm]);

  const fetchMovies = async (query = '', pageNum = 1) => {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      if (!API_KEY) {
        throw new Error('TMDB API key is missing');
      }

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&page=${pageNum}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${pageNum}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.results)) {
        throw new Error('Invalid movie data received');
      }

      setMovieList(pageNum === 1 ? data.results : [...movieList, ...data.results]);
      setTotalPages(data.total_pages);

      if (query && data.results.length > 0 && pageNum === 1) {
        try {
          await updateSearchCount(query, data.results[0]);
        } catch (error) {
          console.error('Error updating search count:', error);
        }
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(error.message || 'Error fetching movies. Please try again later.');
      if (pageNum === 1) {
        setMovieList([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    }
  };

  const loadMore = () => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(debouncedSearchTerm, nextPage);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) fetchMovies(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main className="min-h-screen bg-[#030014] relative">
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-center bg-cover opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <img 
            src={heroImage} 
            alt="Hero Banner" 
            className="w-full max-w-3xl h-auto rounded-2xl shadow-lg mx-auto mb-8"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x400?text=Movie+Search';
            }}
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Find <span className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent">Movies</span> You'll Love
          </h1>

          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            isLoading={isLoading}
          />
        </header>

        {trendingMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Trending Movies</h2>
            <div className="flex overflow-x-auto gap-5 hide-scrollbar">
              {trendingMovies.map((movie, index) => (
                <div key={movie.$id || index} className="min-w-[230px] flex flex-row items-center">
                  <p className="text-[190px] font-bebas text-white -webkit-text-stroke-2 -webkit-text-stroke-[#cecefb]/50">
                    {index + 1}
                  </p>
                  <img 
                    src={movie.poster_url || fallbackImage} 
                    alt={movie.title || 'Movie poster'} 
                    className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-9">
          <h2 className="text-2xl font-bold text-white">All Movies</h2>

          {isLoading && page === 1 ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500 text-center py-8">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No movies found. Try a different search term.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              {page < totalPages && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
