/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactEventHandler, ReactNode } from 'react';

declare module 'video-react-player' {
  type PreloadType = 'auto' | 'metadata' | 'none';

  interface PlayerPropsType {
    children?: any;

    width?: string | number;
    height?: string | number;
    fluid?: boolean; // = true;
    bigPlayButtonPosition?: 'left' | 'center';
    hideDefaultBigPlayButton?: boolean;
    muted?: boolean; // = false;
    playsInline?: boolean; // = false;
    aspectRatio?: string; // = 'auto';
    className?: string;
    videoId?: string;

    startTime?: number;
    loop?: boolean;
    autoPlay?: boolean;
    src?: string;
    poster?: string;
    preload?: PreloadType; // = 'auto';

    onLoadStart?: ReactEventHandler;
    onWaiting?: ReactEventHandler;
    onCanPlay?: ReactEventHandler;
    onCanPlayThrough?: ReactEventHandler;
    onPlaying?: ReactEventHandler;
    onEnded?: ReactEventHandler;
    onSeeking?: ReactEventHandler;
    onSeeked?: ReactEventHandler;
    onPlay?: ReactEventHandler;
    onPause?: ReactEventHandler;
    onProgress?: ReactEventHandler;
    onDurationChange?: ReactEventHandler;
    onError?: ReactEventHandler;
    onSuspend?: ReactEventHandler;
    onAbort?: ReactEventHandler;
    onEmptied?: ReactEventHandler;
    onStalled?: ReactEventHandler;
    onLoadedMetadata?: ReactEventHandler;
    onLoadedData?: ReactEventHandler;
    onTimeUpdate?: ReactEventHandler;
    onRateChange?: ReactEventHandler;
    onVolumeChange?: ReactEventHandler;

    store?: object;
  }

  class Player extends React.Component<PlayerPropsType> {
    readonly video: Video;

    getDefaultChildren(originalChildren: ReactNode): Array<React.Component>;

    getChildren(props: PlayerPropsType): Array<React.Component>;

    setWidthOrHeight(style: object, name: string, value: string | number): void;

    getStyle(): object;

    // get redux state
    // { player, operation }
    getState(): object;

    // get playback rate
    get playbackRate(): number;

    // set playback rate
    // speed of video
    set playbackRate(rate: number);

    get muted(): boolean;

    set muted(val: boolean);

    get volume(): number;

    set volume(val: number);

    // video width
    get videoWidth(): number;

    // video height
    get videoHeight(): number;

    // play the video
    play(): void;

    // pause the video
    pause(): void;

    // Change the video source and re-load the video:
    load(): void;

    // Add a new text track to the video
    addTextTrack(
      kind: TextTrackKind,
      label?: string,
      language?: string
    ): TextTrack;

    // Check if your browser can play different types of video:
    canPlayType(type: string): CanPlayTypeResult;

    // seek video by time
    seek(time: number): void;

    // jump forward x seconds
    forward(seconds: number): void;

    // jump back x seconds
    replay(seconds: number): void;

    // enter or exist full screen
    toggleFullscreen(): void;

    // subscribe to player state change
    subscribeToStateChange(
      listener: (state: any, prevState: any) => void
    ): void;
  }

  interface VideoPropsType {
    actions?: object;
    player?: object;
    children?: any;
    startTime?: number;
    loop?: boolean;
    muted?: boolean;
    autoPlay?: boolean;
    playsInline?: boolean;
    src?: string;
    poster?: string;
    className?: string;
    preload?: PreloadType;
    crossOrigin?: string;

    onLoadStart?: ReactEventHandler;
    onWaiting?: ReactEventHandler;
    onCanPlay?: ReactEventHandler;
    onCanPlayThrough?: ReactEventHandler;
    onPlaying?: ReactEventHandler;
    onEnded?: ReactEventHandler;
    onSeeking?: ReactEventHandler;
    onSeeked?: ReactEventHandler;
    onPlay?: ReactEventHandler;
    onPause?: ReactEventHandler;
    onProgress?: ReactEventHandler;
    onDurationChange?: ReactEventHandler;
    onError?: ReactEventHandler;
    onSuspend?: ReactEventHandler;
    onAbort?: ReactEventHandler;
    onEmptied?: ReactEventHandler;
    onStalled?: ReactEventHandler;
    onLoadedMetadata?: ReactEventHandler;
    onLoadedData?: ReactEventHandler;
    onTimeUpdate?: ReactEventHandler;
    onRateChange?: ReactEventHandler;
    onVolumeChange?: ReactEventHandler;
    onResize?: ReactEventHandler;
  }

  class Video extends React.Component<VideoPropsType> {
    // get all video properties
    getProperties(): any;

    // get playback rate
    get playbackRate(): number;

