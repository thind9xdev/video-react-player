/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-undef, no-unused-expressions */

import type Manager from '../Manager';
import type { OperationState } from '../reducers/operation';
import type { PlayerState } from '../reducers/player';

import fullscreen from '../utils/fullscreen';
import {
  handlePictureInPictureChange,
  handleQualityChange,
  handleTheaterModeChange,
} from './video';

export const OPERATE = 'video-react-player/OPERATE';
export const FULLSCREEN_CHANGE = 'video-react-player/FULLSCREEN_CHANGE';
export const PLAYER_ACTIVATE = 'video-react-player/PLAYER_ACTIVATE';
export const USER_ACTIVATE = 'video-react-player/USER_ACTIVATE';

type OperationPayload = OperationState['operation'];

export function handleFullscreenChange(isFullscreen: boolean) {
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen,
  };
}

export function activate(activity: boolean) {
  return {
    type: PLAYER_ACTIVATE,
    activity,
  };
}

export function userActivate(activity: boolean) {
  return {
    type: USER_ACTIVATE,
    activity,
  };
}

export function play(
  this: Manager,
  operation: OperationPayload = {
    action: 'play',
    source: '',
  }
) {
  this.video?.play();

  return {
    type: OPERATE,
    operation,
  };
}

export function pause(
  this: Manager,
  operation: OperationPayload = {
    action: 'pause',
    source: '',
  }
) {
  this.video?.pause();

  return {
    type: OPERATE,
    operation,
  };
}

export function togglePlay(
  this: Manager,
  operation: OperationPayload = {
    action: 'toggle-play',
    source: '',
  }
) {
  this.video?.togglePlay();

  return {
    type: OPERATE,
    operation,
  };
}

// seek video by time
export function seek(
  this: Manager,
  time: number,
  operation: OperationPayload = {
    action: 'seek',
    source: '',
  }
) {
  this.video?.seek(time);

  return {
    type: OPERATE,
    operation,
  };
}

// jump forward x seconds
export function forward(
  this: Manager,
  seconds: number,
  operation: OperationPayload = {
    action: `forward-${seconds}`,
    source: '',
  }
) {
  this.video?.forward(seconds);

  return {
    type: OPERATE,
    operation,
  };
}

// jump back x seconds
export function replay(
  this: Manager,
  seconds: number,
  operation: OperationPayload = {
    action: `replay-${seconds}`,
    source: '',
  }
) {
  this.video?.replay(seconds);

  return {
    type: OPERATE,
    operation,
  };
}

export function changeRate(
  this: Manager,
  rate: number,
  operation: OperationPayload = {
    action: 'change-rate',
    source: '',
  }
) {
  if (this.video) {
    this.video.playbackRate = rate;
  }

  return {
    type: OPERATE,
    operation,
  };
}

export function changeVolume(
  this: Manager,
  volume: number,
  operation: OperationPayload = {
    action: 'change-volume',
    source: '',
  }
) {
  let v = volume;
  if (volume < 0) {
    v = 0;
  }
  if (volume > 1) {
    v = 1;
  }
  if (this.video) {
    this.video.volume = v;
  }

  return {
    type: OPERATE,
    operation,
  };
}

export function mute(
  this: Manager,
  muted: boolean,
  operation: OperationPayload = {
    action: muted ? 'muted' : 'unmuted',
    source: '',
  }
) {
  if (this.video) {
    this.video.muted = muted;
  }

  return {
    type: OPERATE,
    operation,
  };
}

export function toggleFullscreen(this: Manager, player: PlayerState) {
  if (fullscreen.enabled) {
    if (fullscreen.isFullscreen) {
      fullscreen.exit();
    } else if (this.rootElement) {
      fullscreen.request(this.rootElement);
    }
    return {
      type: OPERATE,
      operation: {
        action: 'toggle-fullscreen',
        source: '',
      },
    };
  }

  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen,
  };
}

export function togglePictureInPicture() {
  const next = !this.store.getState().player.isPictureInPicture;
  return handlePictureInPictureChange(next);
}

export function changeQuality(this: Manager, quality: string) {
  return handleQualityChange(quality);
}

export function takeScreenshot() {
  return {
    type: OPERATE,
    operation: {
      action: 'screenshot',
      source: 'control',
    },
  };
}

export function toggleTheaterMode(this: Manager, isTheater: boolean) {
  return handleTheaterModeChange(isTheater);
}
