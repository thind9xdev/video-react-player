/* eslint-disable no-undef, no-unused-expressions */
import React, { Component } from 'react';
import classNames from 'classnames';

// eslint-disable-next-line import/no-unresolved
import type { ActionCreators } from '../Manager';
import type { PlayerState } from '../reducers/player';

export interface BigPlayButtonProps {
  actions?: ActionCreators;
  player?: PlayerState;
  className?: string;
  order?: number;
  disabled?: boolean;
  position?: 'left' | 'center';
}

export default class BigPlayButton extends Component<BigPlayButtonProps> {
  static defaultProps: Required<Pick<BigPlayButtonProps, 'position'>> = {
    position: 'left',
  };

  static displayName = 'BigPlayButton';

  constructor(props: BigPlayButtonProps, context: unknown) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.actions?.play();
  }

  render() {
    const { player, position } = this.props;
    const positionClass = position === 'center' ? 'center' : 'left';
    const hasStarted = player?.hasStarted ?? false;
    const hasSource =
      player?.currentSrc !== undefined && player?.currentSrc !== '';
    return (
      <button
        className={classNames(
          'video-react-player-button',
          'video-react-player-big-play-button',
          `video-react-player-big-play-button-${positionClass}`,
          this.props.className,
          {
            // keep visible by default if player info is not provided
            'big-play-button-hide': hasStarted || !hasSource,
          }
        )}
        type="button"
        aria-live="polite"
        tabIndex={0}
        onClick={this.handleClick}
      >
        <span className="video-react-player-control-text">Play Video</span>
      </button>
    );
  }
}
