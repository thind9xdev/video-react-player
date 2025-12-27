import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressControl from '../components/control-bar/ProgressControl';
import SeekBar from '../components/control-bar/SeekBar';

describe('ProgressControl', () => {
  it('should render with "div" tag', () => {
    const wrapper = shallow(<ProgressControl actions={{}} player={{}} />);

    expect(wrapper.type()).toBe('div');
  });

  it('should render with "video-react-player-progress-control" class', () => {
    const wrapper = shallow(<ProgressControl actions={{}} player={{}} />);
    expect(wrapper.hasClass('video-react-player-progress-control')).toBe(true);
  });

  it('should render SeekBar child', () => {
    const wrapper = mount(
      <ProgressControl
        player={{ duration: 0, currentTime: 0, seekingTime: 0 }}
        actions={{
          handleSeekingTime: jest.fn(),
          seek: jest.fn(),
          handleEndSeeking: jest.fn(),
        }}
      />
    );
    expect(wrapper.find(SeekBar).length).toBe(1);
  });
});
