/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import PopupButton from '../popup/PopupButton';
import VolumeBar from '../volume-control/VolumeBar';
import type { PlayerButtonProps } from '../../types/component';

interface VolumeMenuButtonProps extends PlayerButtonProps {
  vertical?: boolean;
  alwaysShowVolume?: boolean;
}

const VolumeMenuButton: React.FC<VolumeMenuButtonProps> = ({
  player,
  actions,
  vertical = false,
  className,
  alwaysShowVolume,
  ...buttonProps
}) => {
  const [active, setActive] = useState(false);

  const volumeLevel = useMemo(() => {
    if (player.muted || player.volume === 0) {
      return 0;
    }
    if (player.volume < 0.33) {
      return 1;
    }
    if (player.volume < 0.67) {
      return 2;
    }
    return 3;
  }, [player.muted, player.volume]);

  const handleClick = useCallback(() => {
    actions.mute(!player.muted);
  }, [actions, player.muted]);

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  const inline = !vertical;

  return (
    <PopupButton
      {...buttonProps}
      className={classNames(
        className,
        {
          'video-react-player-volume-menu-button-vertical': vertical,
          'video-react-player-volume-menu-button-horizontal': !vertical,
          'video-react-player-vol-muted': player.muted,
          'video-react-player-vol-0': volumeLevel === 0 && !player.muted,
          'video-react-player-vol-1': volumeLevel === 1,
          'video-react-player-vol-2': volumeLevel === 2,
          'video-react-player-vol-3': volumeLevel === 3,
          'video-react-player-slider-active': alwaysShowVolume || active,
          'video-react-player-lock-showing': alwaysShowVolume || active,
        },
        'video-react-player-volume-menu-button'
      )}
      onClick={handleClick}
      inline={inline}
    >
      <VolumeBar
        onFocus={handleFocus}
        onBlur={handleBlur}
        player={player}
        actions={actions}
        vertical={vertical}
      />
    </PopupButton>
  );
};

VolumeMenuButton.displayName = 'VolumeMenuButton';
export default VolumeMenuButton;
