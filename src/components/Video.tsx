/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import type Manager from '../Manager';
import type { VideoAPI } from '../Manager';
import type { PlayerState } from '../reducers/player';
import { isVideoChild, mediaProperties, throttle } from '../utils';

type VideoEventHandler = (event: SyntheticEvent<HTMLVideoElement>) => void;

export interface VideoProps {
  actions: ReturnType<Manager['getActions']>;
  player: PlayerState;
  children?: ReactNode;
  order?: number;
  startTime?: number;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  src?: string;
  poster?: string;
  className?: string;
  preload?: 'auto' | 'metadata' | 'none';
  crossOrigin?: React.VideoHTMLAttributes<HTMLVideoElement>['crossOrigin'];
  videoId?: string;
  onLoadStart?: VideoEventHandler;
  onWaiting?: VideoEventHandler;
  onCanPlay?: VideoEventHandler;
  onCanPlayThrough?: VideoEventHandler;
  onPlaying?: VideoEventHandler;
  onEnded?: VideoEventHandler;
  onSeeking?: VideoEventHandler;
  onSeeked?: VideoEventHandler;
  onPlay?: VideoEventHandler;
  onPause?: VideoEventHandler;
  onProgress?: VideoEventHandler;
  onDurationChange?: VideoEventHandler;
  onError?: VideoEventHandler;
  onSuspend?: VideoEventHandler;
  onAbort?: VideoEventHandler;
  onEmptied?: VideoEventHandler;
  onStalled?: VideoEventHandler;
  onLoadedMetadata?: VideoEventHandler;
  onLoadedData?: VideoEventHandler;
  onTimeUpdate?: VideoEventHandler;
  onRateChange?: VideoEventHandler;
  onVolumeChange?: VideoEventHandler;
  onResize?: VideoEventHandler;
}

