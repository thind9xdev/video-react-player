/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';
import ScreenshotButton from '../components/control-bar/ScreenshotButton';

describe('ScreenshotButton', () => {
  it('renders a screenshot control button', () => {
    const wrapper = shallow(
      <ScreenshotButton actions={{ takeScreenshot: jest.fn() } as any} className="custom" />
    );
    expect(wrapper.type()).toBe('button');
    expect(wrapper.hasClass('video-react-player-screenshot-control')).toBe(true);
    expect(wrapper.hasClass('video-react-player-icon-camera')).toBe(true);
  });

  it('calls takeScreenshot on click', () => {
    const takeScreenshot = jest.fn();
    const wrapper = shallow(
      <ScreenshotButton actions={{ takeScreenshot } as any} className="custom" />
    );

    wrapper.simulate('click');

    expect(takeScreenshot).toHaveBeenCalledTimes(1);
  });
});
