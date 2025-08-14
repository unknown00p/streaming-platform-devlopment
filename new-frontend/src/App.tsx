import "./App.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/App.siderbar.tsx";
import { CategoryCarousel } from "./components/CategoryCarousel.tsx";
import { Outlet } from "react-router";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* <div className="mt-20 overflow-x-hidden">
              <CategoryCarousel />
            </div> */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          <div className="p-4 mt-20">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
