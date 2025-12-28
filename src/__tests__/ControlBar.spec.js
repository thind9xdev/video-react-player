import React from 'react';
import { shallow } from 'enzyme';
import ControlBar from '../components/control-bar/ControlBar';
import PlayToggle from '../components/control-bar/PlayToggle';

describe('ControlBar', () => {
  it('should render with "div" tag', () => {
    const wrapper = shallow(
      <ControlBar
        actions={{}}
        player={{
          hasStarted: false
        }}
      />
    );

    expect(wrapper.type()).toBe('div');
  });

  it('should render with "video-react-player-control-bar" class', () => {
    const wrapper = shallow(
      <ControlBar
        actions={{}}
        player={{
          hasStarted: false
        }}
      />
    );
    expect(wrapper.hasClass('video-react-player-control-bar')).toBe(true);
  });

  it('should has more than 1 children', () => {
    const wrapper = shallow(
      <ControlBar
        actions={{}}
        player={{
          hasStarted: false
        }}
      />
    );
    expect(wrapper.children().length).toBeGreaterThan(0);
  });

  it('should render default PlayToggle when user does not provide one', () => {
    const actions = { play: jest.fn(), pause: jest.fn() };
    const player = { paused: true };

    const wrapper = shallow(<ControlBar actions={actions} player={player} />);

    expect(wrapper.find(PlayToggle).length).toBe(1);
  });

  it('should render only one PlayToggle when user provides one', () => {
    const actions = { play: jest.fn(), pause: jest.fn() };
    const player = { paused: true };

    const wrapper = shallow(
      <ControlBar actions={actions} player={player}>
        <PlayToggle order={1} />
      </ControlBar>
    );

    expect(wrapper.find(PlayToggle).length).toBe(1);
  });
});
