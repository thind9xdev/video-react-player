/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';

interface TimeDividerProps {
  separator?: string;
  className?: string;
}
export default function TimeDivider({
  separator,
  className,
}: TimeDividerProps) {
  const separatorText = separator || '/';
  return (
    <div
      className={classNames(
        'video-react-player-time-control video-react-player-time-divider',
        className
      )}
      dir="ltr"
    >
      <div>
        <span>{separatorText}</span>
      </div>
    </div>
  );
}

TimeDivider.displayName = 'TimeDivider';
