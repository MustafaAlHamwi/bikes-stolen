"use client";
import { useEffect, useState } from "react";
import BikeCard from "./components/BikeCard";

interface Bike {
  id: number;
  title: string;
  frame_model: string;
  manufacturer_name: string;
  year: number;
  frame_colors: string[];
  serial: string;
  status: string;
  stolen: boolean;
  date_stolen: number | null;
  stolen_location: string | null;
  location_found: string | null;
  description: string | null;
  large_img: string | null;
  url: string;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}

export default function Home() {
  const [data, setData] = useState<Bike[] | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCases, setTotalCases] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://bikeindex.org/api/v3/search`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result.bikes);
        setTotalCases(result.bikes.length);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const filteredBikes = data?.filter((bike) => {
    const matchesTitle = bike.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "stolen" && bike.stolen) ||
      (statusFilter === "found" && !bike.stolen);

    const stolenDate = bike.date_stolen
      ? new Date(bike.date_stolen * 1000)
      : null;
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    const matchesDateRange =
      (!startDate || (stolenDate && stolenDate >= startDate)) &&
      (!endDate || (stolenDate && stolenDate <= endDate));

    return matchesTitle && matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(totalCases / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBikes = filteredBikes?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header and Search Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Munich Bike Thefts</h1>
        <p className="text-gray-600">Total cases: {totalCases}</p>
      </div>

      {/* Search and Status Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="stolen">Stolen</option>
            <option value="found">Found</option>
          </select>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="border rounded-lg px-4 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Content Area with Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid gap-6 mb-8">
          {paginatedBikes?.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span>
              Page {currentPage} of {isNaN(totalPages) ? 1 : totalPages}
            </span>
            <span className="text-gray-500">({totalCases || 0} total)</span>
          </div>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
