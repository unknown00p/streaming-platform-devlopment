import "./App.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { AppSidebar } from "./components/App.siderbar.tsx";
import MainContent from "./components/MainContent.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>
            <MainContent />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
