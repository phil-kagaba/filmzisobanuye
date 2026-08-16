"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardClient() {

  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");


  const loadMovies = async () => {

    try {

      const response =
        await fetch("/api/videos");

      const data =
        await response.json();

      setMovies(
        Array.isArray(data)
          ? data
          : data.files || []
      );

    } catch (error) {

      console.error(
        "Failed to load movies:",
        error
      );

    }
  };


  useEffect(() => {
    loadMovies();
  }, []);


  const handleUpload = async (e) => {

    e.preventDefault();

    if (!videoFile) {
      setMessage("Please select a video.");
      return;
    }

    setUploading(true);
    setMessage("Uploading movie...");


    try {

      const formData = new FormData();

      formData.append(
        "video",
        videoFile
      );

      if (snapshot) {
        formData.append(
          "snapshot",
          snapshot
        );
      }

      formData.append(
        "file_title",
        title
      );

      formData.append(
        "file_descr",
        description
      );

      formData.append(
        "file_public",
        "1"
      );


      const response =
        await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
          "Upload failed"
        );
      }


      setMessage(
        "Movie uploaded successfully!"
      );

      setTitle("");
      setDescription("");
      setVideoFile(null);
      setSnapshot(null);

      document
        .getElementById("video")
        .value = "";

      document
        .getElementById("snapshot")
        .value = "";

      await loadMovies();

    } catch (error) {

      console.error(error);

      setMessage(
        error.message ||
        "Upload failed"
      );

    } finally {

      setUploading(false);

    }
  };


  const handleDelete = async (fileCode) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this movie?"
      );

    if (!confirmed) return;


    try {

      const response =
        await fetch("/api/admin/delete", {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            file_code: fileCode,
          }),
        });


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.error ||
          "Delete failed"
        );
      }


      setMovies((previous) =>
        previous.filter(
          (movie) =>
            (movie.file_code ||
              movie.filecode) !== fileCode
        )
      );

      setMessage(
        "Movie deleted successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        error.message ||
        "Delete failed"
      );

    }
  };


  const handleLogout = async () => {

    await fetch(
      "/api/admin/logout",
      {
        method: "POST",
      }
    );

    window.location.href =
      "/AdminLoginPage";
  };


  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-400">
              Manage your movies
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>


        {message && (
          <div className="mb-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
            {message}
          </div>
        )}


        {/* UPLOAD */}

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Add Movie
          </h2>


          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >

            <div>

              <label className="block text-gray-300 mb-2">
                Movie Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                placeholder="Movie title"
              />

            </div>


            <div>

              <label className="block text-gray-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                rows="4"
                placeholder="Movie description"
              />

            </div>


            <div>

              <label className="block text-gray-300 mb-2">
                Video
              </label>

              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setVideoFile(
                    e.target.files?.[0]
                  )
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
                required
              />

            </div>


            <div>

              <label className="block text-gray-300 mb-2">
                Thumbnail / Snapshot
              </label>

              <input
                id="snapshot"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSnapshot(
                    e.target.files?.[0]
                  )
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
              />

            </div>


            <button
              type="submit"
              disabled={uploading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-700 px-6 py-3 rounded-lg font-bold"
            >
              {uploading
                ? "Uploading..."
                : "Upload Movie"}
            </button>

          </form>

        </section>


        {/* MOVIES */}

        <section>

          <h2 className="text-2xl font-bold mb-6">
            Uploaded Movies
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {movies.map((movie) => {

              const fileCode =
                movie.file_code ||
                movie.filecode;

              return (
                <div
                  key={fileCode}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
                >

                  <img
                    src={
                      movie.thumbnail ||
                      `https://cdn.streamhg.com/snapshots/${fileCode}.jpg`
                    }
                    alt={
                      movie.title ||
                      movie.filename
                    }
                    className="w-full h-48 object-cover"
                  />


                  <div className="p-4">

                    <h3 className="font-bold text-lg mb-2">
                      {movie.title ||
                        movie.filename ||
                        "Unknown movie"}
                    </h3>


                    <p className="text-gray-400 text-sm mb-4">
                      {movie.length
                        ? `${movie.length}s`
                        : ""}
                    </p>


                    <button
                      onClick={() =>
                        handleDelete(
                          fileCode
                        )
                      }
                      className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
                    >
                      Delete Movie
                    </button>

                  </div>

                </div>
              );

            })}

          </div>

        </section>

      </div>

    </main>
  );
}