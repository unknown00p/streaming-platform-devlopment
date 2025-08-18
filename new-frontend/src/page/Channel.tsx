import React from "react";
import { useParams } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ellipsis, Home, List, PlayCircle, Search, Video } from "lucide-react";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

function Channel() {
  const { channelName } = useParams();

  const channelInfo = {
    name: channelName || "Channel Name",
    avatarUrl:
      "https://images.unsplash.com/photo-1739664353163-ce6400f1d57c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D",
    coverImageUrl:
      "https://images.unsplash.com/photo-1754851357071-e22af991e590?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5OHx8fGVufDB8fHx8fA%3D%3D",
    subscriberCount: "1M",
    description: "Welcome to my channel! Here you'll find...",
    joinDate: "Jan 1, 2020",
    totalViews: "100M",
  };

  const channelVideos = [
    {
      id: 1,
      title: "Video 1",
      thumbnail: "https://via.placeholder.com/360x200",
      views: "1M",
      uploadDate: "1 week ago",
    },
    {
      id: 2,
      title: "Video 2",
      thumbnail: "https://via.placeholder.com/360x200",
      views: "1.5M",
      uploadDate: "2 weeks ago",
    },
    {
      id: 3,
      title: "Video 3",
      thumbnail: "https://via.placeholder.com/360x200",
      views: "2M",
      uploadDate: "3 weeks ago",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Channel Cover Image */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
        <img
          src={channelInfo.coverImageUrl}
          alt="Channel Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>{" "}
        {/* Dark overlay */}
      </div>

      {/* Channel Header */}
      <header className="px-4 md:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
            <AvatarImage src={channelInfo.avatarUrl} />
            <AvatarFallback>{channelInfo.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="mt-4 sm:mt-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold">
              {channelInfo.name}
            </h1>
            <div className="text-gray-400 text-sm mt-1 flex items-center space-x-2">
              <span>{channelInfo.username}</span>
              <span className="text-xs">
                {channelInfo.subscriberCount} subscribers
              </span>
              <span className="text-xs">{channelInfo.videoCount} videos</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              {channelInfo.description}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              variant="outline"
              className="rounded-full bg-white text-gray-900 hover:bg-gray-200"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </header>

      {/* Channel Navigation */}
      <nav className="border-b border-gray-700 px-4 md:px-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <ul className="flex space-x-6 items-center">
            <li>
              <Button variant="ghost" className="px-0 py-2">
                Home
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="px-0 py-2">
                Videos
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="px-0 py-2">
                Shorts
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="px-0 py-2">
                Playlists
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="px-0 py-2">
                More
              </Button>
            </li>
            <li className="ml-auto">
              <Button variant="ghost" className="px-0 py-2">
                <Search className="w-4 h-4" />
              </Button>
            </li>
          </ul>
        </ScrollArea>
      </nav>

      {/* Channel Content */}
      <section className="p-4 md:p-8">
        <h2 className="text-xl font-semibold mb-4">For you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Carousel>
            {channelVideos.map((video) => (
              <CarouselItem key={video.id}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="p-2">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {video.views} views - {video.uploadDate}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}

export default Channel;
