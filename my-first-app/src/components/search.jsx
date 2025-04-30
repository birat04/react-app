import React from 'react'

const Search = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="Search for movies..."
          className="w-full px-6 py-4 bg-[#0f0d23] text-white rounded-2xl border border-[#cecefb]/20 focus:border-[#cecefb]/40 focus:outline-none transition-colors duration-300 placeholder:text-[#9ca4ab]"
        />
        <button
          onClick={handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#cecefb] text-[#0f0d23] px-4 py-2 rounded-xl font-semibold hover:bg-[#cecefb]/90 transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;