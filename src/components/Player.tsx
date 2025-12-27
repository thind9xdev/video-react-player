/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import React, {
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Store } from 'redux';

import Manager, { VideoAPI } from '../Manager';

import BigPlayButton from './BigPlayButton';
import LoadingSpinner from './LoadingSpinner';
import PosterImage from './PosterImage';
import Video, { VideoProps } from './Video';
import Bezel from './Bezel';
import Shortcut from './Shortcut';
import ControlBar from './control-bar/ControlBar';

import * as browser from '../utils/browser';
import { focusNode } from '../utils/dom';
import { mergeAndSortChildren, isVideoChild, throttle } from '../utils';
import fullscreen from '../utils/fullscreen';

import type { RootState } from '../reducers';

export interface PlayerProps {
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  fluid?: boolean;
  /** Position for the default BigPlayButton ('left' | 'center'). */
  bigPlayButtonPosition?: 'left' | 'center';
  /** Force hide the default BigPlayButton (useful when supplying your own). */
  hideDefaultBigPlayButton?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  aspectRatio?: string;
  className?: string;
  videoId?: string;
  startTime?: number;
  loop?: boolean;
  autoPlay?: boolean;
  src?: string;
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
  onLoadStart?: PlayerEventHandler;
  onWaiting?: PlayerEventHandler;
  onCanPlay?: PlayerEventHandler;
  onCanPlayThrough?: PlayerEventHandler;
  onPlaying?: PlayerEventHandler;
  onEnded?: PlayerEventHandler;
  onSeeking?: PlayerEventHandler;
  onSeeked?: PlayerEventHandler;
  onPlay?: PlayerEventHandler;
  onPause?: PlayerEventHandler;
  onProgress?: PlayerEventHandler;
  onDurationChange?: PlayerEventHandler;
  onError?: PlayerEventHandler;
  onSuspend?: PlayerEventHandler;
  onAbort?: PlayerEventHandler;
  onEmptied?: PlayerEventHandler;
  onStalled?: PlayerEventHandler;
  onLoadedMetadata?: PlayerEventHandler;
  onLoadedData?: PlayerEventHandler;
  onTimeUpdate?: PlayerEventHandler;
  onRateChange?: PlayerEventHandler;
  onVolumeChange?: PlayerEventHandler;
  store?: Store<RootState>;
}

type PlayerEventHandler = VideoProps['onLoadStart'];

export interface PlayerHandle {
  readonly manager: Manager;
  readonly actions: ReturnType<Manager['getActions']>;
  readonly video: VideoAPI | null;
  getState: () => RootState;
  playbackRate: number;
  muted: boolean;
  volume: number;
  videoWidth: number;
  videoHeight: number;
  play: () => void;
  pause: () => void;
  load: () => void;
  addTextTrack: VideoAPI['addTextTrack'];
  canPlayType: VideoAPI['canPlayType'];
  seek: (time: number) => void;
  forward: (seconds: number) => void;
  replay: (seconds: number) => void;
  toggleFullscreen: () => void;
  subscribeToStateChange: (
    listener: Parameters<Manager['subscribeToPlayerStateChange']>[0]
  ) => ReturnType<Manager['subscribeToPlayerStateChange']>;
}

const defaultProps: Required<
  Pick<
    PlayerProps,
    'fluid' | 'muted' | 'playsInline' | 'preload' | 'aspectRatio'
  >
> = {
  fluid: true,
  muted: false,
  playsInline: false,
  preload: 'auto',
  aspectRatio: 'auto',
};

