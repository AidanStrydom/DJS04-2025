import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Search, sort, and filter functionality
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Pagination state
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // Combined filter and sort logic
  const getFilteredAndSortedPodcasts = () => {
    let filtered = [...podcasts];

    // 1. Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter((podcast) =>
        podcast.genres.includes(parseInt(selectedGenre))
      );
    }

    // 3. Sort
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "most-recent":
          return new Date(b.updated) - new Date(a.updated);
        case "oldest":
          return new Date(a.updated) - new Date(b.updated);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredPodcasts = getFilteredAndSortedPodcasts();
  const displayedPodcasts = filteredPodcasts.slice(0, displayCount);
  const hasMore = displayCount < filteredPodcasts.length;

  return (
    <>
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while trying to fetch podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {displayedPodcasts.length === 0 ? (
              <div className="message-container">
                <p>No podcasts found matching your criteria.</p>
              </div>
            ) : (
              <PodcastGrid podcasts={displayedPodcasts} genres={genres} />
            )}
          </>
        )}
      </main>
    </>
  );
}
