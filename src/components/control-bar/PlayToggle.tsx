import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';

import type { ActionCreators } from '../../Manager';
import type { PlayerState } from '../../reducers/player';

interface PlayToggleProps {
  actions?: ActionCreators;
  player?: PlayerState;
  className?: string;
  order?: number;
  disabled?: boolean;
}

const PlayToggle = forwardRef<HTMLButtonElement, PlayToggleProps>(
  ({ actions, player, className }, ref) => {
    const paused = player?.paused ?? true;

    const handleClick = useCallback(() => {
      if (!actions) return;
      if (paused) {
        actions.play();
      } else {
        actions.pause();
      }
    }, [actions, paused]);

    const controlText = paused ? 'Play' : 'Pause';

    return (
      <button
        ref={ref}
        className={classNames(className, {
          'video-react-player-play-control': true,
          'video-react-player-control': true,
          'video-react-player-button': true,
          'video-react-player-paused': paused,
          'video-react-player-playing': !paused,
        })}
        type="button"
        tabIndex={0}
        onClick={handleClick}
      >
        <span className="video-react-player-control-text">{controlText}</span>
      </button>
    );
  }
);

(PlayToggle as unknown as { controlId?: string }).controlId = 'PlayToggle';

PlayToggle.displayName = 'PlayToggle';

export default PlayToggle;
