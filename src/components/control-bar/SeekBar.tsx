/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';

import Slider from '../Slider';
import PlayProgressBar from './PlayProgressBar';
import LoadProgressBar from './LoadProgressBar';
import MouseTimeDisplay, { MouseTime } from './MouseTimeDisplay';
import { formatTime } from '../../utils';
import type { PlayerComponentProps } from '../../types/component';

interface SeekBarProps extends PlayerComponentProps {
  mouseTime: MouseTime;
  className?: string;
}

const SeekBar: React.FC<SeekBarProps> = ({
  player,
  actions,
  mouseTime,
  className,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const getPercent = useCallback(() => {
    const { currentTime, seekingTime, duration } = player;
    const time = seekingTime || currentTime;
    if (!duration) {
      return 0;
    }
    const percent = time / duration;
    return percent >= 1 ? 1 : percent;
  }, [player]);

  type SeekBarMouseEvent =
    | MouseEvent
    | TouchEvent
    | React.MouseEvent<Element>
    | React.TouchEvent<Element>;

  const getNewTime = useCallback(
    (event: SeekBarMouseEvent) => {
      const duration = player.duration || 0;
      const distance = sliderRef.current
        ? sliderRef.current.calculateDistance(event)
        : 0;
      const newTime = distance * duration;
      return newTime === duration ? newTime - 0.1 : newTime;
    },
    [player.duration]
  );

  const handleMouseMove = useCallback(
    (event: SeekBarMouseEvent) => {
      const newTime = getNewTime(event);
      actions.handleSeekingTime(newTime);
    },
    [actions, getNewTime]
  );

  const handleMouseUp = useCallback(
    (event: SeekBarMouseEvent) => {
      const newTime = getNewTime(event);
      actions.seek(newTime);
      actions.handleEndSeeking(newTime);
    },
    [actions, getNewTime]
  );

  const stepForward = useCallback(() => {
    actions.forward(5);
  }, [actions]);

  const stepBack = useCallback(() => {
    actions.replay(5);
  }, [actions]);

  const time = player.seekingTime || player.currentTime;
  const percent = getPercent();
  const valueText = useMemo(
    () => formatTime(time, player.duration),
    [player.duration, time]
  );

  return (
    <Slider
      ref={(instance) => {
        sliderRef.current = instance;
      }}
      label="video progress bar"
      className={classNames('video-react-player-progress-holder', className)}
      valuenow={Number((percent * 100).toFixed(2))}
      valuetext={valueText}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      getPercent={getPercent}
      stepForward={stepForward}
      stepBack={stepBack}
    >
      <LoadProgressBar
        buffered={player.buffered}
        currentTime={time}
        duration={player.duration}
      />
      <MouseTimeDisplay duration={player.duration} mouseTime={mouseTime} />
      <PlayProgressBar
        percentage={`${(percent * 100).toFixed(2)}%`}
        currentTime={time}
        duration={player.duration}
      />
    </Slider>
  );
};

SeekBar.displayName = 'SeekBar';

export default SeekBar;