    // set playback rate
    // speed of video
    set playbackRate(rate: number);

    get muted(): boolean;

    set muted(val: boolean);

    get volume(): number;

    set volume(val: number);

    // video width
    get videoWidth(): number;

    // video height
    get videoHeight(): number;

    // play the video
    play(): void;

    // pause the video
    pause(): void;

    // Change the video source and re-load the video:
    load(): void;

    // Add a new text track to the video
    addTextTrack(
      kind: TextTrackKind,
      label?: string,
      language?: string
    ): TextTrack;

    // Check if your browser can play different types of video:
    canPlayType(type: string): CanPlayTypeResult;

    // toggle play
    togglePlay(): void;

    // seek video by time
    seek(time: number): void;

    // jump forward x seconds
    forward(seconds: number): void;

    // jump back x seconds
    replay(seconds: number): void;

    // enter or exist full screen
    toggleFullscreen(): void;
  }

  interface BigPlayButtonPropsType {
    actions?: object;
    player?: object;
    position?: 'center' | 'left'; // default: 'left'
    className?: string;
  }

  class BigPlayButton extends React.Component<BigPlayButtonPropsType> {}

  interface LoadingSpinnerPropsType {
    player?: object;
    className?: string;
  }
  class LoadingSpinner extends React.Component<LoadingSpinnerPropsType> {}

  interface PosterImagePropsType {
    poster?: string;
    player?: object;
    actions?: object;
    className?: string;
  }
  class PosterImage extends React.Component<PosterImagePropsType> {}

  interface BezelPropsType {
    manager?: object;
    className?: string;
  }
  class Bezel extends React.Component<BezelPropsType> {}

  interface ShortcutPropsType {
    clickable?: boolean; // = true;
    dblclickable?: boolean; // = true;
    manager?: object;
    actions?: object;
    player?: object;
    shortcuts?: Array<any>;
  }
  class Shortcut extends React.Component<ShortcutPropsType> {}

  interface ControlBarPropsType {
    children?: any;
    autoHide?: boolean; // = true;
    autoHideTime?: number; // used in Player
    disableDefaultControls?: boolean;
    disableCompletely?: boolean; // = false;
    className?: string;
  }
  class ControlBar extends React.Component<ControlBarPropsType> {}

  interface PlayTogglePropsType {
    actions?: object;
    player?: object;
    className?: string;
  }
  class PlayToggle extends React.Component<PlayTogglePropsType> {}

  type ForwardSecondsType = 5 | 10 | 30;
  interface ForwardControlPropsType {
    actions?: object;
    className?: string;
    seconds?: ForwardSecondsType; // = 10;
  }
  class ForwardControl extends React.Component<ForwardControlPropsType> {}

  interface ReplayControlPropsType {
    actions?: object;
    className?: string;
    seconds?: ForwardSecondsType; // = 10;
  }
  class ReplayControl extends React.Component<ReplayControlPropsType> {}

  interface FullscreenTogglePropsType {
    actions?: object;
    player?: object;
    className?: string;
  }
  class FullscreenToggle extends React.Component<FullscreenTogglePropsType> {}

  interface ProgressControlPropsType {
    player?: object;
    className?: string;
  }
  class ProgressControl extends React.Component<ProgressControlPropsType> {}

  interface SeekBarPropsType {
    player?: object;
    mouseTime?: object;
    actions?: object;
    className?: string;
  }
  class SeekBar extends React.Component<SeekBarPropsType> {
    /**
     * Get percentage of video played
     *
     * @return {Number} Percentage played
     * @method getPercent
     */
    getPercent(): number;
  }

  interface SliderPropsType {
    className?: string;
    onMouseDown?: ReactEventHandler;
    onMouseMove?: ReactEventHandler;
    stepForward?: Function;
    stepBack?: Function;
    sliderActive?: ReactEventHandler;
    sliderInactive?: ReactEventHandler;
    onMouseUp?: ReactEventHandler;
    onFocus?: ReactEventHandler;
    onBlur?: ReactEventHandler;
    onClick?: ReactEventHandler;
    getPercent?: () => number;
    vertical?: boolean;
    children?: ReactNode;
    label?: string;
    valuenow?: string;
    valuetext?: string;
  }
  class Slider extends React.Component<SliderPropsType> {}

  interface PlayProgressBarPropsType {
    currentTime?: number;
    duration?: number;
    percentage?: string;
    className?: string;
  }
  class PlayProgressBar extends React.Component<PlayProgressBarPropsType> {}

  interface LoadProgressBarPropsType {
    duration?: number;
    buffered?: object;
    className?: string;
  }
  const LoadProgressBar: React.FC<LoadProgressBarPropsType>;

