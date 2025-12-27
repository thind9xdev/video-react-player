/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';

import type { PlayerButtonProps } from '../../types/component';

type FullscreenToggleProps = PlayerButtonProps;

const FullscreenToggle = forwardRef<HTMLButtonElement, FullscreenToggleProps>(
  ({ actions, player, className }, ref) => {
    const handleClick = useCallback(() => {
      actions.toggleFullscreen(player);
    }, [actions, player]);

    return (
      <button
        className={classNames(
          className,
          {
            'video-react-player-icon-fullscreen-exit': player.isFullscreen,
            'video-react-player-icon-fullscreen': !player.isFullscreen,
          },
          'video-react-player-fullscreen-control video-react-player-control video-react-player-button video-react-player-icon'
        )}
        ref={ref}
        type="button"
        tabIndex={0}
        onClick={handleClick}
      >
        <span className="video-react-player-control-text">Non-Fullscreen</span>
      </button>
    );
  }
);

FullscreenToggle.displayName = 'FullscreenToggle';

export default FullscreenToggle;
