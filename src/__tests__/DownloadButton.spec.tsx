/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';
import DownloadButton from '../components/control-bar/DownloadButton';
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

describe('DownloadButton', () => {
  const originalCreateElement = document.createElement;

  afterEach(() => {
    document.createElement = originalCreateElement;
    jest.restoreAllMocks();
  });

  it('renders a button with download control classes', () => {
    const player = makePlayer({ currentSrc: 'video.mp4' });
    const wrapper = shallow(
      <DownloadButton player={player} filename="foo" />
    );
    expect(wrapper.type()).toBe('button');
    expect(wrapper.hasClass('video-react-player-download-control')).toBe(true);
    expect(wrapper.hasClass('video-react-player-icon-download')).toBe(true);
  });

  it('invokes anchor click with download when currentSrc exists', () => {
    const click = jest.fn();
    const anchorMock = document.createElement('a');
    anchorMock.click = click as any;
    anchorMock.href = '';
    anchorMock.download = '';
    const createElementSpy = jest.fn(() => anchorMock as HTMLAnchorElement);
    document.createElement = createElementSpy as unknown as typeof document.createElement;

    const player = makePlayer({ currentSrc: 'http://example.com/video.mp4' });
    const wrapper = shallow(
      <DownloadButton player={player} filename="my-video" />
    );

    wrapper.simulate('click');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(anchorMock.href).toBe('http://example.com/video.mp4');
    expect(anchorMock.download).toBe('my-video');
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('does nothing when currentSrc is missing', () => {
    const createElementSpy = jest.fn();
    document.createElement = createElementSpy as unknown as typeof document.createElement;

    const player = makePlayer({ currentSrc: '' });
    const wrapper = shallow(
      <DownloadButton player={player} filename="unused" />
    );

    wrapper.simulate('click');

    expect(createElementSpy).not.toHaveBeenCalled();
  });
});