  interface MouseTimeDisplayPropsType {
    duration?: number;
    mouseTime?: {
      time: number;
      position: number;
    };
    className?: string;
    text?: string;
  }
  const MouseTimeDisplay: React.FC<MouseTimeDisplayPropsType>;

  interface RemainingTimeDisplayPropsType {
    player?: {
      currentTime: number;
      duration: number;
    };
    className?: string;
  }
  const RemainingTimeDisplay: React.FC<RemainingTimeDisplayPropsType>;

  interface CurrentTimeDisplayPropsType {
    player?: {
      currentTime: number;
      duration: number;
    };
    className?: string;
  }
  const CurrentTimeDisplay: React.FC<CurrentTimeDisplayPropsType>;

  interface DurationDisplayPropsType {
    player?: {
      duration: number;
    };
    className?: string;
  }
  const DurationDisplay: React.FC<DurationDisplayPropsType>;

  interface TimeDividerPropsType {
    separator?: string;
    className?: string;
  }
  const TimeDivider: React.FC<TimeDividerPropsType>;

  interface VolumeMenuButtonPropsType {
    player?: {
      volume: number;
      muted: boolean;
    };
    actions?: object;
    vertical?: boolean;
    className?: string;
    alwaysShowVolume?: boolean;
  }
  class VolumeMenuButton extends React.Component<VolumeMenuButtonPropsType> {
    get volumeLevel(): number;
  }

  interface PlaybackRateMenuButtonPropsType {
    player?: object;
    actions?: object;
    rates?: Array<number>; // = [2, 1.5, 1.25, 1, 0.5, 0.25];
    className?: string;
  }
  class PlaybackRateMenuButton extends React.Component<PlaybackRateMenuButtonPropsType> {}

  interface ClosedCaptionButtonPropsType {
    player?: object;
    actions?: object;
    className?: string;
    offMenuText?: string; // = 'Off';
    showOffMenu?: boolean; // = true;
    kinds?: Array<string>; // = ['captions', 'subtitles']; // `kind`s of TextTrack to look for to associate it with this menu.
  }
  class ClosedCaptionButton extends React.Component<ClosedCaptionButtonPropsType> {}

  class PlaybackRate extends React.Component {}

  interface MenuButtonPropsType {
    inline?: boolean;
    items?: Array<any>;
    className?: string;
    onSelectItem?: ReactEventHandler;
    children?: any;
    selectedIndex?: number;
  }
  class MenuButton extends React.Component<MenuButtonPropsType> {}

  namespace playerActions {
    type OPERATE = 'video-react-player/OPERATE';
    type FULLSCREEN_CHANGE = 'video-react-player/FULLSCREEN_CHANGE';
    type PLAYER_ACTIVATE = 'video-react-player/PLAYER_ACTIVATE';
    type USER_ACTIVATE = 'video-react-player/USER_ACTIVATE';

    function handleFullscreenChange(isFullscreen: boolean): {
      type: FULLSCREEN_CHANGE;
      isFullscreen: boolean;
    };

    function activate(activity: any): {
      type: PLAYER_ACTIVATE;
      activity: any;
    };

    function userActivate(activity: any): {
      type: USER_ACTIVATE;
      activity: any;
    };

    function play(operation: { action: 'play'; source: string }): {
      type: OPERATE;
      operation: {
        action: 'play';
        source: string;
      };
    };

    function pause(operation: { action: 'pause'; source: string }): {
      type: OPERATE;
      operation: {
        action: 'pause';
        source: string;
      };
    };

    function togglePlay(operation?: {
      action: 'toggle-play';
      source: string;
    }): {
      type: OPERATE;
      operation?: {
        action: 'toggle-play';
        source: string;
      };
    };

    // seek video by time
    function seek(
      time: number,
      operation?: {
        action: 'seek';
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: 'seek';
        source: string;
      };
    };

    // jump forward x seconds
    function forward(
      seconds: number,
      operation?: {
        action: string;
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: string;
        source: string;
      };
    };

    // jump back x seconds
    function replay(
      seconds: number,
      operation?: {
        action: string;
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: string;
        source: string;
      };
    };

    function changeRate(
      rate: number,
      operation?: {
        action: 'change-rate';
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: 'change-rate';
        source: string;
      };
    };

    function changeVolume(
      volume: number,
      operation?: {
        action: 'change-volume';
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: 'change-volume';
        source: string;
      };
    };

    function mute(
      muted: boolean,
      operation?: {
        action: 'muted' | 'unmuted';
        source: string;
      }
    ): {
      type: OPERATE;
      operation?: {
        action: 'muted' | 'unmuted';
        source: string;
      };
    };

    function toggleFullscreen(player: any): {
      type: string;
      [key: string]: any;
    };
  }

