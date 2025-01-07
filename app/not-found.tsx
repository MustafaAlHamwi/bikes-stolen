import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <span className="text-6xl">🔍</span>
          <h1 className="text-4xl font-bold text-blue-600 mt-4">404</h1>
          <p className="text-gray-600 mt-2">Page Not Found</p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-800">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex justify-center mt-8">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
