/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';
import TheaterModeToggle from '../components/control-bar/TheaterModeToggle';

describe('TheaterModeToggle', () => {
  it('renders theater icon when not in theater mode', () => {
    const wrapper = shallow(
      <TheaterModeToggle actions={{ toggleTheaterMode: jest.fn() } as any} player={{ isTheater: false } as any} />
    );
    expect(wrapper.hasClass('video-react-player-icon-theater')).toBe(true);
    expect(wrapper.hasClass('video-react-player-icon-theater-exit')).toBe(false);
  });

  it('renders exit icon when in theater mode', () => {
    const wrapper = shallow(
      <TheaterModeToggle actions={{ toggleTheaterMode: jest.fn() } as any} player={{ isTheater: true } as any} />
    );
    expect(wrapper.hasClass('video-react-player-icon-theater-exit')).toBe(true);
  });

  it('calls toggleTheaterMode with flipped state on click', () => {
    const toggleTheaterMode = jest.fn();
    const wrapper = shallow(
      <TheaterModeToggle actions={{ toggleTheaterMode } as any} player={{ isTheater: false } as any} />
    );

    wrapper.simulate('click');

    expect(toggleTheaterMode).toHaveBeenCalledTimes(1);
    expect(toggleTheaterMode).toHaveBeenCalledWith(true);
  });
});