const Player = forwardRef<PlayerHandle, PlayerProps>((incomingProps, ref) => {
  const props = { ...defaultProps, ...incomingProps };
  const {
    children,
    width,
    height,
    fluid,
    bigPlayButtonPosition,
    hideDefaultBigPlayButton,
    aspectRatio,
    className,
    store,
    ...passThroughProps
  } = props;

  const managerRef = useRef<Manager>();
  if (!managerRef.current) {
    managerRef.current = new Manager(store);
  }
  const manager = managerRef.current;
  const actionsRef = useRef(manager.getActions());
  const actions = actionsRef.current;

  const videoComponentRef = useRef<VideoAPI | null>(null);
  const controlsHideTimerRef = useRef<number | null>(null);

  const [playerState, setPlayerState] = useState(manager.getState().player);

  const handleResize = useCallback(() => {}, []);

  useEffect(() => {
    const unsubscribe = manager.subscribeToPlayerStateChange(
      (state, prevState) => {
        if (state.isFullscreen !== prevState.isFullscreen) {
          handleResize();
          focusNode(manager.rootElement);
        }
        setPlayerState(state);
      }
    );
    return unsubscribe;
  }, [handleResize, manager]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleFullScreenChange = useCallback(
    (event: Event) => {
      if (event.target === manager.rootElement) {
        actions.handleFullscreenChange(Boolean(fullscreen.isFullscreen));
      }
    },
    [actions, manager]
  );

  useEffect(() => {
    fullscreen.addEventListener(handleFullScreenChange);
    return () => fullscreen.removeEventListener(handleFullScreenChange);
  }, [handleFullScreenChange]);

  useEffect(
    () => () => {
      if (controlsHideTimerRef.current) {
        clearTimeout(controlsHideTimerRef.current);
      }
    },
    []
  );

  const handleVideoRef = useCallback(
    (instance: VideoAPI | null) => {
      videoComponentRef.current = instance;
      manager.video = instance;
    },
    [manager]
  );

  const getDefaultChildren = useCallback(
    (
      originalChildren?: ReactNode,
      includeBigPlayButton = true,
      bigPlayPos?: 'left' | 'center'
    ) => [
      <Video
        ref={handleVideoRef}
        key="video"
        order={0}
        actions={actions}
        player={playerState}
      >
        {originalChildren}
      </Video>,
      <PosterImage
        key="poster-image"
        order={1}
        actions={actions}
        player={playerState}
      />,
      <LoadingSpinner
        key="loading-spinner"
        order={2}
        actions={actions}
        player={playerState}
      />,
      <Bezel key="bezel" order={3} manager={manager} />,
      includeBigPlayButton && (
        <BigPlayButton
          key="big-play-button"
          order={4}
          actions={actions}
          player={playerState}
          position={bigPlayPos}
        />
      ),
      <ControlBar
        key="control-bar"
        order={5}
        actions={actions}
        player={playerState}
      />,
      <Shortcut
        key="shortcut"
        order={99}
        actions={actions}
        player={playerState}
        manager={manager}
      />,
    ],
    [actions, handleVideoRef, manager, playerState]
  );

  const containsBigPlayButton = useCallback(
    (nodes: React.ReactNode): boolean => {
      let found = false;
      React.Children.forEach(nodes, (child) => {
        if (found) {
          return;
        }
        if (!React.isValidElement(child)) {
          return;
        }
        const t = child.type as React.ComponentType & {
          displayName?: string;
          name?: string;
        };
        const name = t.displayName || t.name;
        if (
          child.type === BigPlayButton ||
          name === 'BigPlayButton' ||
          (child.props as Record<string, unknown>)['data-big-play-button'] ===
            true
        ) {
          found = true;
          return;
        }
        if (child.props && (child.props as Record<string, unknown>).children) {
          if (
            containsBigPlayButton(
              (child.props as Record<string, unknown>)
                .children as React.ReactNode
            )
          ) {
            found = true;
          }
        }
      });
      return found;
    },
    []
  );

  const getChildren = useCallback(
    (propsForChildren: PlayerProps) => {
      // Do not forward layout-only props like `fluid` to children to avoid DOM attribute warnings.
      const {
        className: _ignored,
        children: originalChildren,
        fluid: _fluid,
        bigPlayButtonPosition: _bp,
        hideDefaultBigPlayButton: _hide,
        ...rest
      } = propsForChildren;
      const userChildren = React.Children.toArray(children).filter(
        (child) => !isVideoChild(child)
      );
      const hasUserBigPlayButton = containsBigPlayButton(children);
      const includeDefaultBigPlay =
        !hideDefaultBigPlayButton && !hasUserBigPlayButton;
      const defaultChildren = getDefaultChildren(
        originalChildren,
        includeDefaultBigPlay,
        bigPlayButtonPosition
      );
      const parentProps = {
        ...rest,
        actions,
        player: playerState,
        manager,
      };
      return mergeAndSortChildren(defaultChildren, userChildren, parentProps);
    },
    [
      actions,
      bigPlayButtonPosition,
      children,
      containsBigPlayButton,
      getDefaultChildren,
      hideDefaultBigPlayButton,
      manager,
      playerState,
    ]
  );

  const setWidthOrHeight = useCallback(
    (
      style: Record<string, string | number>,
      name: string,
      value?: string | number
    ) => {
      let styleVal: string | undefined;
      if (typeof value === 'string') {
        if (value === 'auto') {
          styleVal = 'auto';
        } else if (/\d+%/.test(value)) {
          styleVal = value;
        }
      } else if (typeof value === 'number') {
        styleVal = `${value}px`;
      }
      if (styleVal) {
        style[name] = styleVal;
      }
    },
    []
  );

  const playerStyle = useMemo(() => {
    const style: Record<string, string> = {};
    let resolvedAspectRatio = aspectRatio;

    if (resolvedAspectRatio === undefined || resolvedAspectRatio === 'auto') {
      if (playerState.videoWidth) {
        resolvedAspectRatio = `${playerState.videoWidth}:${playerState.videoHeight}`;
      } else {
        resolvedAspectRatio = '16:9';
      }
    }

    const [ratioWidth, ratioHeight] = resolvedAspectRatio
      .split(':')
      .map(Number);
    const ratioMultiplier = ratioHeight / ratioWidth;

    let resolvedWidth: string | number | undefined = width;
    if (resolvedWidth === undefined) {
      if (typeof height === 'number') {
        resolvedWidth = height / ratioMultiplier;
      } else if (typeof height === 'string' && height !== 'auto') {
        resolvedWidth = parseFloat(height) / ratioMultiplier;
      } else {
        resolvedWidth = playerState.videoWidth || 400;
      }
    }

    let resolvedHeight: string | number | undefined = height;
    if (resolvedHeight === undefined) {
      if (typeof resolvedWidth === 'number') {
        resolvedHeight = resolvedWidth * ratioMultiplier;
      } else if (
        typeof resolvedWidth === 'string' &&
        resolvedWidth !== 'auto'
      ) {
        resolvedHeight = parseFloat(resolvedWidth) * ratioMultiplier;
      }
    }

    if (fluid) {
      style.paddingTop = `${ratioMultiplier * 100}%`;
    } else {
      if (resolvedWidth !== undefined) {
        setWidthOrHeight(style, 'width', resolvedWidth);
      }
      if (resolvedHeight !== undefined) {
        setWidthOrHeight(style, 'height', resolvedHeight);
      }
    }

    return style;
  }, [
    aspectRatio,
    fluid,
    height,
    playerState.videoHeight,
    playerState.videoWidth,
    setWidthOrHeight,
    width,
  ]);

  const startControlsTimer = useCallback(() => {
    let controlBarActiveTime = 3000;
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element) || element.type !== ControlBar) {
        return;
      }
      const { autoHideTime } = element.props as { autoHideTime?: number };
      if (typeof autoHideTime === 'number') {
        controlBarActiveTime = autoHideTime;
      }
    });

    actions.userActivate(true);
    if (controlsHideTimerRef.current) {
      clearTimeout(controlsHideTimerRef.current);
    }
    controlsHideTimerRef.current = window.setTimeout(() => {
      actions.userActivate(false);
    }, controlBarActiveTime);
  }, [actions, children]);

  const throttledMouseMove = useMemo(
    () =>
      throttle(() => {
        startControlsTimer();
      }, 250),
    [startControlsTimer]
  );

  const handleMouseDown = useCallback(() => {
    startControlsTimer();
  }, [startControlsTimer]);

  const handleMouseMove = useCallback(() => {
    throttledMouseMove();
  }, [throttledMouseMove]);

  const handleKeyDown = useCallback(() => {
    startControlsTimer();
  }, [startControlsTimer]);

  const handleFocus = useCallback(() => {
    actions.activate(true);
  }, [actions]);

  const handleBlur = useCallback(() => {
    actions.activate(false);
  }, [actions]);

  const rootRef = useCallback(
    (node: HTMLDivElement | null) => {
      manager.rootElement = node;
    },
    [manager]
  );

  const childProps = useMemo(
    () => ({
      ...passThroughProps,
      fluid,
      bigPlayButtonPosition,
      hideDefaultBigPlayButton,
      player: playerState,
      actions,
      manager,
      store: manager.store,
      video: videoComponentRef.current?.video ?? null,
    }),
    [
      actions,
      bigPlayButtonPosition,
      fluid,
      hideDefaultBigPlayButton,
      manager,
      passThroughProps,
      playerState,
    ]
  );

  const childElements = useMemo(
    () => getChildren(childProps),
    [childProps, getChildren]
  );

  useImperativeHandle(
    ref,
    (): PlayerHandle => ({
      manager,
      actions,
      video: videoComponentRef.current,
      getState: () => manager.getState(),
      get playbackRate() {
        return videoComponentRef.current?.playbackRate ?? 1;
      },
      set playbackRate(rate: number) {
        if (videoComponentRef.current) {
          videoComponentRef.current.playbackRate = rate;
        }
      },
      get muted() {
        return videoComponentRef.current?.muted ?? false;
      },
      set muted(value: boolean) {
        if (videoComponentRef.current) {
          videoComponentRef.current.muted = value;
        }
      },
      get volume() {
        return videoComponentRef.current?.volume ?? 1;
      },
      set volume(value: number) {
        if (videoComponentRef.current) {
          videoComponentRef.current.volume = value;
        }
      },
      get videoWidth() {
        return videoComponentRef.current?.videoWidth ?? 0;
      },
      get videoHeight() {
        return videoComponentRef.current?.videoHeight ?? 0;
      },
      play() {
        videoComponentRef.current?.play();
      },
      pause() {
        videoComponentRef.current?.pause();
      },
      load() {
        videoComponentRef.current?.load();
      },
      addTextTrack: (...args) =>
        videoComponentRef.current?.addTextTrack(...args) ?? ({} as TextTrack),
      canPlayType: (...args) =>
        videoComponentRef.current?.canPlayType(...args) ?? '',
      seek(time: number) {
        videoComponentRef.current?.seek(time);
      },
      forward(seconds: number) {
        videoComponentRef.current?.forward(seconds);
      },
      replay(seconds: number) {
        videoComponentRef.current?.replay(seconds);
      },
      toggleFullscreen() {
        videoComponentRef.current?.toggleFullscreen();
      },
      subscribeToStateChange: (listener) =>
        manager.subscribeToPlayerStateChange(listener),
    }),
    [actions, manager]
  );

  const { paused, hasStarted, waiting, seeking, isFullscreen, userActivity } =
    playerState;

  return (
    <div
      className={classNames(
        {
          'video-react-player-controls-enabled': true,
          'video-react-player-has-started': hasStarted,
          'video-react-player-paused': paused,
          'video-react-player-playing': !paused,
          'video-react-player-waiting': waiting,
          'video-react-player-seeking': seeking,
          'video-react-player-fluid': fluid,
          'video-react-player-fullscreen': isFullscreen,
          'video-react-player-user-inactive': !userActivity,
          'video-react-player-user-active': userActivity,
          'video-react-player-workinghover': !browser.IS_IOS,
        },
        'video-react-player',
        className
      )}
      style={playerStyle}
      ref={rootRef}
      role="region"
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
      onTouchMove={handleMouseMove}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      {childElements}
    </div>
  );
});

Player.displayName = 'Player';

export default Player;
