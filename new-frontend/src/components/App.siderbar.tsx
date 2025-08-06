import {
  Calendar,
  Home,
  Inbox,
  Settings,
  Youtube,
  Clock,
  ThumbsUp,
  Download,
  PlaySquare,
  Book,
  Menu,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

const primaryItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    active: true,
  },
  {
    title: "Shorts",
    url: "#",
    icon: Youtube,
  },
  {
    title: "Subscriptions",
    url: "#",
    icon: PlaySquare,
  },
];

const secondaryItems = [
  {
    title: "Library",
    url: "#",
    icon: Book,
  },
  {
    title: "History",
    url: "#",
    icon: Clock,
  },
  {
    title: "Your videos",
    url: "#",
    icon: PlaySquare,
  },
  {
    title: "Watch later",
    url: "#",
    icon: Clock,
  },
  {
    title: "Liked videos",
    url: "#",
    icon: ThumbsUp,
  },
];

const exploreItems = [
  {
    title: "Trending",
    url: "#",
    icon: Youtube,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Report history",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Help",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Send feedback",
    url: "#",
    icon: Download,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-60 !bg-[#01010d] text-white border-r md:mt-16 mt-0 border-gray-800 overflow-y-auto">
      <SidebarHeader className="items-center justify-between p-4 flex xl:hidden">
        {/* <div className="flex items-center space-x-2 justify-between"> */}
          <div className="p-2 rounded-full hover:bg-gray-800">
            <Menu className="w-6 h-6 text-gray-400" />
          </div>
          <a href="#" className="flex items-center space-x-1">
            {/* A simple placeholder for the YouTube logo */}
            <Youtube className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">YouTube</span>
          </a>
        {/* </div> */}
      </SidebarHeader>
      <SidebarContent>
        {/* Primary Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-800 rounded-lg"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center space-x-6 py-2 px-6 ${
                        item.active
                          ? "font-bold text-white bg-gray-800"
                          : "font-normal text-gray-300"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <hr className="my-2 border-gray-700" />
        {/* Secondary Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-800 rounded-lg"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-6 py-2 px-6 font-normal text-gray-300"
                    >
                      <item.icon className="w-6 h-6" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <hr className="my-2 border-gray-700" />
        {/* Explore Group with a label */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-sm font-semibold text-gray-500">
            Explore
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {exploreItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-800 rounded-lg"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-6 py-2 px-6 font-normal text-gray-300"
                    >
                      <item.icon className="w-6 h-6" />
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
  );
}
