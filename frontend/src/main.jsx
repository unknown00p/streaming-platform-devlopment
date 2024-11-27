import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './router'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = "147780945527-a9a02qfpg2m1gblgd82d9cq984ghirn4.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <AppRouter />
    </GoogleOAuthProvider>
  </StrictMode>,
)
