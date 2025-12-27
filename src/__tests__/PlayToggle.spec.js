import React from 'react';
import { shallow } from 'enzyme';
import PlayToggle from '../components/control-bar/PlayToggle';

describe('PlayToggle', () => {
  it('should render with "button" tag', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );

    expect(wrapper.type()).toBe('button');
  });

  it('should render with "video-react-player-button" class', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-button')).toBe(true);
  });

  it('should render with "video-react-player-paused" class when video has been paused', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: true
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-paused')).toBe(true);
  });

  it('should render with "video-react-player-playing" class when video has been playing', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-playing')).toBe(true);
  });
});
