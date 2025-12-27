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

interface QualityMenuButtonProps extends PlayerComponentProps {
  qualities?: string[];
  className?: string;
}

const DEFAULT_QUALITIES = ['auto', '1080p', '720p', '480p', '360p', '240p'];

const QualityMenuButton: React.FC<QualityMenuButtonProps> = ({
  qualities = DEFAULT_QUALITIES,
  actions,
  player,
  className,
}) => {
  const items = useMemo<MenuItemData[]>(
    () =>
      qualities.map((quality) => ({
        label: quality,
        value: quality,
      })),
    [qualities]
  );

  const currentQuality = player.quality || 'auto';
  const selectedIndex = useMemo(() => {
    const index = qualities.indexOf(currentQuality);
    return index >= 0 ? index : 0;
  }, [currentQuality, qualities]);

  const handleSelectItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < qualities.length) {
        actions.changeQuality(qualities[index]);
      }
    },
    [actions, qualities]
  );

  return (
    <MenuButton
      className={classNames('video-react-player-quality-menu', className)}
      onSelectItem={handleSelectItem}
      items={items}
      selectedIndex={selectedIndex}
    >
      <span className="video-react-player-control-text">Quality</span>
      <div className="video-react-player-quality-value">{currentQuality}</div>
    </MenuButton>
  );
};

QualityMenuButton.displayName = 'QualityMenuButton';

export default QualityMenuButton;
