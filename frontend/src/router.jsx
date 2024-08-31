import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import SignUp from './pages/SignUp'
import OutletComp from './outlet/Outlet'
import Home from './pages/Home'
import Video from "./components/Video"
import UserSection from "./components/UserSection"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<OutletComp />}>
            <Route path='' element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='video' element={<Video />} />
            <Route path='userSection' element={<UserSection />} />
        </Route>
    )
)

/**
 *     <video controls width="100%">
      <source src="/path/to/your/video.mp4" type="video/mp4" />
      <source src="/path/to/your/video.webm" type="video/webm" />
      Sorry, your browser doesn't support embedded videos.
    </video>

 */
