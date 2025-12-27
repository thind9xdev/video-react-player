import React, { Component } from 'react';
import classNames from 'classnames';

type ClickableTagName = keyof HTMLElementTagNameMap;

interface ClickableComponentProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'onClick' | 'onFocus' | 'onBlur'
  > {
  tagName?: ClickableTagName;
  onClick: (event: React.MouseEvent<HTMLElement> | KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

class ClickableComponent extends Component<ClickableComponentProps> {
  static defaultProps = {
    tagName: 'div',
  } satisfies Partial<ClickableComponentProps>;

  static displayName = 'ClickableComponent';

  componentWillUnmount() {
    this.handleBlur();
  }

  handleKeypress = (event: KeyboardEvent) => {
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  handleClick = (event: React.MouseEvent<HTMLElement> | KeyboardEvent) => {
    this.props.onClick(event);
  };

  handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    document.addEventListener('keydown', this.handleKeypress);
    this.props.onFocus?.(event);
  };

  handleBlur = (event?: React.FocusEvent<HTMLElement>) => {
    document.removeEventListener('keydown', this.handleKeypress);
    if (event) {
      this.props.onBlur?.(event);
    }
  };

  render() {
    const {
      tagName = 'div',
      className,
      children,
      onClick,
      onFocus,
      onBlur,
      ...rest
    } = this.props;
    const Tag = tagName as ClickableTagName;

    return (
      <Tag
        {...(rest as Record<string, unknown>)}
        className={classNames(className)}
        role="button"
        tabIndex={0}
        onClick={this.handleClick as React.MouseEventHandler<HTMLElement>}
        onFocus={this.handleFocus as React.FocusEventHandler<HTMLElement>}
        onBlur={this.handleBlur as React.FocusEventHandler<HTMLElement>}
      >
        {children}
      </Tag>
    );
  }
}

export default ClickableComponent;
