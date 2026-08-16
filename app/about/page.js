import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <Link
          href="/"
          className="inline-block mb-10 text-gray-400 hover:text-red-500 transition"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">
          About Us
        </h1>

        <p className="text-gray-400 leading-7">
          Welcome to PhilmZone, your destination for
          discovering movies and exploring the world of cinema.
          Find movies, watch trailers, and enjoy a simple
          movie experience in one place.
        </p>

      </div>
    </main>
  );
}