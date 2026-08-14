'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = ({ onSearch, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowDropdown(term.length > 0);
    if (onSearch) onSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowDropdown(false);
    if (onSearch) onSearch('');
  };

  const getThumbnail = (movie) => {
    return movie.image || movie.thumbnail || movie.thumb || 'https://via.placeholder.com/80x45?text=No+Image';
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm text-white px-4 py-3 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold whitespace-nowrap">AgasosabuyefilmZone</span>
        </Link>

        <nav className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm sm:text-base">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/trailer" className="hover:text-blue-400 transition">Trailers</Link>
          <a href="#movies" className="hover:text-blue-400 transition">Movies</a>
          <a href="#shows" className="hover:text-blue-400 transition">TV Shows</a>
          <a href="#categories" className="hover:text-blue-400 transition">Categories</a>
        </nav>

        <div className="relative w-full sm:w-auto flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search movies..."
            className="w-full px-4 py-2 border border-blue-600 bg-[#111] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 pr-10"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              style={{ fontSize: '18px', lineHeight: 1 }}
            >
              &#x2715;
            </button>
          )}

          {showDropdown && (
            <ul className="absolute top-full left-0 w-full bg-[#1c1f22] border border-blue-500 rounded-md mt-1 max-h-60 overflow-y-auto z-50">
              {searchResults?.length > 0 ? (
                searchResults.map((movie) => (
                  <li key={movie.file_code || movie.filecode}>
                    <Link
                      href={`/video/${movie.file_code || movie.filecode}`}
                      className="flex items-center gap-2 px-2 py-2 hover:bg-blue-600 transition"
                    >
                      <img src={getThumbnail(movie)} alt={movie.title || movie.filename} className="w-10 h-6 object-cover rounded" />
                      <span className="text-sm truncate text-white">{movie.title || movie.filename}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400 text-sm">No movies found.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
