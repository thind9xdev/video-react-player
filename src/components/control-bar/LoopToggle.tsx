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

const LoopToggle = forwardRef<HTMLButtonElement, PlayerButtonProps>(
  ({ actions, player, className }, ref) => {
    const isLoop = !!player.loop;

    const handleClick = useCallback(() => {
      actions.handleLoopChange(!isLoop);
    }, [actions, isLoop]);

    return (
      <button
        className={classNames(
          className,
          {
            'video-react-player-icon-loop-active': isLoop,
            'video-react-player-icon-loop': !isLoop,
          },
          'video-react-player-loop-control video-react-player-control video-react-player-button video-react-player-icon'
        )}
        ref={ref}
        type="button"
        tabIndex={0}
        onClick={handleClick}
      >
        <span className="video-react-player-control-text">
          {isLoop ? 'Loop On' : 'Loop Off'}
        </span>
      </button>
    );
  }
);

LoopToggle.displayName = 'LoopToggle';

export default LoopToggle;
