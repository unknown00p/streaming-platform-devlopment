import { VideoPlayer } from "@/components/VideoPlayer";
import { useRef } from "react";
import videojs from "video.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getVideobyId } from "@/api/video/video";
import type { VideoDataType } from "@/types/video/video";

function Video() {
  const playerRef = useRef(null);
  const { videoId } = useParams();

  const { data: videoData, isLoading } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideobyId(videoId!),
  });

  isLoading && <div>Loading...</div>;

  console.log(videoData?.data.data.video);
  const video: VideoDataType = videoData?.data.data.video;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: video?.videoUrl.auto,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const suggestedVideos = [
    {
      id: 1,
      title: "How to Build a YouTube Clone with React and Tailwind CSS",
      channel: "CodeWithMe",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
      views: "1.2M views",
      uploadDate: "3 months ago",
    },
    {
      id: 2,
      title: "The Future of Web Development in 2025",
      channel: "TechTrends",
      thumbnail:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2dyYW1taW5nfGVufDB8fDB8fHww",
      views: "345K views",
      uploadDate: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Design Principles for Beginners",
      channel: "DesignSpark",
      thumbnail:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
      views: "50K views",
      uploadDate: "2 days ago",
    },
  ];

  const comments = [
    {
      id: 1,
      user: "Alice C.",
      comment:
        "This is a fantastic tutorial! Exactly what I was looking for. Thank you!",
      avatar: "https://via.placeholder.com/40x40/272727/ffffff?text=AC",
    },
    {
      id: 2,
      user: "Bob S.",
      comment:
        "I learned so much from this. The explanation was very clear and easy to follow.",
      avatar:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row text-white">
      {/* Main Video Content and Comments */}
      <div className="lg:w-4/6 px-6 py-4">
        <div className="mb-6 rounded-lg overflow-hidden">
          <VideoPlayer url={video?.videoUrl.auto} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-2">
            Building a YouTube-like Video Player with React and Tailwind
          </h2>
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <span className="mr-2">1,234,567 views</span>
            <span>•</span>
            <span className="ml-2">Uploaded 1 day ago</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://via.placeholder.com/40x40/272727/ffffff?text=C" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="font-semibold text-white">Channel Name</p>
                <p className="text-sm text-gray-400">1.5M subscribers</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                className="mr-2 bg-[#272727] text-white border-none hover:bg-[#3f3f3f]"
              >
                👍 10K
              </Button>
              <Button
                variant="outline"
                className="bg-[#272727] text-white border-none hover:bg-[#3f3f3f]"
              >
                👎 200
              </Button>
            </div>
          </div>
        </div>

        {/* --- */}
        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-white">Comments</h3>
          <div className="flex items-center mb-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://via.placeholder.com/40x40/272727/ffffff?text=U" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input
              type="text"
              placeholder="Add a comment..."
              className="ml-3 bg-[#272727] text-white border-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
            <Button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Post
            </Button>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start py-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-semibold text-white text-sm">
                    {comment.user}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* --- */}
      {/* Suggested Videos Section */}
      <div className="lg:w-2/6 px-6 py-4">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Suggested Videos
        </h3>
        <div className="space-y-4">
          {suggestedVideos.map((video) => (
            <div
              key={video.id}
              className="flex cursor-pointer hover:bg-[#272727] p-2 rounded-lg transition-colors"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg mr-3"
              />
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold leading-tight text-white line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-gray-400 text-xs mt-1">{video.channel}</p>
                <p className="text-gray-400 text-xs">{video.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Video;
