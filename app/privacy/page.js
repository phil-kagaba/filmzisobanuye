import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <p className="text-gray-400 leading-7">
          PhilmZone respects your privacy. We aim to collect
          only the information necessary to provide and improve
          our services. We do not intend to misuse your personal
          information.
        </p>

      </div>
    </main>
  );
}