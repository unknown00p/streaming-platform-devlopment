import { useRef, useState, useEffect } from "react"
import Hls from "hls.js"

function CustomVideoPlayer({ videoUrl, qualityArr }) {
  const videoRef = useRef(null)
  const frameIdRef = useRef(null)
  const divRef = useRef(null)
  // const testRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRangeValue, setVideoRangeValue] = useState(0)
  const [soundRangeValue, setSoundRangeValue] = useState(40)
  const [volumeUrl, setVolumeUrl] = useState("volume-full.svg")
  const [videoIndex, setVideoIndex] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [toggleFullScreenImg, setToggleFullScreenImg] = useState("maximize.svg")
  const [showSetting, setShowSetting] = useState(false)
  const [test, setTest] = useState(null)


  useEffect(() => {
    const videoElement = videoRef.current;
    
    // setTimeout(() => {
      console.log("ref",videoRef);
      console.log("run",videoRef?.current);
      setTest(videoRef.current.duration)
    // }, 5000);
    // videoElement.duration = 1
    if (Hls.isSupported() && videoElement) {
      const hls = new Hls();
      hls.loadSource(qualityArr[videoIndex]);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = videoUrl;
    }

    const handleLoadedMetadata = () => {
      const videoDuration = videoElement.duration;
      setTest(videoDuration)
      console.log("Video duration:", videoElement.duration);
      // setDuration(videoDuration);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // setTest(videoRef.current.duration)
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };



  }, []);

  useEffect(() => {
    if(test != null){
      console.log(test);
      
      console.log(videoRef.current.duration);
    }
  }, [test])

  console.log(test);
  
  

  

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //   console.log(videoRef);
    
  //   // Event listener to handle when the metadata is loaded
  //   const handleLoadedMetadata = () => {
  //     console.log('Video duration:', videoElement.duration); // This should log the correct duration
  //   };

  //   if (videoElement) {
  //     // Add event listener to trigger when the metadata is loaded
  //     videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
  //   }

  //   // Cleanup the event listener
  //   return () => {
  //     if (videoElement) {
  //       videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
  //     }
  //   };
  // }, []);


  function togglePlayPause() {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    }
    else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  function onVideoInputValChange(e) {
    const Value = e?.target?.value
    setVideoRangeValue(Value)
    videoRef.current.currentTime = (Value / 100) * videoRef.current.duration;
  }


  function onSoundInputChange(e) {
    const value = e.target.value
    videoRef.current.volume = value / 100
    setSoundRangeValue(value)
  }

  function toggleMute() {
    if (soundRangeValue !== 0) {
      setSoundRangeValue(0)
    } else {
      setSoundRangeValue(40)
    }
  }

  useEffect(() => {
    videoRef.current.volume = soundRangeValue / 100
  }, [soundRangeValue])

  const updateSlider = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      console.log("slider", duration);

      if (duration > 0) {
        const newValue = (currentTime / duration) * 100;
        setVideoRangeValue(Math.round(newValue));
        setCurrentTime(currentTime)
      }
      frameIdRef.current = requestAnimationFrame(updateSlider)
    }
  };

  useEffect(() => {
    if (isPlaying) {
      frameIdRef.current = requestAnimationFrame(updateSlider);
    } else {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    }
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [isPlaying]);

  const handleMetadataLoaded = () => {
    const videoDuration = videoRef.current.duration;
    console.log("handlemeta", videoDuration);
    setDuration(videoDuration)
  };

  useEffect(() => {
    if (soundRangeValue < 50 && soundRangeValue > 0) {
      setVolumeUrl("volume-low.svg")
    } else {
      setVolumeUrl("volume-full.svg")
    }

    if (soundRangeValue == 0) {
      setVolumeUrl("volume-mute.svg")
    }

  }, [soundRangeValue])

  // useEffect(() => {
  //   const video = videoRef.current
  //   if (video) {
  //     video.load()
  //     video.play()
  //     if (!video.paused) {
  //       setIsPlaying(true)
  //     } else {
  //       setIsPlaying(false)
  //     }
  //   }
  // }, [])


  function playNextVideo() {
    if (videoIndex < videoUrl.length - 1) {
      setVideoIndex(prev => prev + 1)
    }
  }

  function toggleScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setToggleFullScreenImg("maximize.svg")
    } else {
      divRef.current.requestFullscreen()
      setToggleFullScreenImg("minimize.svg")
    }
  }

  function formatDuration(seconds) {
    // console.log(seconds);    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    let time = `${hours > 0 ? `${hours}:` : ""}${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    // console.log(time);
    return time
  }


  return (
    <>
      <div ref={divRef} className="relative w-[57vw] h-[23rem]">

        <video
          onClick={togglePlayPause}
          ref={videoRef}
          onEnded={() => {
            setIsPlaying(false)
          }}
          
          onLoadedMetadata={handleMetadataLoaded}
      
          disablePictureInPicture
          className="w-full h-full rounded-md object-cover cursor-pointer"
          controls={false}
        >

          <source src={qualityArr[videoIndex]} type="application/x-mpegURL" />

        </video>
        <div className="absolute custom-video-controls bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2">
          <div className="px-4 pb-[0.33rem]">
            <input className="
            transition-all
            w-full
            h-[0.23rem]
            bg-[#30303053]
            accent-red-600
            cursor-pointer
            focus:outline-none
            focus:ring-0
            hover:shadow-none" type="range"
              onChange={onVideoInputValChange}
              max={100}
              value={videoRangeValue}
            />
          </div>
          <div className="flex justify-between items-center px-6">
            <div className="flex items-center gap-7">
              <div className="flex items-center gap-2">

                <button className="focus:outline-none">
                  <img src="backward.svg" alt="Backward" className="w-6 h-6" />
                </button>
                <button onClick={togglePlayPause} className="focus:outline-none">
                  {!isPlaying ? (
                    <img src="play.svg" alt="Play" className="w-[4vw] h-[4vh]" />
                  ) : (
                    <img src="pause.svg" alt="Pause" className="w-[4vw] h-[4vh]" />
                  )}
                </button>
                <button className="focus:outline-none">
                  <img onClick={playNextVideo} src="forward.svg" alt="Forward" className="w-6 h-6" />
                </button>

              </div>
              <div className="flex items-center gap-5">
                <img onClick={toggleMute} src={volumeUrl} alt="Volume" className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
                <input
                  onChange={onSoundInputChange}
                  type="range"
                  max={100}
                  value={soundRangeValue}
                  className="w-[4rem] h-1 bg-gray-300 rounded-lg cursor-pointer accent-white focus:outline-none focus:ring-0 hover:shadow-none"
                />
                <p className="text-white text-sm">{formatDuration(currentTime)} / {formatDuration(duration)}</p>
              </div>
            </div>
            <div className="text-white flex gap-4">
              <div className="relative">
                <img className="cursor-pointer" onClick={() => (
                  setShowSetting(!showSetting)
                )} src="dots2.svg" alt="" />
                {showSetting && <div className="bg-[#211e1e7a] absolute w-[8.75rem] p-2 top-[-11rem] left-[-5rem]">
                  <ul className="flex flex-col gap-3">
                    <button className="text-left">
                      <li>Auto</li>
                    </button>
                    <button className="text-left">
                      <li>1080p</li>
                    </button>
                    <button className="text-left">
                      <li>720p</li>
                    </button>
                    <button className="text-left">
                      <li>480p</li>
                    </button>
                  </ul>
                </div>}
              </div>
              <img className="cursor-pointer" onClick={toggleScreen} src={toggleFullScreenImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomVideoPlayer
