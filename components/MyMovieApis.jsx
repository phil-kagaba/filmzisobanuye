'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import TrailerPlayer from './TrailerPlayer';
import Header from './Header';

const LogoLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-black">
    <span className="inline-flex items-center justify-center rounded-full border-4 border-blue-500 border-t-white animate-spin h-20 w-20">
      <img src="/logo.png" alt="PhilmZone Logo" className="h-16 w-16 rounded-full object-cover" />
    </span>
  </div>
);

const MyMovieApis = () => {
  const [mymovie, setMymovie] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loadingVideoId, setLoadingVideoId] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;
    const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    const gettingData = async () => {
      try {
        const response = await axios.get(`${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        setMymovie(response.data.results);
        setFiltered(response.data.results);
      } catch (err) {
        console.error('An error occurred:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    gettingData();
  }, []);

  useEffect(() => {
    if (!search) setFiltered(mymovie);
    else setFiltered(mymovie.filter((movie) => (movie.title || movie.name || '').toLowerCase().includes(search.toLowerCase())));
  }, [search, mymovie]);

  const handleOpenVideo = async (movie) => {
    setLoadingVideoId(movie.id);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY;
    const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
    try {
      const res = await axios.get(`${baseURL}/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`);
      const trailer = res.data.results.find((vid) => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser'));
      if (trailer) setTrailerKey(trailer.key);
      else alert('Nta trailer Yiyi Movie Ihari.');
    } catch {
      alert('Failed to fetch video.');
    }
    setLoadingVideoId(null);
  };

  if (loading) return <LogoLoader />;

  return (
    <>
      <Header />
      <section className="bg-[#0D0D0D] py-10 px-4 min-h-screen">
        <div><Link href="/" className="text-blue-600 underline mb-4 inline-block">← Subira Ahabanza</Link></div>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Recent Movie Trailers</h2>
        <div className="flex justify-center mb-8">
          <input type="text" placeholder="Search Movie Trailer bro..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md px-4 py-2 border border-blue-600 bg-[#111] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400" />
        </div>
        {error ? <p className="text-red-500 text-center">Yoo! Habayeho ikibazo.</p> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((movie) => (
            <div key={movie.id} className="bg-[#111] shadow rounded overflow-hidden hover:shadow-lg transition duration-300 flex flex-col border border-blue-600" style={{ minWidth: 0 }}>
              <div className="relative w-full aspect-[2/3] bg-black" style={{ height: '360px' }}>
                <img className="absolute inset-0 w-full h-full object-contain object-center" src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=Nta+Ifoto'} alt={movie.title || movie.name} />
              </div>
              <div className="p-2 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-white truncate mb-1">{movie.title || movie.name}</h3>
                <button onClick={() => handleOpenVideo(movie)} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition" disabled={loadingVideoId === movie.id}>{loadingVideoId === movie.id ? 'Wait a min...' : 'Watch Trailer'}</button>
              </div>
            </div>
          ))}
        </div>}
        <TrailerPlayer youtubeKey={trailerKey} onClose={() => setTrailerKey(null)} />
      </section>
    </>
  );
};

export default MyMovieApis;
