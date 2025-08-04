"use client"

import * as React from "react"
import {
  Bell,
  Home,
  Library,
  History,
  Music,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  Search,
  Mic,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { VideoGrid } from "@/components/video-grid"
import { VideoPlayer } from "@/components/video-player"

const navigationItems = [
  { title: "Home", icon: Home, url: "#", isActive: true },
  { title: "Subscriptions", icon: Bell, url: "#" },
  { title: "Library", icon: Library, url: "#" },
  { title: "History", icon: History, url: "#" },
]

const categoryItems = [
  { title: "Music", icon: Music, url: "#" },
  { title: "Gaming", icon: Gamepad2, url: "#" },
  { title: "News", icon: Newspaper, url: "#" },
  { title: "Sports", icon: Trophy, url: "#" },
  { title: "Learning", icon: Lightbulb, url: "#" },
  { title: "Fashion", icon: Shirt, url: "#" },
  { title: "Podcasts", icon: Podcast, url: "#" },
]

export function VideoStreamingPlatform() {
  const [currentView, setCurrentView] = React.useState<"home" | "video">("home")
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive} onClick={() => setCurrentView("home")}>
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Explore</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          {/* Top Navigation */}
          <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-white font-bold text-sm">
                  YT
                </div>
                <span className="font-semibold text-xl hidden sm:block">StreamTube</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-1 max-w-2xl mx-4 items-center gap-2">
              <div className="flex flex-1 items-center">
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0 focus-visible:ring-0"
                />
                <Button variant="outline" size="icon" className="rounded-l-none border-l-0 bg-transparent">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Upload className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>Your channel</DropdownMenuItem>
                  <DropdownMenuItem>YouTube Studio</DropdownMenuItem>
                  <DropdownMenuItem>Switch account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuItem>Send feedback</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {currentView === "home" ? (
              <VideoGrid onVideoClick={() => setCurrentView("video")} />
            ) : (
              <VideoPlayer onBackClick={() => setCurrentView("home")} />
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
