import Link from "next/link";

export default function HelpPage() {
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
          Help Center
        </h1>

        <p className="text-gray-400 leading-7 mb-4">
          Need help using PhilmZone?
        </p>

        <p className="text-gray-400 leading-7">
          If you have problems finding a movie, playing a video,
          or using any feature of the website, please contact us
          for assistance.
        </p>

      </div>
    </main>
  );
}