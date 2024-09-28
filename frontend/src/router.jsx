import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom"
import OutletComp from './outlet/Outlet'
import Home from './pages/Home'
import Video from "./components/Video"
import UserSection from "./components/UserSection"
import SearchResult from "./pages/SearchResult"
import Desktop from "./pages/Desktop"
import ProfileVideos from "./components/ProfileVideos"
import Playlists from "./components/Playlists"
import PlaylistVideos from "./components/PlaylistVideos"
import Tweets from "./components/Tweets"
import Following from "./components/Following"
import Dashboard from "./pages/Dashboard"
import Register from "./components/Register"
import Login from "./components/Login"
import VideoDashboard from "./components/VideoDashboard"
import UserDashboard from "./components/UserDashboard"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<OutletComp />}>
            <Route path='' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='video' element={<Video />} />
            <Route path='userSection' element={<UserSection />} />
            <Route path='searchResult' element={<SearchResult />} />
            <Route path='desktop' element={<Desktop />} >
                <Route index element={<Navigate to="videos" replace />} />
                <Route path="videos" element={<ProfileVideos />} />
                <Route path="playlist" element={<Playlists />} />
                <Route path="tweets" element={<Tweets />} />
                <Route path="following" element={<Following />} />
            </Route>

            <Route path="PlaylistVideos" element={<PlaylistVideos />} />

            <Route path="dashboard" element={<Dashboard />} >
                <Route index element={<Navigate to="videoDashboard" replace />} />
                <Route path="videoDashboard" element={<VideoDashboard />} />
                <Route path="userDashboard" element={<UserDashboard />} />
            </Route>
        </Route>
    )
)
