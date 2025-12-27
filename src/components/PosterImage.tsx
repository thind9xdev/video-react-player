import React from 'react';
import classNames from 'classnames';

import type { PlayerComponentProps } from '../types/component';

export interface PosterImageProps extends PlayerComponentProps {
  poster?: string;
  className?: string;
  order?: number;
}

function PosterImage({ poster, player, actions, className }: PosterImageProps) {
  if (!poster || player.hasStarted) {
    return null;
  }

  return (
    <div
      className={classNames('video-react-player-poster', className)}
      style={{
        backgroundImage: `url("${poster}")`,
      }}
      onClick={() => {
        if (player.paused) {
          actions.play();
        }
      }}
    />
  );
}
PosterImage.displayName = 'PosterImage';

export default PosterImage;
