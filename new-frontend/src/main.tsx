import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./page/Home.tsx";
import Video from "./page/Video.tsx";
import You from "./page/You.tsx";
import Channel from "./page/Channel.tsx";
import SignIn from "./page/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "video",
        element: <Video />,
      },
      {
        path: "you",
        element: <You />,
      },
      {
        path: ":channelName",
        element: <Channel />,
      },
      {
        path: "signin",
        element: <SignIn />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
