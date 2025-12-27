/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';

interface LoadProgressBarProps {
  duration: number;
  buffered?: TimeRanges | null;
  className?: string;
  currentTime?: number;
}

const percentify = (time: number, end: number) => {
  const percent = time / end || 0;
  return `${(percent >= 1 ? 1 : percent) * 100}%`;
};

const LoadProgressBar: React.FC<LoadProgressBarProps> = ({
  buffered,
  duration,
  className,
}) => {
  if (!buffered || buffered.length === 0) {
    return null;
  }

  let bufferedEnd = buffered.end(buffered.length - 1);
  if (bufferedEnd > duration) {
    bufferedEnd = duration;
  }

  const style: React.CSSProperties = {
    width: percentify(bufferedEnd, duration),
  };

  const parts = [] as React.ReactNode[];
  for (let i = 0; i < buffered.length; i += 1) {
    const start = buffered.start(i);
    const end = buffered.end(i);
    parts.push(
      <div
        style={{
          left: percentify(start, bufferedEnd),
          width: percentify(end - start, bufferedEnd),
        }}
        key={`part-${i}`}
      />
    );
  }

  return (
    <div
      style={style}
      className={classNames('video-react-player-load-progress', className)}
    >
      <span className="video-react-player-control-text">Loaded: 0%</span>
      {parts}
    </div>
  );
};

LoadProgressBar.displayName = 'LoadProgressBar';

export default LoadProgressBar;
