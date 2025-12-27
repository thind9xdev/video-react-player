/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { forwardRef, useCallback } from 'react';

import type { PlayerButtonProps } from '../../types/component';

type Mode = 'forward' | 'replay';

export interface ForwardReplayControlProps extends PlayerButtonProps {
  seconds?: 5 | 10 | 30;
}

const createForwardReplayControl = (mode: Mode) => {
  const ForwardReplayControl = forwardRef<
    HTMLButtonElement,
    ForwardReplayControlProps
  >(({ actions, seconds = 10, className }, ref) => {
    const handleClick = useCallback(() => {
      if (mode === 'forward') {
        actions.forward(seconds);
      } else {
        actions.replay(seconds);
      }
    }, [actions, seconds]);

    const classNames = [
      'video-react-player-control',
      'video-react-player-button',
      'video-react-player-icon',
      `video-react-player-icon-${mode}-${seconds}`,
      `video-react-player-${mode}-control`,
    ];
    if (className) {
      classNames.push(className);
    }

    return (
      <button
        ref={ref}
        className={classNames.join(' ')}
        type="button"
        onClick={handleClick}
      >
        <span className="video-react-player-control-text">{`${mode} ${seconds} seconds`}</span>
      </button>
    );
  });

  ForwardReplayControl.displayName = `ForwardReplayControl(${mode})`;
  return ForwardReplayControl;
};

export default createForwardReplayControl;
