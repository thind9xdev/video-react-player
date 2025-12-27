/// <reference types="jest" />
import React from 'react';
import { shallow } from 'enzyme';
import QualityMenuButton from '../components/control-bar/QualityMenuButton';

describe('QualityMenuButton', () => {
  it('passes qualities to MenuButton and renders current quality', () => {
    const actions = { changeQuality: jest.fn() };
    const qualities = ['auto', '720p', '480p'];
    const player = { quality: '720p' } as any;

    const wrapper = shallow(
      <QualityMenuButton actions={actions as any} player={player} qualities={qualities} />
    );

    const menu = wrapper.find('MenuButton');
    expect(menu.exists()).toBe(true);
    expect(menu.prop('items')).toHaveLength(qualities.length);
    expect(menu.prop('selectedIndex')).toBe(1); // 720p index
    expect(wrapper.find('.video-react-player-quality-value').text()).toBe('720p');
  });

  it('invokes changeQuality when an item is selected', () => {
    const actions = { changeQuality: jest.fn() };
    const qualities = ['auto', '1080p', '720p'];
    const player = { quality: 'auto' } as any;

    const wrapper = shallow(
      <QualityMenuButton actions={actions as any} player={player} qualities={qualities} />
    );

    const onSelectItem = wrapper.find('MenuButton').prop('onSelectItem') as (i: number) => void;
    onSelectItem(2);

    expect(actions.changeQuality).toHaveBeenCalledWith('720p');
  });
});
