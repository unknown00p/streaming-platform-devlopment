import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import '@videojs/http-streaming';

// Import Video.js CSS
import 'video.js/dist/video-js.css';

// Define the component props type
interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    // Initialize the player only if it doesn't exist
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (videoElement) {
        const playerOptions: videojs.PlayerOptions = {
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [
            {
              src: url,
              type: 'application/x-mpegURL',
            },
          ],
        };

        const player = videojs(videoElement, playerOptions);
        playerRef.current = player;
      }
    }
  }, [url]);

  useEffect(() => {
    const player = playerRef.current;

    // Clean up the player instance on component unmount
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default VideoPlayer;