  namespace videoActions {
    type LOAD_START = 'video-react-player/LOAD_START';
    type CAN_PLAY = 'video-react-player/CAN_PLAY';
    type WAITING = 'video-react-player/WAITING';
    type CAN_PLAY_THROUGH = 'video-react-player/CAN_PLAY_THROUGH';
    type PLAYING = 'video-react-player/PLAYING';
    type PLAY = 'video-react-player/PLAY';
    type PAUSE = 'video-react-player/PAUSE';
    type END = 'video-react-player/END';
    type SEEKING = 'video-react-player/SEEKING';
    type SEEKED = 'video-react-player/SEEKED';
    type SEEKING_TIME = 'video-react-player/SEEKING_TIME';
    type END_SEEKING = 'video-react-player/END_SEEKING';
    type DURATION_CHANGE = 'video-react-player/DURATION_CHANGE';
    type TIME_UPDATE = 'video-react-player/TIME_UPDATE';
    type VOLUME_CHANGE = 'video-react-player/VOLUME_CHANGE';
    type PROGRESS_CHANGE = 'video-react-player/PROGRESS_CHANGE';
    type RATE_CHANGE = 'video-react-player/RATE_CHANGE';
    type SUSPEND = 'video-react-player/SUSPEND';
    type ABORT = 'video-react-player/ABORT';
    type EMPTIED = 'video-react-player/EMPTIED';
    type STALLED = 'video-react-player/STALLED';
    type LOADED_META_DATA = 'video-react-player/LOADED_META_DATA';
    type LOADED_DATA = 'video-react-player/LOADED_DATA';
    type RESIZE = 'video-react-player/RESIZE';
    type ERROR = 'video-react-player/ERROR';
    type ACTIVATE_TEXT_TRACK = 'video-react-player/ACTIVATE_TEXT_TRACK';

    function handleLoadStart(videoProps: any): {
      type: LOAD_START;
      videoProps: any;
    };

    function handleCanPlay(videoProps: any): {
      type: CAN_PLAY;
      videoProps: any;
    };

    function handleWaiting(videoProps: any): {
      type: WAITING;
      videoProps: any;
    };

    function handleCanPlayThrough(videoProps: any): {
      type: CAN_PLAY_THROUGH;
      videoProps: any;
    };

    function handlePlaying(videoProps: any): {
      type: PLAYING;
      videoProps: any;
    };

    function handlePlay(videoProps: any): {
      type: PLAY;
      videoProps: any;
    };

    function handlePause(videoProps: any): {
      type: PAUSE;
      videoProps: any;
    };

    function handleEnd(videoProps: any): {
      type: END;
      videoProps: any;
    };

    function handleSeeking(videoProps: any): {
      type: SEEKING;
      videoProps: any;
    };

    function handleSeeked(videoProps: any): {
      type: SEEKED;
      videoProps: any;
    };

    function handleDurationChange(videoProps: any): {
      type: DURATION_CHANGE;
      videoProps: any;
    };

    function handleTimeUpdate(videoProps: any): {
      type: TIME_UPDATE;
      videoProps: any;
    };

    function handleVolumeChange(videoProps: any): {
      type: VOLUME_CHANGE;
      videoProps: any;
    };

    function handleProgressChange(videoProps: any): {
      type: PROGRESS_CHANGE;
      videoProps: any;
    };

    function handleRateChange(videoProps: any): {
      type: RATE_CHANGE;
      videoProps: any;
    };

    function handleSuspend(videoProps: any): {
      type: SUSPEND;
      videoProps: any;
    };

    function handleAbort(videoProps: any): {
      type: ABORT;
      videoProps: any;
    };

    function handleEmptied(videoProps: any): {
      type: EMPTIED;
      videoProps: any;
    };

    function handleStalled(videoProps: any): {
      type: STALLED;
      videoProps: any;
    };

    function handleLoadedMetaData(videoProps: any): {
      type: LOADED_META_DATA;
      videoProps: any;
    };

    function handleLoadedData(videoProps: any): {
      type: LOADED_DATA;
      videoProps: any;
    };

    function handleResize(videoProps: any): {
      type: RESIZE;
      videoProps: any;
    };

    function handleError(videoProps: any): {
      type: ERROR;
      videoProps: any;
    };

    function handleSeekingTime(time: any): {
      type: SEEKING_TIME;
      time: any;
    };

    function handleEndSeeking(time: any): {
      type: END_SEEKING;
      time: any;
    };

    function activateTextTrack(textTrack: any): {
      type: ACTIVATE_TEXT_TRACK;
      textTrack: any;
    };
  }

  function playerReducer(state: any, action: any): any;
  function operationReducer(state: any, action: any): any;
}
