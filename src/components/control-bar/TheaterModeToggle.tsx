/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback } from 'react';
import classNames from 'classnames';

import type { PlayerButtonProps } from '../../types/component';

type TheaterModeToggleProps = PlayerButtonProps;

const TheaterModeToggle: React.FC<TheaterModeToggleProps> = ({
  actions,
  player,
  className,
}) => {
  const handleClick = useCallback(() => {
    actions.toggleTheaterMode(!player.isTheater);
  }, [actions, player.isTheater]);

  const isTheater = player.isTheater ?? false;

  return (
    <button
      className={classNames(
        className,
        {
          'video-react-player-icon-theater-exit': isTheater,
          'video-react-player-icon-theater': !isTheater,
        },
        'video-react-player-theater-control video-react-player-control video-react-player-button video-react-player-icon'
      )}
      type="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="video-react-player-control-text">
        {isTheater ? 'Exit Theater Mode' : 'Theater Mode'}
      </span>
    </button>
  );
};

TheaterModeToggle.displayName = 'TheaterModeToggle';

export default TheaterModeToggle;
