"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <span className="text-6xl">🚲</span>
          <h1 className="text-4xl font-bold text-red-600 mt-4">Oops!</h1>
          <p className="text-gray-600 mt-2">
            Something went wrong with our bikes
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-800">
            {error.message || "An unexpected error occurred"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Error Code: {error.digest}
        </div>
      </div>
    </div>
  );
}
