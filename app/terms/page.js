import Link from "next/link";

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="text-gray-400 leading-7">
          By using PhilmZone, you agree to use the platform
          responsibly and in accordance with applicable laws.
          We reserve the right to update or modify the service
          when necessary.
        </p>

      </div>
    </main>
  );
}