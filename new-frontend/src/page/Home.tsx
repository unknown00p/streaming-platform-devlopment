import { CategoryCarousel } from "@/components/CategoryCarousel";
import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllVideos } from "@/api/video/video";
import type { HomeVideoDataTypes } from "@/types/video/video";
import formatTimeDifference from '../utils/formateTime';

const videos = [
  {
    id: 1,
    title: "10 JavaScript Tricks You Should Know",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242477-c3435b6b158c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "Code Master",
    views: "1.2M",
    date: "1 month ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
  },
  {
    id: 2,
    title: "Learning React in 20 Minutes",
    thumbnail:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    channel: "Web Dev Simplified",
    views: "2.5M",
    date: "3 weeks ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1515879218367-84635d4aa0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 3,
    title: "Figma UI/UX Design Tutorial",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "Design Hub",
    views: "800K",
    date: "2 months ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1558655146-36474149021e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: 4,
    title: "Build a Full-Stack App with Next.js",
    thumbnail:
      "https://images.unsplash.com/photo-1550009158-9dab1d2160bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "Dev Journey",
    views: "500K",
    date: "1 week ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f5f3e4f3a74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 5,
    title: "Mastering CSS Grid Layouts",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-46361908e260?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "Front-End Pro",
    views: "1.8M",
    date: "2 months ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1549492429-b6840742183e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 6,
    title: "The Ultimate Guide to TypeScript",
    thumbnail:
      "https://images.unsplash.com/photo-1596556112774-672ce0950337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "The Coding GEEK",
    views: "950K",
    date: "4 weeks ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
  {
    id: 6,
    title: "The Ultimate Guide to TypeScript",
    thumbnail:
      "https://images.unsplash.com/photo-1596556112774-672ce0950337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "The Coding GEEK",
    views: "950K",
    date: "4 weeks ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
  {
    id: 6,
    title: "The Ultimate Guide to TypeScript",
    thumbnail:
      "https://images.unsplash.com/photo-1596556112774-672ce0950337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "The Coding GEEK",
    views: "950K",
    date: "4 weeks ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
  {
    id: 6,
    title: "The Ultimate Guide to TypeScript",
    thumbnail:
      "https://images.unsplash.com/photo-1596556112774-672ce0950337?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    channel: "The Coding GEEK",
    views: "950K",
    date: "4 weeks ago",
    channelThumbnail:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
  },
];

function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const { data, isLoading } = useQuery({
    queryKey: ["allVideos", { page, limit }],
    queryFn: () => getAllVideos(page, limit),
  });

  const videos: HomeVideoDataTypes[] = data?.data.data.allvideos;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6 p-4 md:p-3">
        {videos.map((video) => (
          <div key={video._id} className="group cursor-pointer">
            <Link to={`/video/${video._id}`} className="block">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex items-start gap-3">
              <Link
                to={`/channel/${video.owner._id}`}
                className="flex-shrink-0"
              >
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="w-9 h-9 rounded-full object-cover"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/video/${video._id}`}>
                  <h3 className="text-sm md:text-md font-semibold line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors duration-200">
                    {video.title}
                  </h3>
                </Link>
                <Link to={`/channel/${video.owner._id}`}>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1 hover:underline">
                    {video.owner.username}
                  </p>
                </Link>
                <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm">
                  {video.views} views • {formatTimeDifference(video.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
