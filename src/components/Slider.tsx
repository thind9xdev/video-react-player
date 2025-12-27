import React, { Component } from 'react';
import classNames from 'classnames';
import * as Dom from '../utils/dom';

type SliderMouseEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<Element>
  | React.TouchEvent<Element>;

type SliderActivateEvent = SliderMouseEvent | React.FocusEvent<HTMLDivElement>;

interface SliderProps {
  className?: string;
  order?: number;
  disabled?: boolean;
  onMouseDown?: (event: SliderMouseEvent) => void;
  onMouseMove?: (event: SliderMouseEvent) => void;
  stepForward?: () => void;
  stepBack?: () => void;
  sliderActive?: (event: SliderActivateEvent) => void;
  sliderInactive?: (event: SliderActivateEvent) => void;
  onMouseUp?: (event: SliderMouseEvent) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  getPercent?: () => number;
  vertical?: boolean;
  children?: React.ReactNode;
  label?: string;
  valuenow?: number;
  valuetext?: string;
  onPercentageChange?: (percentage: string) => void;
}

interface SliderState {
  active: boolean;
}

class Slider extends Component<SliderProps, SliderState> {
  private slider: HTMLDivElement | null = null;

  static displayName = 'Slider';

  state: SliderState = {
    active: false,
  };

  componentWillUnmount() {
    document.removeEventListener(
      'mousemove',
      this.handleMouseMove as EventListener,
      true
    );
    document.removeEventListener(
      'mouseup',
      this.handleMouseUp as EventListener,
      true
    );
    document.removeEventListener(
      'touchmove',
      this.handleMouseMove as EventListener,
      true
    );
    document.removeEventListener(
      'touchend',
      this.handleMouseUp as EventListener,
      true
    );
    document.removeEventListener('keydown', this.handleKeyPress, true);
  }

  getProgress = () => {
    const { getPercent } = this.props;
    if (!getPercent) {
      return 0;
    }
    let progress = getPercent();

    if (typeof progress !== 'number' || progress < 0 || progress === Infinity) {
      progress = 0;
    }
    return progress;
  };

  handleMouseDown = (event: SliderMouseEvent) => {
    const { onMouseDown } = this.props;

    document.addEventListener(
      'mousemove',
      this.handleMouseMove as EventListener,
      true
    );
    document.addEventListener(
      'mouseup',
      this.handleMouseUp as EventListener,
      true
    );
    document.addEventListener(
      'touchmove',
      this.handleMouseMove as EventListener,
      true
    );
    document.addEventListener(
      'touchend',
      this.handleMouseUp as EventListener,
      true
    );

    this.setState({ active: true });

    this.props.sliderActive?.(event);

    this.handleMouseMove(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  handleMouseMove = (event: SliderMouseEvent) => {
    const { onMouseMove } = this.props;

    if (onMouseMove) {
      onMouseMove(event);
    }
  };

  handleMouseUp = (event: SliderMouseEvent) => {
    event.preventDefault();
    const { onMouseUp } = this.props;

    document.removeEventListener(
      'mousemove',
      this.handleMouseMove as EventListener,
      true
    );
    document.removeEventListener(
      'mouseup',
      this.handleMouseUp as EventListener,
      true
    );
    document.removeEventListener(
      'touchmove',
      this.handleMouseMove as EventListener,
      true
    );
    document.removeEventListener(
      'touchend',
      this.handleMouseUp as EventListener,
      true
    );

    this.setState({ active: false });

    this.props.sliderInactive?.(event);

    if (onMouseUp) {
      onMouseUp(event);
    }
  };

  handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    document.addEventListener('keydown', this.handleKeyPress, true);
    this.props.onFocus?.(event);
  };

  handleBlur = (event?: React.FocusEvent<HTMLDivElement>) => {
    document.removeEventListener('keydown', this.handleKeyPress, true);
    if (event) {
      this.props.onBlur?.(event);
    }
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.props.onClick?.(event);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.which === 37 || event.which === 40) {
      event.preventDefault();
      event.stopPropagation();
      this.stepBack();
    } else if (event.which === 38 || event.which === 39) {
      event.preventDefault();
      event.stopPropagation();
      this.stepForward();
    }
  };

  stepForward = () => {
    this.props.stepForward?.();
  };

  stepBack = () => {
    this.props.stepBack?.();
  };

  calculateDistance(event: SliderMouseEvent) {
    if (!this.slider) {
      return 0;
    }
    const position = Dom.getPointerPosition(
      this.slider,
      event as MouseEvent | TouchEvent
    );
    if (this.props.vertical) {
      return position.y ?? 0;
    }
    return position.x ?? 0;
  }

  renderChildren = () => {
    const progress = this.getProgress();
    const percentage = `${(progress * 100).toFixed(2)}%`;
    this.props.onPercentageChange?.(percentage);
    return React.Children.map(this.props.children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, { progress, percentage })
        : child
    );
  };

  render() {
    const { vertical, label, valuenow, valuetext } = this.props;
    const ariaValueNow =
      typeof valuenow === 'number' ? valuenow : Number(valuenow ?? 0);

    return (
      <div
        className={classNames(
          this.props.className,
          {
            'video-react-player-slider-vertical': vertical,
            'video-react-player-slider-horizontal': !vertical,
            'video-react-player-sliding': this.state.active,
          },
          'video-react-player-slider'
        )}
        ref={(node) => {
          this.slider = node;
        }}
        tabIndex={0}
        role="slider"
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        aria-label={label || ''}
        aria-valuenow={ariaValueNow}
        aria-valuetext={valuetext || ''}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {this.renderChildren()}
      </div>
    );
  }
}

export default Slider;
