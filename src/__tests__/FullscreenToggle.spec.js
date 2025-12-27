import React from 'react';
import { shallow } from 'enzyme';
import FullscreenToggle from '../components/control-bar/FullscreenToggle';

describe('FullscreenToggle', () => {
  it('should render with "button" tag', () => {
    const wrapper = shallow(
      <FullscreenToggle
        actions={{}}
        player={{
          isFullscreen: false
        }}
      />
    );

    expect(wrapper.type()).toBe('button');
  });

  it('should render with "video-react-player-fullscreen-control" class', () => {
    const wrapper = shallow(
      <FullscreenToggle
        actions={{}}
        player={{
          isFullscreen: false
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-fullscreen-control')).toBe(true);
  });

  it('should render with "video-react-player-icon-fullscreen-exit" class when player is full screen', () => {
    const wrapper = shallow(
      <FullscreenToggle
        actions={{}}
        player={{
          isFullscreen: true
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-icon-fullscreen-exit')).toBe(true);
  });

  it('should render with "video-react-player-icon-fullscreen" class when player exits full screen', () => {
    const wrapper = shallow(
      <FullscreenToggle
        actions={{}}
        player={{
          isFullscreen: false
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-icon-fullscreen')).toBe(true);
  });
});
