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

interface PictureInPictureToggleProps extends PlayerButtonProps {}

const PictureInPictureToggle: React.FC<PictureInPictureToggleProps> = ({
  actions,
  player,
  className,
}) => {
  const handleClick = useCallback(() => {
    actions.togglePictureInPicture();
  }, [actions]);

  const isPip = player.isPictureInPicture ?? false;

  return (
    <button
      className={classNames(
        className,
        {
          'video-react-player-icon-picture-in-picture-exit': isPip,
          'video-react-player-icon-picture-in-picture': !isPip,
        },
        'video-react-player-picture-in-picture-control video-react-player-control video-react-player-button video-react-player-icon'
      )}
      type="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="video-react-player-control-text">Picture-in-Picture</span>
    </button>
  );
};

PictureInPictureToggle.displayName = 'PictureInPictureToggle';

export default PictureInPictureToggle;
