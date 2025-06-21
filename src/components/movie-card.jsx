import React from 'react'

const starIcon = 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/star.svg'
const noMovieImage = 'https://via.placeholder.com/500x750?text=No+Poster'

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const {
    title = 'Unknown Title',
    vote_average,
    poster_path,
    release_date,
    original_language = 'N/A'
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : noMovieImage;

  const year = release_date ? release_date.split('-')[0] : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className="bg-[#0f0d23] p-5 rounded-2xl shadow-inner shadow-[#cecefb]/10 hover:shadow-[#cecefb]/20 transition-shadow duration-300">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = noMovieImage;
          }}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-white font-bold text-base line-clamp-1">{title}</h3>

        <div className="mt-2 flex flex-row items-center flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <img 
              src={starIcon} 
              alt="Star Icon" 
              className="w-4 h-4"
              onError={(e) => {
                e.target.src = 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/star.svg';
              }}
            />
            <span className="font-bold text-white">{rating}</span>
          </div>

          <span className="text-[#9ca4ab]">•</span>
          <span className="text-[#9ca4ab] capitalize">{original_language}</span>

          <span className="text-[#9ca4ab]">•</span>
          <span className="text-[#9ca4ab]">{year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;