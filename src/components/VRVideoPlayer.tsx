import React, { useRef, useState, useEffect } from 'react';
import 'aframe';
import './VRVideoPlayer.css'; // CSSファイルをインポート

AFRAME.registerComponent('limit-rotation', {
  schema: {
    maxPitch: { type: 'number', default: 90 },
    minPitch: { type: 'number', default: -90 },
    maxYaw: { type: 'number', default: 90 },
    minYaw: { type: 'number', default: -90 }
  },
  init: function () {
    this.el.addEventListener('componentchanged', this.updateRotation.bind(this));
  },
  updateRotation: function (event) {
    if (event.detail.name === 'rotation') {
      const rotation = this.el.getAttribute('rotation');
      let clampedPitch = Math.max(Math.min(rotation.x, this.data.maxPitch), this.data.minPitch);
      let clampedYaw = Math.max(Math.min(rotation.y, this.data.maxYaw), this.data.minYaw);
      this.el.setAttribute('rotation', { x: clampedPitch, y: clampedYaw, z: rotation.z });
    }
  }
});

interface VRVideoPlayerProps {
  videoSrc: string;
  width?: string;
  height?: string;
}

const VRVideoPlayer: React.FC<VRVideoPlayerProps> = ({ videoSrc, width = "100%", height = "500px" }) => {
  const videoRef = useRef<HTMLVideoElement>(null); // ビデオ要素への参照
  const containerRef = useRef<HTMLDivElement>(null); // コンテナ要素への参照
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // ビデオの再生状態
  const [volume, setVolume] = useState<number>(1); // 音量状態
  const [currentTime, setCurrentTime] = useState<number>(0); // 現在の再生位置
  const [duration, setDuration] = useState<number>(0); // ビデオの長さ

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

  // 音量を調節する関数
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // シークバーを操作する関数
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // ビデオの現在の再生位置と長さを更新する関数
  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  // フルスクリーンの切り替え関数
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 時間をフォーマットする関数
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // A-Frameのデフォルトのフルスクリーンボタンを非表示にするためのクラスを設定
    const style = document.createElement('style');
    style.innerHTML = `
      .a-enter-vr {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: width, height: height, position: 'relative' }}>
      <a-scene embedded style={{ width: '100%', height: '100%' }}>
        <a-assets>
          <video id="vr-video" ref={videoRef} src={videoSrc} loop crossOrigin="anonymous" onTimeUpdate={updateTime}></video>
        </a-assets>
        <a-entity camera look-controls limit-rotation="maxPitch: 90; minPitch: -90; maxYaw: 90; minYaw: -90"></a-entity>
        <a-videosphere src="#vr-video"></a-videosphere>
      </a-scene>
      <div className="vr-video-controls">
        <button onClick={togglePlay}>
          {isPlaying ? '停止' : '再生'}
        </button>
        <div>
          <label>音量: {Math.round(volume * 100)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
          />
        </div>
        <div>
          <label>再生時間: <br />
            {formatTime(currentTime)} / {formatTime(duration)}</label>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={seek}
          />
        </div>
        <button onClick={toggleFullscreen}>
          フルスクリーン
        </button>
      </div>
    </div>
  );
};

export default VRVideoPlayer;
