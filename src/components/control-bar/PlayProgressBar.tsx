/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

interface PlayProgressBarProps {
  currentTime: number;
  duration: number;
  percentage: string;
  className?: string;
}
// Shows play progress
export default function PlayProgressBar({
  currentTime,
  duration,
  percentage,
  className,
}: PlayProgressBarProps) {
  return (
    <div
      data-current-time={formatTime(currentTime, duration)}
      className={classNames(
        'video-react-player-play-progress video-react-player-slider-bar',
        className
      )}
      style={{
        width: percentage,
      }}
    >
      <span className="video-react-player-control-text">
        {`Progress: ${percentage}`}
      </span>
    </div>
  );
}
PlayProgressBar.displayName = 'PlayProgressBar';
