import { useSidebar } from "@/components/ui/sidebar";
import React, { useRef } from "react";

const videos = [
  {
    id: 1,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+1",
    duration: "1:27",
    title: "Subaru Tellgius About his ability and Stars Re Zero -Seaso...",
    views: "259K views",
    timeAgo: "5 months ago",
  },
  {
    id: 2,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+2",
    duration: "1:39",
    title: "MONTAGEM ALUCINANTE - DJ ORBITAL - (Slowed & Reverb) -...",
    views: "14M views",
    timeAgo: "2 months ago",
  },
  {
    id: 3,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+3",
    duration: "1:45",
    title: "Vem Vem - Jmilton (SLOWED + REVERB) | TIKTOK VERSION x...",
    views: "1M views",
    timeAgo: "2 months ago",
  },
  {
    id: 4,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+4",
    duration: "1:30",
    title: "NADA NADA - JMILTON x KAISER, SAE, LORENZO [BRAZILIAN...",
    views: "9.2M views",
    timeAgo: "1 month ago",
  },
  {
    id: 5,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+5",
    duration: "2:10",
    title: "Another great video to watch later and enjoy",
    views: "1.2M views",
    timeAgo: "3 weeks ago",
  },
  {
    id: 6,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+6",
    duration: "0:45",
    title: "Quick tutorial on React Hooks",
    views: "500K views",
    timeAgo: "1 month ago",
  },
  {
    id: 7,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+7",
    duration: "3:00",
    title: "Exploring the mountains of Switzerland",
    views: "2.5M views",
    timeAgo: "6 months ago",
  },
  {
    id: 8,
    thumbnail: "https://placehold.co/320x180/000000/FFFFFF?text=Video+8",
    duration: "1:55",
    title: "Deep dive into JavaScript Closures",
    views: "800K views",
    timeAgo: "2 months ago",
  },
];

const playlists = [
  {
    id: 101,
    thumbnail: "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Workout+Hits",
    title: "Workout Hits",
    videoCount: "50 videos",
  },
  {
    id: 102,
    thumbnail: "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Chill+Vibes",
    title: "Chill Vibes",
    videoCount: "30 videos",
  },
  {
    id: 103,
    thumbnail:
      "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Coding+Tutorials",
    title: "Coding Tutorials",
    videoCount: "75 videos",
  },
  {
    id: 104,
    thumbnail: "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Travel+Vlogs",
    title: "Travel Vlogs",
    videoCount: "20 videos",
  },
  {
    id: 105,
    thumbnail:
      "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Gaming+Highlights",
    title: "Gaming Highlights",
    videoCount: "15 videos",
  },
  {
    id: 106,
    thumbnail:
      "https://placehold.co/200x120/4a4a4a/FFFFFF?text=Cooking+Recipes",
    title: "Cooking Recipes",
    videoCount: "40 videos",
  },
];

const renderCarouselSection = (data, sectionTitle, carouselId) => {
  const scrollRef = useRef(null);
  const { open, openMobile, isMobile } = useSidebar();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -(scrollRef.current.offsetWidth * 0.8),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  const isVideo = (item) => "duration" in item;
  console.log("open", open);
  console.log("isMobile", isMobile);
  console.log("openMobile", openMobile);

  return (
    <div className={`mb-10 text-white`}>
      {" "}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">{sectionTitle}</h2>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors">
            View all
          </button>
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto pb-4 scrollbar-hide space-x-4 pr-4 w-full`}
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="flex-none w-60 sm:w-72 md:w-80 lg:w-64 rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full aspect-video">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = isVideo(item)
                    ? `https://placehold.co/320x180/6b7280/FFFFFF?text=No+Video+Image`
                    : `https://placehold.co/200x120/6b7280/FFFFFF?text=No+Playlist+Image`;
                }}
              />
              {isVideo(item) && item.duration && (
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {item.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium leading-tight mb-1 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              {isVideo(item) ? (
                <>
                  {item.views && (
                    <p className="text-gray-400 text-xs">{item.views}</p>
                  )}
                  {item.timeAgo && (
                    <p className="text-gray-400 text-xs">{item.timeAgo}</p>
                  )}
                </>
              ) : (
                item.videoCount && (
                  <p className="text-gray-400 text-xs">{item.videoCount}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const You = () => {
  return (
    <div className="font-inter p-4 sm:p-6 lg:p-8 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-600 rounded-full flex items-center justify-center text-3xl font-bold">
            R
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold">Raj Alam</h1>
            <p className="text-gray-400 text-sm">@Rajroyal384 · View channel</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors">
            Switch account
          </button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors">
            <span className="font-bold">G</span> Google Account
          </button>
        </div>
      </div>
      {renderCarouselSection(videos, "History", "history-carousel")}
      {renderCarouselSection(playlists, "Playlists", "playlists-carousel")}
      {renderCarouselSection(
        videos.slice(0, 4),
        "Watch Later",
        "watch-later-carousel"
      )}{" "}
      {renderCarouselSection(
        videos.slice(4, 8),
        "Liked videos",
        "liked-videos-carousel"
      )}{" "}
    </div>
  );
};

export default You;