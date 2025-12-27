import React, { Component } from 'react';
import classNames from 'classnames';

import type Manager from '../Manager';
import type { OperationState } from '../reducers/operation';

interface BezelProps {
  manager: Manager;
  className?: string;
  order?: number;
}

interface BezelState {
  hidden: boolean;
  operation: OperationState['operation'];
  count: number;
}

export default class Bezel extends Component<BezelProps, BezelState> {
  static displayName = 'Bezel';

  private timer: number | null = null;

  constructor(props: BezelProps, context: unknown) {
    super(props, context);

    props.manager.subscribeToOperationStateChange(
      this.handleStateChange.bind(this)
    );

    this.state = {
      hidden: true,
      operation: { action: '', source: '' },
      count: 0,
    };
  }

  handleStateChange(state: OperationState, prevState: OperationState) {
    if (
      state.count !== prevState.count &&
      state.operation.source === 'shortcut'
    ) {
      if (this.timer) {
        // previous animation is not finished
        clearTimeout(this.timer); // cancel it
        this.timer = null;
      }

      // show it
      // update operation
      this.setState({
        hidden: false,
        count: state.count,
        operation: state.operation,
      });

      // hide it after 0.5s
      this.timer = window.setTimeout(() => {
        this.setState({
          hidden: true,
        });
        this.timer = null;
      }, 500);
    }
  }

  render() {
    // only displays for shortcut so far
    if (this.state.operation.source !== 'shortcut') {
      return null;
    }
    const style = this.state.hidden
      ? {
          display: 'none',
        }
      : null;

    return (
      <div
        className={classNames(
          {
            'video-react-player-bezel': true,
            'video-react-player-bezel-animation': this.state.count % 2 === 0,
            'video-react-player-bezel-animation-alt': this.state.count % 2 === 1,
          },
          this.props.className
        )}
        style={style}
        role="status"
        aria-label={this.state.operation.action}
      >
        <div
          className={classNames(
            'video-react-player-bezel-icon',
            `video-react-player-bezel-icon-${this.state.operation.action}`
          )}
        />
      </div>
    );
  }
}
