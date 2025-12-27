/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import MenuButton from '../menu/MenuButton';
import type { MenuItemData } from '../menu/MenuItem';
import type { PlayerComponentProps } from '../../types/component';

interface PlaybackRateMenuButtonProps extends PlayerComponentProps {
  rates?: number[];
  className?: string;
}

const DEFAULT_RATES = [2, 1.5, 1.25, 1, 0.5, 0.25];

const PlaybackRateMenuButton: React.FC<PlaybackRateMenuButtonProps> = ({
  actions,
  player,
  rates = DEFAULT_RATES,
  className,
}) => {
  const items = useMemo<MenuItemData[]>(
    () =>
      rates.map((rate) => ({
        label: `${rate}x`,
        value: rate,
      })),
    [rates]
  );

  const selectedIndex = useMemo(() => {
    const index = rates.indexOf(player.playbackRate);
    if (index >= 0) {
      return index;
    }
    const fallback = rates.indexOf(1);
    return fallback >= 0 ? fallback : 0;
  }, [player.playbackRate, rates]);

  const handleSelectItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < rates.length) {
        actions.changeRate(rates[index]);
      }
    },
    [actions, rates]
  );

  return (
    <MenuButton
      className={classNames('video-react-player-playback-rate', className)}
      onSelectItem={handleSelectItem}
      items={items}
      selectedIndex={selectedIndex}
    >
      <span className="video-react-player-control-text">Playback Rate</span>
      <div className="video-react-player-playback-rate-value">
        {`${player.playbackRate.toFixed(2)}x`}
      </div>
    </MenuButton>
  );
};

PlaybackRateMenuButton.displayName = 'PlaybackRateMenuButton';

export default PlaybackRateMenuButton;
