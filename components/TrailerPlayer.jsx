'use client';

const TrailerPlayer = ({ youtubeKey, onClose }) => {
  if (!youtubeKey) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-[#111] rounded-lg shadow-lg p-0 w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full px-3 py-1 text-lg font-bold shadow"
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="600"
            src={`https://www.youtube.com/embed/${youtubeKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-b-lg w-full h-[600px] max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerPlayer;
