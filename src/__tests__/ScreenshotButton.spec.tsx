/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';
import ScreenshotButton from '../components/control-bar/ScreenshotButton';
import type { PlayerState } from '../reducers/player';

const makePlayer = (partial: Partial<PlayerState>): PlayerState => ({
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
  ...partial,
});

describe('ScreenshotButton', () => {
  it('renders a screenshot control button', () => {
    const player = makePlayer({});
    const wrapper = shallow(
      <ScreenshotButton actions={{ takeScreenshot: jest.fn() } as any} player={player} className="custom" />
    );
    expect(wrapper.type()).toBe('button');
    expect(wrapper.hasClass('video-react-player-screenshot-control')).toBe(true);
    expect(wrapper.hasClass('video-react-player-icon-camera')).toBe(true);
  });

  it('calls takeScreenshot on click', () => {
    const takeScreenshot = jest.fn();
    const player = makePlayer({});
    const wrapper = shallow(
      <ScreenshotButton actions={{ takeScreenshot } as any} player={player} className="custom" />
    );

    wrapper.simulate('click');

    expect(takeScreenshot).toHaveBeenCalledTimes(1);
  });
});
