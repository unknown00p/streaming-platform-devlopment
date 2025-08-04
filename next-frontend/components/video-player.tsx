"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const comments = [
  {
    id: 1,
    author: "TechEnthusiast",
    time: "2 hours ago",
    content: "Great tutorial! This really helped me understand the concepts better.",
    likes: 24,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    author: "CodeMaster",
    time: "5 hours ago",
    content: "Could you make a follow-up video about advanced patterns?",
    likes: 12,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    author: "WebDeveloper",
    time: "1 day ago",
    content: "The explanation at 8:30 was perfect. Thanks for the clear examples!",
    likes: 8,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

interface VideoPlayerProps {
  onBackClick: () => void
}

export function VideoPlayer({ onBackClick }: VideoPlayerProps) {
  const [newComment, setNewComment] = React.useState("")

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          {/* Back Button for Mobile */}
          <Button variant="ghost" size="sm" onClick={onBackClick} className="mb-4 lg:hidden">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video className="w-full h-full" controls poster="/placeholder.svg?height=480&width=854">
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <h1 className="text-xl lg:text-2xl font-bold">Building Modern Web Applications with React and Next.js</h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>TA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Tech Academy</p>
                  <p className="text-sm text-muted-foreground">1.2M subscribers</p>
                </div>
                <Button className="ml-4">Subscribe</Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-muted rounded-full">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    1.2K
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Save to playlist</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-2">1.2M views • 2 days ago</p>
                <p className="text-sm">
                  In this comprehensive tutorial, we'll explore how to build modern web applications using React and
                  Next.js. We'll cover everything from setup to deployment, including best practices and advanced
                  patterns.
                </p>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Comments</h3>

              {/* Add Comment */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" disabled={!newComment.trim()}>
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setNewComment("")}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Related Videos */}
        <div className="space-y-4">
          <h3 className="font-semibold">Up next</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=94&width=168&query=related video ${i}`}
                        alt={`Related video ${i}`}
                        className="w-42 h-24 object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {i + 10}:30
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        Related Video Title {i}: Advanced React Patterns
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">Channel Name</p>
                      <p className="text-xs text-muted-foreground">
                        {i * 100}K views • {i} days ago
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
