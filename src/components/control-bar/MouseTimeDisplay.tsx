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

export interface MouseTime {
  time: number | null;
  position: number;
}

interface MouseTimeDisplayProps {
  duration: number;
  mouseTime: MouseTime;
  className?: string;
  text?: string;
}

const MouseTimeDisplay: React.FC<MouseTimeDisplayProps> = ({
  duration,
  mouseTime,
  className,
  text,
}) => {
  if (!mouseTime.time) {
    return null;
  }

  const time = text || formatTime(mouseTime.time, duration);

  return (
    <div
      className={classNames('video-react-player-mouse-display', className)}
      style={{
        left: `${mouseTime.position}px`,
      }}
      data-current-time={time}
    />
  );
};

MouseTimeDisplay.displayName = 'MouseTimeDisplay';

export default MouseTimeDisplay;
