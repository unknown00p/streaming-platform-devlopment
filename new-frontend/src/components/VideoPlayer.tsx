import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

// Define the props for our component
interface HlsVideoPlayerProps {
  src: string; // The HLS stream URL (e.g., 'https://your-stream.com/playlist.m3u8')
  controls?: boolean;
  autoPlay?: boolean;
}

const HlsVideoPlayer: React.FC<HlsVideoPlayerProps> = ({ src, controls = true, autoPlay = false }) => {
  // 1. Create a ref to attach to the <video> element
  const videoRef = useRef<HTMLVideoElement>(null);
  // 2. Create a ref to hold the Hls instance for cleanup
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if the browser natively supports HLS (Safari does this well)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      // Native support, no hls.js needed.
      if (autoPlay) {
        video.play();
      }
    } else if (Hls.isSupported()) {
      // Hls.js is supported, use it to play the stream
      const hls = new Hls();
      hlsRef.current = hls; // Save instance for cleanup

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS Fatal Error:', data.type, data.details);
          // Handle fatal errors (e.g., restart hls.js or try native playback)
        }
      });
      
      // Auto-play management after the stream is ready
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(error => {
            console.log("Autoplay failed, user interaction needed:", error);
          });
        }
      });

    } else {
      // Browser does not support HLS or hls.js
      console.error('HLS is not supported on this browser.');
    }

    // Cleanup function: runs when component unmounts or before re-running useEffect
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src, autoPlay]); // Re-run effect if src or autoPlay changes

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <video
        ref={videoRef}
        controls={controls}
        // Note: We manage autoplay manually in useEffect to handle HLS readiness
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default HlsVideoPlayer;