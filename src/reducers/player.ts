import { AnyAction } from 'redux';

import {
  LOAD_START,
  CAN_PLAY,
  WAITING,
  CAN_PLAY_THROUGH,
  PLAYING,
  PLAY,
  PAUSE,
  END,
  SEEKING,
  SEEKED,
  SEEKING_TIME,
  END_SEEKING,
  DURATION_CHANGE,
  TIME_UPDATE,
  VOLUME_CHANGE,
  PROGRESS_CHANGE,
  RATE_CHANGE,
  SUSPEND,
  ABORT,
  EMPTIED,
  STALLED,
  LOADED_META_DATA,
  LOADED_DATA,
  ACTIVATE_TEXT_TRACK,
  RESIZE,
  ERROR,
  PICTURE_IN_PICTURE_CHANGE,
  LOOP_CHANGE,
  THEATER_MODE_CHANGE,
  QUALITY_CHANGE,
} from '../actions/video';
import {
  FULLSCREEN_CHANGE,
  PLAYER_ACTIVATE,
  USER_ACTIVATE,
} from '../actions/player';

export interface PlayerState {
  currentSrc: string | null;
  duration: number;
  currentTime: number;
  seekingTime: number;
  buffered: TimeRanges | null;
  textTracks: TextTrackList | TextTrack[] | null;
  waiting: boolean;
  seeking: boolean;
  paused: boolean;
  autoPaused: boolean;
  ended: boolean;
  playbackRate: number;
  muted: boolean;
  volume: number;
  readyState: number;
  networkState: number;
  videoWidth: number;
  videoHeight: number;
  hasStarted: boolean;
  userActivity: boolean;
  isActive: boolean;
  isFullscreen: boolean;
  isPictureInPicture: boolean;
  loop: boolean;
  isTheater: boolean;
  quality: string;
  activeTextTrack: TextTrack | null;
  error?: string;
}

const initialState: PlayerState = {
  currentSrc: null,
  duration: 0,
  currentTime: 0,
  seekingTime: 0,
  buffered: null,
  textTracks: null,
  waiting: false,
  seeking: false,
  paused: true,
  autoPaused: false,
  ended: false,
  playbackRate: 1,
  muted: false,
  volume: 1,
  readyState: 0,
  networkState: 0,
  videoWidth: 0,
  videoHeight: 0,
  hasStarted: false,
  userActivity: true,
  isActive: false,
  isFullscreen: false,
  isPictureInPicture: false,
  loop: false,
  isTheater: false,
  quality: 'auto',
  activeTextTrack: null,
};

export default function player(
  state: PlayerState = initialState,
  action: AnyAction
): PlayerState {
  switch (action.type) {
    case USER_ACTIVATE:
      return {
        ...state,
        userActivity: action.activity,
      };
    case PLAYER_ACTIVATE:
      return {
        ...state,
        isActive: action.activity,
      };
    case FULLSCREEN_CHANGE:
      return {
        ...state,
        isFullscreen: !!action.isFullscreen,
      };
    case SEEKING_TIME:
      return {
        ...state,
        seekingTime: action.time,
      };
    case END_SEEKING:
      return {
        ...state,
        seekingTime: 0,
      };
    case LOAD_START:
      return {
        ...state,
        ...action.videoProps,
        hasStarted: false,
        ended: false,
      };
    case CAN_PLAY:
      return {
        ...state,
        ...action.videoProps,
        waiting: false,
      };
    case WAITING:
      return {
        ...state,
        ...action.videoProps,
        waiting: true,
      };
    case CAN_PLAY_THROUGH:
    case PLAYING:
      return {
        ...state,
        ...action.videoProps,
        waiting: false,
      };
    case PLAY:
      return {
        ...state,
        ...action.videoProps,
        ended: false,
        paused: false,
        autoPaused: false,
        waiting: false,
        hasStarted: true,
      };
    case PAUSE:
      return {
        ...state,
        ...action.videoProps,
        paused: true,
      };
    case END:
      return {
        ...state,
        ...action.videoProps,
        ended: true,
      };
    case SEEKING:
      return {
        ...state,
        ...action.videoProps,
        seeking: true,
      };
    case SEEKED:
      return {
        ...state,
        ...action.videoProps,
        seeking: false,
      };
    case ERROR:
      return {
        ...state,
        ...action.videoProps,
        error: 'UNKNOWN ERROR',
        ended: true,
      };
    case DURATION_CHANGE:
    case TIME_UPDATE:
    case VOLUME_CHANGE:
    case PROGRESS_CHANGE:
    case RATE_CHANGE:
    case SUSPEND:
    case ABORT:
    case EMPTIED:
    case STALLED:
    case LOADED_META_DATA:
    case LOADED_DATA:
    case RESIZE:
      return {
        ...state,
        ...action.videoProps,
      };
    case ACTIVATE_TEXT_TRACK:
      return {
        ...state,
        activeTextTrack: action.textTrack,
      };
    case PICTURE_IN_PICTURE_CHANGE:
      return {
        ...state,
        isPictureInPicture: !!action.isPictureInPicture,
      };
    case LOOP_CHANGE:
      return {
        ...state,
        loop: !!action.loop,
      };
    case THEATER_MODE_CHANGE:
      return {
        ...state,
        isTheater: !!action.isTheater,
      };
    case QUALITY_CHANGE:
      return {
        ...state,
        quality: action.quality || 'auto',
      };
    default:
      return state;
  }
}
