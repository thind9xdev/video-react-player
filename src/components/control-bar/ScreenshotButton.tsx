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

type ScreenshotButtonProps = PlayerButtonProps;

const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
  actions,
  className,
}) => {
  const handleClick = useCallback(() => {
    actions.takeScreenshot();
  }, [actions]);

  return (
    <button
      className={classNames(
        className,
        'video-react-player-icon-camera',
        'video-react-player-screenshot-control video-react-player-control video-react-player-button video-react-player-icon'
      )}
      type="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="video-react-player-control-text">Screenshot</span>
    </button>
  );
};

ScreenshotButton.displayName = 'ScreenshotButton';

export default ScreenshotButton;
