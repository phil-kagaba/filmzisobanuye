'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { enhanceVideosWithTMDB } from '@/utils/tmdbApi';
import { Play, Star, Clock, Calendar, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const logo = '/logo.png';

const LogoLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin mb-6" />
      <img src={logo} alt="PhilmZone Logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full object-cover" />
    </div>
    <div className="text-center">
      <p className="text-white text-xl font-semibold mb-2">Loading please wait...</p>
    </div>
  </div>
);

const MovieCard = ({ video, size = 'medium', showNew = false }) => {
  const sizeClasses = { small: 'w-40 h-60', medium: 'w-48 h-72', large: 'w-56 h-80' };

  return (
    <Link href={`/video/${video.file_code || video.filecode}`} className={`${sizeClasses[size]} relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 flex-shrink-0`}>
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 h-full">
        <img
          src={video.enhancedPoster}
          alt={video.enhancedTitle}
          className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599856026-e27b5e10d4b4?w=500&h=750&fit=crop'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {showNew && <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow-lg">NEW</div>}
        {video.length && <div className="absolute top-2 left-2 bg-gray-900/80 text-white px-2 py-1 rounded text-xs font-semibold shadow-lg">{video.length}s</div>}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-red-500 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl"><Play className="h-8 w-8 text-white fill-white" /></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight">{video.enhancedTitle}</h3>
          {video.enhancedDescription && <p className="text-gray-300 text-sm mb-2 line-clamp-2">{video.enhancedDescription}</p>}
          <div className="flex items-center justify-between text-gray-300 text-sm">
            <div className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /><span>{video.enhancedRating?.toFixed(1) || '8.5'}</span></div>
            <div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{video.length ? `${video.length}s` : '120 min'}</span></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const HorizontalSlider = ({ title, subtitle, videos, showNew = false }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => scrollRef.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  if (!videos?.length) return null;

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-3xl font-bold text-white mb-1">{title}</h2>{subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}</div>
        <div className="flex space-x-2">
          <button onClick={() => scroll('left')} className="p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"><ChevronLeft className="h-6 w-6 text-white" /></button>
          <button onClick={() => scroll('right')} className="p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"><ChevronRight className="h-6 w-6 text-white" /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {videos.map((video) => <MovieCard key={video.file_code || video.filecode} video={video} size="medium" showNew={showNew} />)}
      </div>
    </div>
  );
};

const Hero = ({ videos }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const displayedVideos = videos?.slice(0, 8) || [];
  const currentVideo = displayedVideos[currentMovieIndex];

  useEffect(() => {
    if (displayedVideos.length <= 1) return;
    const interval = setInterval(() => setCurrentMovieIndex((prev) => (prev + 1) % displayedVideos.length), 3000);
    return () => clearInterval(interval);
  }, [displayedVideos.length]);

  if (!currentVideo) return null;

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img src={currentVideo.enhancedBackdrop || 'https://images.unsplash.com/photo-1489599856026-e27b5e10d4b4?w=1920&h=1080&fit=crop'} alt={currentVideo.enhancedTitle} className="w-full h-full object-cover transition-opacity duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl transition-all duration-500 ease-in-out">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">{currentVideo.enhancedTitle}</h1>
            <div className="flex items-center space-x-6 mb-6 text-gray-300">
              <div className="flex items-center space-x-1"><Star className="h-5 w-5 text-yellow-400 fill-yellow-400" /><span className="text-lg font-semibold">{currentVideo.enhancedRating?.toFixed(1) || '8.5'}</span></div>
              <div className="flex items-center space-x-1"><Calendar className="h-5 w-5" /><span>{currentVideo.tmdb?.releaseDate ? new Date(currentVideo.tmdb.releaseDate).getFullYear() : '2024'}</span></div>
              <div className="flex items-center space-x-1"><Clock className="h-5 w-5" /><span>{currentVideo.length ? `${currentVideo.length}s` : '120 min'}</span></div>
              <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">HD</div>
            </div>
            {currentVideo.enhancedDescription && <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">{currentVideo.enhancedDescription}</p>}
            <div className="flex space-x-4">
              <Link href={`/video/${currentVideo.file_code || currentVideo.filecode}`} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"><Play className="h-5 w-5 fill-white" /><span>Watch Now</span></Link>
              <button className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"><Film className="h-5 w-5" /><span>More Info</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enhancingVideos, setEnhancingVideos] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchAndEnhanceVideos = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/videos`);
        const data = res.data || [];
        setEnhancingVideos(true);
        const enhancedData = await enhanceVideosWithTMDB(data);
        setVideos(enhancedData);
        setFilteredVideos(enhancedData);
      } catch {
        setError('Check your internet or the server is down');
      } finally {
        setLoading(false);
        setEnhancingVideos(false);
      }
    };
    fetchAndEnhanceVideos();
  }, []);

  const handleSearch = (term) => {
    const results = videos.filter((video) => (video.enhancedTitle || '').toLowerCase().includes(term.toLowerCase()));
    setSearchResults(results);
    setFilteredVideos(term ? results : videos);
    setVisibleCount(20);
  };

  if (loading || enhancingVideos) {
    return <LogoLoader />;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-center"><Film className="h-16 w-16 text-red-500 mx-auto mb-4" /><p className="text-2xl text-red-500 font-semibold">{error}</p><p className="text-gray-400 mt-2">Please try again later</p></div></div>;
  }

  const recentVideos = videos.slice(0, 12);
  const newReleases = videos.slice(12, 24);

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-16 sm:pt-16">
        <Header onSearch={handleSearch} searchResults={searchResults} />
        {videos.length > 0 && <Hero videos={videos} />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {newReleases.length > 0 && <HorizontalSlider title="New Releases" subtitle="New Leased" videos={newReleases} showNew />}
          {recentVideos.length > 0 && <HorizontalSlider title="Recently Uploaded" subtitle="Fresh content just for you" videos={recentVideos} />}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-3xl font-bold text-white mb-1">All Movies</h2><p className="text-gray-400 text-lg">Browse our complete collection</p></div></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {filteredVideos.length === 0 ? <div className="col-span-full text-center py-20"><Film className="h-16 w-16 text-gray-600 mx-auto mb-4" /><p className="text-white text-xl">Sorry, Nta filime ihari.</p><p className="text-gray-400 mt-2">No movies found matching your search</p></div> : filteredVideos.slice(0, visibleCount).map((video) => <MovieCard key={video.file_code || video.filecode} video={video} size="small" />)}
            </div>
            {filteredVideos.length > visibleCount && <div className="mt-8 text-center"><button onClick={() => setVisibleCount((prev) => prev + 20)} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300">Show More</button></div>}
            {visibleCount >= filteredVideos.length && filteredVideos.length > 20 && <div className="mt-4 text-center"><button onClick={() => setVisibleCount(20)} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition duration-300">Show Less</button></div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
