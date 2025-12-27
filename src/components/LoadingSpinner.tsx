import React from 'react';
import classNames from 'classnames';

import type { PlayerComponentProps } from '../types/component';

export interface LoadingSpinnerProps extends PlayerComponentProps {
  className?: string;
  order?: number;
}

export default function LoadingSpinner({
  player,
  className,
}: LoadingSpinnerProps) {
  if (player.error) {
    return null;
  }
  return (
    <div className={classNames('video-react-player-loading-spinner', className)} />
  );
}
LoadingSpinner.displayName = 'LoadingSpinner';
