/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import * as Dom from '../../utils/dom';
import SeekBar from './SeekBar';
import type { PlayerComponentProps } from '../../types/component';
import type { MouseTime } from './MouseTimeDisplay';

interface ProgressControlProps extends PlayerComponentProps {
  className?: string;
}

const ProgressControl: React.FC<ProgressControlProps> = ({
  className,
  ...playerProps
}) => {
  const [mouseTime, setMouseTime] = useState<MouseTime>({
    time: null,
    position: 0,
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!event.pageX) {
        return;
      }

      const target = event.currentTarget as HTMLElement | null;
      if (!target) {
        return;
      }

      const { x = 0 } = Dom.getPointerPosition(
        target,
        event.nativeEvent as MouseEvent
      );
      const newTime = x * playerProps.player.duration;
      const position = event.pageX - Dom.findElPosition(target).left;

      setMouseTime({
        time: newTime,
        position,
      });
    },
    [playerProps.player.duration]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={classNames(
        'video-react-player-progress-control video-react-player-control',
        className
      )}
    >
      <SeekBar mouseTime={mouseTime} {...playerProps} />
    </div>
  );
};

ProgressControl.displayName = 'ProgressControl';

export default ProgressControl;
