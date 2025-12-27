/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback } from 'react';
import classNames from 'classnames';

import type { PlayerComponentProps } from '../../types/component';

interface DownloadButtonProps extends Pick<PlayerComponentProps, 'player'> {
  className?: string;
  filename?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  player,
  className,
  filename = 'video',
}) => {
  const handleClick = useCallback(() => {
    if (!player.currentSrc) {
      return;
    }

    const link = document.createElement('a');
    link.href = player.currentSrc;
    link.download = filename;
    link.click();
  }, [filename, player.currentSrc]);

  return (
    <button
      className={classNames(
        className,
        'video-react-player-icon-download',
        'video-react-player-download-control video-react-player-control video-react-player-button video-react-player-icon'
      )}
      type="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="video-react-player-control-text">Download</span>
    </button>
  );
};

DownloadButton.displayName = 'DownloadButton';

export default DownloadButton;
