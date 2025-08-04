"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const videos = [
  {
    id: 1,
    title: "Building Modern Web Applications with React and Next.js",
    channel: "Tech Academy",
    views: "1.2M views",
    time: "2 days ago",
    duration: "15:42",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 2,
    title: "The Future of AI and Machine Learning",
    channel: "AI Insights",
    views: "856K views",
    time: "1 week ago",
    duration: "22:15",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 3,
    title: "Amazing Nature Documentary: Wildlife in 4K",
    channel: "Nature Plus",
    views: "3.4M views",
    time: "3 days ago",
    duration: "45:30",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 4,
    title: "Cooking Masterclass: Italian Pasta Recipes",
    channel: "Chef's Kitchen",
    views: "2.1M views",
    time: "5 days ago",
    duration: "18:25",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 5,
    title: "Space Exploration: Journey to Mars",
    channel: "Space Channel",
    views: "4.7M views",
    time: "1 week ago",
    duration: "35:12",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 6,
    title: "Guitar Lessons for Beginners",
    channel: "Music Academy",
    views: "987K views",
    time: "4 days ago",
    duration: "12:08",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 7,
    title: "Travel Vlog: Exploring Tokyo",
    channel: "Travel Diaries",
    views: "1.8M views",
    time: "6 days ago",
    duration: "28:45",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 8,
    title: "Fitness Workout: Full Body Training",
    channel: "Fit Life",
    views: "1.5M views",
    time: "2 days ago",
    duration: "25:30",
    thumbnail: "/placeholder.svg?height=180&width=320",
  },
]

interface VideoGridProps {
  onVideoClick: () => void
}

export function VideoGrid({ onVideoClick }: VideoGridProps) {
  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Card
            key={video.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-none"
            onClick={onVideoClick}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex gap-3 p-3">
                <Avatar className="h-9 w-9 mt-1">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" />
                  <AvatarFallback>{video.channel.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 leading-5 mb-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{video.channel}</p>
                  <p className="text-sm text-muted-foreground">
                    {video.views} • {video.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
