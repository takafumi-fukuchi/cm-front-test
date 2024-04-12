// components/VRVideoPlayer.tsx
import React, { useRef, useState } from 'react';
import 'aframe';

interface VRVideoPlayerProps {
  videoSrc: string;
  width?: string;
  height?: string;
}

const VRVideoPlayer: React.FC<VRVideoPlayerProps> = ({ videoSrc, width = "100%", height = "500px" }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // ビデオ要素への参照
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // ビデオの再生状態

  // ビデオの再生と停止を切り替える関数
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ width: width, height: height, position: 'relative' }}>
      <a-scene embedded style={{ width: '100%', height: '100%' }}>
        <a-assets>
          <video id="vr-video" ref={videoRef} src={videoSrc} loop crossOrigin="anonymous"></video>
        </a-assets>
        <a-videosphere src="#vr-video"></a-videosphere>
      </a-scene>
      <button onClick={togglePlay} style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        {isPlaying ? '停止' : '再生'}
      </button>
    </div>
  );
};

export default VRVideoPlayer;
