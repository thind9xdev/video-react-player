import React, { Component } from 'react';
import classNames from 'classnames';

import Slider from '../Slider';
import VolumeLevel from './VolumeLevel';
import type { PlayerComponentProps } from '../../types/component';

type SliderDistanceEvent = Parameters<Slider['calculateDistance']>[0];
type SliderActivateEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<Element>
  | React.TouchEvent<Element>
  | React.FocusEvent<HTMLDivElement>;

interface VolumeBarProps extends PlayerComponentProps {
  className?: string;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  vertical?: boolean;
}

interface VolumeBarState {
  percentage: string;
}

class VolumeBar extends Component<VolumeBarProps, VolumeBarState> {
  static displayName = 'VolumeBar';

  private slider: Slider | null = null;

  state: VolumeBarState = {
    percentage: '0%',
  };

  getPercent = () => {
    const { player } = this.props;
    return player.muted ? 0 : player.volume;
  };

  checkMuted = () => {
    const { player, actions } = this.props;
    if (player.muted) {
      actions.mute(false);
    }
  };

  handleMouseMove = (event: SliderDistanceEvent) => {
    const { actions } = this.props;
    this.checkMuted();
    const distance = this.slider ? this.slider.calculateDistance(event) : 0;
    actions.changeVolume(distance);
  };

  stepForward = () => {
    const { player, actions } = this.props;
    this.checkMuted();
    actions.changeVolume(player.volume + 0.1);
  };

  stepBack = () => {
    const { player, actions } = this.props;
    this.checkMuted();
    actions.changeVolume(player.volume - 0.1);
  };

  handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    this.props.onFocus?.(event);
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    this.props.onBlur?.(event);
  };

  handleSliderActivate = (event: SliderActivateEvent) => {
    if (event.type === 'focus') {
      this.handleFocus(event as React.FocusEvent<HTMLDivElement>);
    }
  };

  handleSliderDeactivate = (event: SliderActivateEvent) => {
    if (event.type === 'blur') {
      this.handleBlur(event as React.FocusEvent<HTMLDivElement>);
    }
  };

  handlePercentageChange = (percentage: string) => {
    if (percentage !== this.state.percentage) {
      this.setState({ percentage });
    }
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  render() {
    const { player, className, vertical } = this.props;
    const volume = Number((player.volume * 100).toFixed(2));

    return (
      <Slider
        order={1}
        ref={(instance) => {
          this.slider = instance;
        }}
        label="volume level"
        valuenow={volume}
        valuetext={`${volume}%`}
        onMouseMove={this.handleMouseMove}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        sliderActive={this.handleSliderActivate}
        sliderInactive={this.handleSliderDeactivate}
        getPercent={this.getPercent}
        onPercentageChange={this.handlePercentageChange}
        stepForward={this.stepForward}
        stepBack={this.stepBack}
        vertical={vertical}
        className={classNames(
          className,
          'video-react-player-volume-bar',
          'video-react-player-slider-bar'
        )}
      >
        <VolumeLevel className="video-react-player-volume-level" />
      </Slider>
    );
  }
}

export default VolumeBar;
