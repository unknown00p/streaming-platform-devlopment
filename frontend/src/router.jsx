import { createBrowserRouter, createRoutesFromElements, Navigate, Route, Router } from "react-router-dom"
import SignUp from './pages/SignUp'
import OutletComp from './outlet/Outlet'
import Home from './pages/Home'
import Video from "./components/Video"
import UserSection from "./components/UserSection"
import SearchResult from "./pages/SearchResult"
import Desktop from "./pages/Desktop"
import ProfileVideos from "./components/ProfileVideos"
import Playlists from "./pages/Playlists"
import PlaylistVideos from "./components/PlaylistVideos"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<OutletComp />}>
            <Route path='' element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='video' element={<Video />} />
            <Route path='userSection' element={<UserSection />} />
            <Route path='searchResult' element={<SearchResult />} />
            <Route path='desktop' element={<Desktop />} >
                <Route index element={<Navigate to="videos" replace />} />
                <Route path="videos" element={<ProfileVideos />} />
                <Route path="playlist" element={<Playlists />} >
                    <Route path="PlaylistVideos" element={<PlaylistVideos/>}/>
                </Route>
                <Route path="tweets" element={<div>tweets</div>} />
                <Route path="following" element={<div>following</div>} />
            </Route>
        </Route>
    )
)
