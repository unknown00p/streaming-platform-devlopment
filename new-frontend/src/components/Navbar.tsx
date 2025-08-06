import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowLeftCircle,
  Bell,
  Home,
  Menu,
  Mic,
  Plus,
  Search,
  Sidebar,
  User,
  UserCircle2,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

function Navbar() {
  const [mobileSearch, setMobileSearch] = useState(false);
  return (
    <>
      {/* Main Navbar Section */}
      <div
        className={`${
          mobileSearch ? "hidden" : "flex"
        } justify-between items-center h-16 px-5 bg-[#01010d] w-full text-white`}
      >
        {/* Left Section */}
        <div className="left flex items-center space-x-4">
          <SidebarTrigger/>

          <div className="logo flex items-center space-x-1">
            <Youtube className="text-red-600 w-8 h-8" />
            <a href="#" className="text-lg font-semibold hover:text-gray-200">
              Craxs
            </a>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="center flex items-center flex-grow justify-center">
          <div className="search-bar items-center w-full md:w-1/2 hidden md:flex">
            <Input
              placeholder="Search"
              className="bg-gray-800 text-white rounded-l-full focus:outline-none w-full"
            />
            {/* <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-r-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button> */}
            <Button className="px-4 py-2 bg-gray-800 border-[1px] border-gray-700 hover:bg-gray-700 rounded-r-full">
              <Search className="text-white" />
            </Button>
          </div>
          <Mic className="text-gray-400 hidden md:inline hover:text-white cursor-pointer ml-4" />
        </div>

        {/* Right Section - Icons and Mode Toggle */}
        <ul className="right flex items-center space-x-4">
          <Button className="items-center hidden md:flex md:m-4 m-0 md:bg-gray-800 bg-[#0000] hover:bg-gray-700 hover:text-white cursor-pointer">
            <Plus className="text-white" />
            <span className="ml-1 hidden md:inline text-white">Create</span>
          </Button>
          <li className="items-center hidden md:flex hover:text-white cursor-pointer">
            <Bell className="text-gray-400" />
          </li>
          <li className="m-1">
            <Button
              onClick={() => setMobileSearch(!mobileSearch)}
              className="flex md:hidden items-center bg-[#0000] hover:bg-[#0000] !p-0 !m-0 text-white rounded-full"
            >
              <Search className="text-white !w-10 !h-6" />
            </Button>
          </li>
          <li className="flex items-center hover:text-white cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <UserCircle2 className="text-gray-400" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-gray-800 text-white rounded-lg shadow-lg p-2">
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>

      {/* Search bar for mobile view */}
      <div
        className={`${
          mobileSearch ? "flex" : "hidden"
        } md:hidden fixed top-0 left-0 w-full z-50 bg-[#01010d] text-white p-4`}
      >
        <div className="center flex md:hidden items-center flex-grow justify-center">
          <Button
            onClick={() => setMobileSearch(false)}
            className="bg-gray-800 hover:bg-gray-700 rounded-full p-2"
          >
            <ArrowLeftCircle className="text-white" />
          </Button>
          <div className="search-bar ml-2 items-center w-full md:w-1/2 flex">
            <Input
              placeholder="Search"
              className="bg-gray-800 text-white rounded-l-full focus:outline-none w-full"
            />
            <Button className="px-4 py-2 bg-gray-800 border-[1px] border-gray-700 hover:bg-gray-700 rounded-r-full">
              <Search className="text-white" />
            </Button>
          </div>
          <Mic className="text-gray-400 hover:text-white cursor-pointer ml-4" />
        </div>
      </div>

      {/* bottom header section for mobiles */}
      <div className="md:hidden bottom-0 fixed w-full z-50">
        <div className="flex items-center justify-between p-4 bg-[#01010d] text-white">
          <div className="logo flex items-center space-x-1">
            <Home className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <div>
            <User className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <div>
            <Plus className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <div>
            <Bell className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          <div className="flex items-center space-x-4">
            <ArrowDownToLine className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