const Video = forwardRef<VideoAPI, VideoProps>((props, ref) => {
  const {
    actions,
    player,
    children,
    startTime,
    loop,
    poster,
    preload,
    src,
    autoPlay,
    playsInline,
    muted,
    crossOrigin,
    videoId,
    className,
    onLoadStart,
    onWaiting,
    onCanPlay,
    onCanPlayThrough,
    onPlaying,
    onEnded,
    onSeeking,
    onSeeked,
    onPlay,
    onPause,
    onProgress,
    onDurationChange,
    onError,
    onSuspend,
    onAbort,
    onEmptied,
    onStalled,
    onLoadedMetadata,
    onLoadedData,
    onTimeUpdate,
    onRateChange,
    onVolumeChange,
    onResize,
  } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  const [, forceRender] = useReducer((count) => count + 1, 0);

  useEffect(() => {
    forceRender();
  }, []);

  const getVideoProperties = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return {} as Record<string, unknown>;
    }

    return mediaProperties.reduce<Record<string, unknown>>((acc, key) => {
      const videoKey = key as keyof HTMLVideoElement;
      acc[key] = video?.[videoKey];
      return acc;
    }, {});
  }, []);

  const createVideoEventHandler = useCallback(
    <Args extends unknown[]>(
      dispatcher: (videoProps: Record<string, unknown>) => void,
      callback?: (...args: Args) => void
    ) => {
      return (...args: Args) => {
        dispatcher(getVideoProperties());
        if (callback) {
          callback(...args);
        }
      };
    },
    [getVideoProperties]
  );

  const handleLoadStart = useMemo(
    () => createVideoEventHandler(actions.handleLoadStart, onLoadStart),
    [actions.handleLoadStart, onLoadStart, createVideoEventHandler]
  );

  const handleWaiting = useMemo(
    () => createVideoEventHandler(actions.handleWaiting, onWaiting),
    [actions.handleWaiting, onWaiting, createVideoEventHandler]
  );

  const handleCanPlay = useMemo(
    () => createVideoEventHandler(actions.handleCanPlay, onCanPlay),
    [actions.handleCanPlay, onCanPlay, createVideoEventHandler]
  );

  const handleCanPlayThrough = useMemo(
    () =>
      createVideoEventHandler(actions.handleCanPlayThrough, onCanPlayThrough),
    [actions.handleCanPlayThrough, onCanPlayThrough, createVideoEventHandler]
  );

  const handlePlaying = useMemo(
    () => createVideoEventHandler(actions.handlePlaying, onPlaying),
    [actions.handlePlaying, onPlaying, createVideoEventHandler]
  );

  const handlePlay = useMemo(
    () => createVideoEventHandler(actions.handlePlay, onPlay),
    [actions.handlePlay, onPlay, createVideoEventHandler]
  );

  const handlePause = useMemo(
    () => createVideoEventHandler(actions.handlePause, onPause),
    [actions.handlePause, onPause, createVideoEventHandler]
  );

  const handleDurationChange = useMemo(
    () =>
      createVideoEventHandler(actions.handleDurationChange, onDurationChange),
    [actions.handleDurationChange, onDurationChange, createVideoEventHandler]
  );

  const handleTimeUpdate = useMemo(
    () => createVideoEventHandler(actions.handleTimeUpdate, onTimeUpdate),
    [actions.handleTimeUpdate, onTimeUpdate, createVideoEventHandler]
  );

  const handleRateChange = useMemo(
    () => createVideoEventHandler(actions.handleRateChange, onRateChange),
    [actions.handleRateChange, onRateChange, createVideoEventHandler]
  );

  const handleVolumeChange = useMemo(
    () => createVideoEventHandler(actions.handleVolumeChange, onVolumeChange),
    [actions.handleVolumeChange, onVolumeChange, createVideoEventHandler]
  );

  const handleSuspend = useMemo(
    () => createVideoEventHandler(actions.handleSuspend, onSuspend),
    [actions.handleSuspend, onSuspend, createVideoEventHandler]
  );

  const handleAbort = useMemo(
    () => createVideoEventHandler(actions.handleAbort, onAbort),
    [actions.handleAbort, onAbort, createVideoEventHandler]
  );

  const handleEmptied = useMemo(
    () => createVideoEventHandler(actions.handleEmptied, onEmptied),
    [actions.handleEmptied, onEmptied, createVideoEventHandler]
  );

  const handleStalled = useMemo(
    () => createVideoEventHandler(actions.handleStalled, onStalled),
    [actions.handleStalled, onStalled, createVideoEventHandler]
  );

  const handleResize = useMemo(
    () => createVideoEventHandler(actions.handleResize, onResize),
    [actions.handleResize, onResize, createVideoEventHandler]
  );

  const throttledProgress = useMemo(
    () =>
      throttle(() => {
        actions.handleProgressChange(getVideoProperties());
      }, 250),
    [actions, getVideoProperties]
  );

  const handleProgress = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      throttledProgress();
      onProgress?.(event);
    },
    [onProgress, throttledProgress]
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      actions.handleError(getVideoProperties());
      onError?.(event);
    },
    [actions, getVideoProperties, onError]
  );

  const handleSeeking = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      actions.handleSeeking(getVideoProperties());
      onSeeking?.(event);
    },
    [actions, getVideoProperties, onSeeking]
  );

  const handleSeeked = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      actions.handleSeeked(getVideoProperties());
      onSeeked?.(event);
    },
    [actions, getVideoProperties, onSeeked]
  );

  const handleEnd = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = videoRef.current;
      if (loop && video) {
        video.currentTime = 0;
        const promise = video.play() as Promise<void> | undefined;
        promise?.catch(() => {});
      } else if (video && !player.paused) {
        video.pause();
      }
      actions.handleEnd(getVideoProperties());
      onEnded?.(event);
    },
    [actions, getVideoProperties, loop, onEnded, player.paused]
  );

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = videoRef.current;
      if (typeof startTime === 'number' && startTime > 0 && video) {
        video.currentTime = startTime;
      }
      actions.handleLoadedMetaData(getVideoProperties());
      onLoadedMetadata?.(event);
    },
    [actions, getVideoProperties, onLoadedMetadata, startTime]
  );

  const handleLoadedData = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      actions.handleLoadedData(getVideoProperties());
      onLoadedData?.(event);
    },
    [actions, getVideoProperties, onLoadedData]
  );

  const handleTextTrackChange = useCallback(() => {
    const video = videoRef.current;
    if (video && video.textTracks) {
      const activeTextTrack = Array.from(video.textTracks).find(
        (textTrack) => textTrack.mode === 'showing'
      );
      if (activeTextTrack !== player.activeTextTrack) {
        actions.activateTextTrack(activeTextTrack ?? null);
      }
    }
  }, [actions, player.activeTextTrack]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (video.textTracks) {
      video.textTracks.onaddtrack = handleTextTrackChange;
      video.textTracks.onremovetrack = handleTextTrackChange;
    }

    const handleEnterPiP = () => actions.handlePictureInPictureChange(true);
    const handleLeavePiP = () => actions.handlePictureInPictureChange(false);

    video.addEventListener('enterpictureinpicture', handleEnterPiP);
    video.addEventListener('leavepictureinpicture', handleLeavePiP);

    return () => {
      video.removeEventListener('enterpictureinpicture', handleEnterPiP);
      video.removeEventListener('leavepictureinpicture', handleLeavePiP);
    };
  }, [actions, handleTextTrackChange]);

  const apiRef = useRef<VideoAPI>();
  if (!apiRef.current) {
    const getVideo = () => videoRef.current;
    apiRef.current = {
      play() {
        const promise = getVideo()?.play() as Promise<void> | undefined;
        if (promise && typeof promise.catch === 'function') {
          promise.catch(() => {});
        }
      },
      pause() {
        const video = getVideo();
        const promiseLike = video?.pause() as unknown;
        if (
          typeof promiseLike === 'object' &&
          promiseLike !== null &&
          'catch' in (promiseLike as Record<string, unknown>) &&
          typeof (promiseLike as Promise<void>).catch === 'function'
        ) {
          (promiseLike as Promise<void>).catch(() => {});
        }
      },
      load() {
        getVideo()?.load();
      },
      addTextTrack(kind: TextTrackKind, label?: string, language?: string) {
        const video = getVideo();
        return video
          ? video.addTextTrack(kind, label, language)
          : ({} as TextTrack);
      },
      canPlayType: (...args: Parameters<HTMLVideoElement['canPlayType']>) =>
        getVideo()?.canPlayType(...args) ?? '',
      togglePlay() {
        const video = getVideo();
        if (!video) {
          return;
        }
        if (video.paused) {
          const promise = video.play() as Promise<void> | undefined;
          if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {});
          }
        } else {
          const promiseLike = video.pause() as unknown;
          if (
            typeof promiseLike === 'object' &&
            promiseLike !== null &&
            'catch' in (promiseLike as Record<string, unknown>) &&
            typeof (promiseLike as Promise<void>).catch === 'function'
          ) {
            (promiseLike as Promise<void>).catch(() => {});
          }
        }
      },
      seek(time: number) {
        const video = getVideo();
        if (!video) {
          return;
        }
        try {
          video.currentTime = time;
        } catch (err) {
          // ignore
        }
      },
      forward(seconds: number) {
        const video = getVideo();
        if (video) {
          apiRef.current?.seek(video.currentTime + seconds);
        }
      },
      replay(seconds: number) {
        apiRef.current?.forward(-seconds);
      },
      toggleFullscreen() {
        propsRef.current.actions.toggleFullscreen(propsRef.current.player);
      },
      get playbackRate() {
        return getVideo()?.playbackRate ?? 1;
      },
      set playbackRate(rate: number) {
        const video = getVideo();
        if (video) {
          video.playbackRate = rate;
        }
      },
      get muted() {
        return getVideo()?.muted ?? false;
      },
      set muted(value: boolean) {
        const video = getVideo();
        if (video) {
          video.muted = value;
        }
      },
      get volume() {
        return getVideo()?.volume ?? 1;
      },
      set volume(value: number) {
        const video = getVideo();
        if (video) {
          video.volume = Math.max(0, Math.min(1, value));
        }
      },
      get videoWidth() {
        return getVideo()?.videoWidth ?? 0;
      },
      get videoHeight() {
        return getVideo()?.videoHeight ?? 0;
      },
      get video() {
        return getVideo();
      },
    } as VideoAPI;
  }

  useImperativeHandle(ref, () => apiRef.current as VideoAPI, []);

  const renderedChildren = useMemo(() => {
    if (!apiRef.current) {
      return null;
    }

    const sharedProps = {
      ...props,
      video: apiRef.current,
    };

    return React.Children.toArray(children)
      .filter(isVideoChild)
      .map((child) => {
        const element = child as ReactElement;
        if (typeof element.type === 'string') {
          if (element.type === 'source') {
            const childProps = { ...element.props };
            const originalOnError = childProps.onError;
            childProps.onError = (...args: unknown[]) => {
              if (originalOnError) {
                originalOnError(...args);
              }
              actions.handleError(getVideoProperties());
            };
            return React.cloneElement(element, childProps);
          }
          return element;
        }

        return React.cloneElement(element, sharedProps);
      });
  }, [actions, children, getVideoProperties, props]);

  return (
    <video
      className={classNames('video-react-player-video', className)}
      id={videoId}
      crossOrigin={crossOrigin}
      ref={videoRef}
      muted={muted}
      preload={preload}
      loop={loop}
      playsInline={playsInline}
      autoPlay={autoPlay}
      poster={poster}
      src={src}
      onLoadStart={handleLoadStart}
      onWaiting={handleWaiting}
      onCanPlay={handleCanPlay}
      onCanPlayThrough={handleCanPlayThrough}
      onPlaying={handlePlaying}
      onEnded={handleEnd}
      onSeeking={handleSeeking}
      onSeeked={handleSeeked}
      onPlay={handlePlay}
      onPause={handlePause}
      onProgress={handleProgress}
      onDurationChange={handleDurationChange}
      onError={handleError}
      onSuspend={handleSuspend}
      onAbort={handleAbort}
      onEmptied={handleEmptied}
      onStalled={handleStalled}
      onLoadedMetadata={handleLoadedMetadata}
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onRateChange={handleRateChange}
      onVolumeChange={handleVolumeChange}
      onResize={handleResize}
      tabIndex={-1}
    >
      {renderedChildren}
    </video>
  );
});

Video.displayName = 'Video';

export default Video;
