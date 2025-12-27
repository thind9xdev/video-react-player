/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import Menu from './Menu';
import MenuItem, { MenuItemData } from './MenuItem';
import ClickableComponent from '../ClickableComponent';

interface MenuButtonProps {
  inline?: boolean;
  items?: MenuItemData[];
  className?: string;
  onSelectItem: (index: number) => void;
  children?: React.ReactNode;
  selectedIndex?: number;
}

interface MenuButtonState {
  active: boolean;
  activateIndex: number;
}

class MenuButton extends Component<MenuButtonProps, MenuButtonState> {
  static displayName = 'MenuButton';

  static defaultProps: Partial<MenuButtonProps> = {
    items: [],
    selectedIndex: 0,
  };

  state: MenuButtonState = {
    active: false,
    activateIndex: this.props.selectedIndex ?? 0,
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps: MenuButtonProps) {
    if (
      prevProps.selectedIndex !== this.props.selectedIndex &&
      typeof this.props.selectedIndex === 'number'
    ) {
      this.activateMenuItem(this.props.selectedIndex);
    }
  }

  commitSelection = (index: number) => {
    this.setState({ activateIndex: index });
    this.handleIndexChange(index);
  };

  activateMenuItem = (index = 0) => {
    this.setState({ activateIndex: index });
    this.handleIndexChange(index);
  };

  handleIndexChange = (index: number) => {
    this.props.onSelectItem(index);
  };

  handleClick = () => {
    this.setState((prevState) => ({ active: !prevState.active }));
  };

  handleFocus = () => {
    document.addEventListener('keydown', this.handleKeyPress);
  };

  handleBlur = () => {
    this.setState({ active: false });
    document.removeEventListener('keydown', this.handleKeyPress);
  };

  handleUpArrow = (event: KeyboardEvent) => {
    const items = this.props.items ?? [];
    if (this.state.active && items.length) {
      event.preventDefault();
      const newIndex =
        (this.state.activateIndex - 1 + items.length) % items.length;
      this.activateMenuItem(newIndex);
    }
  };

  handleDownArrow = (event: KeyboardEvent) => {
    const items = this.props.items ?? [];
    if (this.state.active && items.length) {
      event.preventDefault();
      const newIndex = (this.state.activateIndex + 1) % items.length;
      this.activateMenuItem(newIndex);
    }
  };

  handleTab = (event: KeyboardEvent) => {
    if (this.state.active) {
      event.preventDefault();
      this.commitSelection(this.state.activateIndex);
    }
  };

  handleReturn = (event: KeyboardEvent) => {
    event.preventDefault();
    if (this.state.active) {
      this.commitSelection(this.state.activateIndex);
    } else {
      this.setState({ active: true });
    }
  };

  handleEscape = () => {
    this.setState({ active: false, activateIndex: 0 });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.which === 27) {
      this.handleEscape();
    } else if (event.which === 9) {
      this.handleTab(event);
    } else if (event.which === 13) {
      this.handleReturn(event);
    } else if (event.which === 38) {
      this.handleUpArrow(event);
    } else if (event.which === 40) {
      this.handleDownArrow(event);
    }
  };

  handleSelectItem = (index: number) => {
    this.commitSelection(index);
  };

  renderMenu() {
    if (!this.state.active) {
      return null;
    }

    const items = this.props.items ?? [];
    return (
      <Menu>
        {items.map((item, index) => (
          <MenuItem
            item={item}
            index={index}
            onSelectItem={this.handleSelectItem}
            activateIndex={this.state.activateIndex}
            key={`item-${index}`}
          />
        ))}
      </Menu>
    );
  }

  render() {
    const { inline, className, children } = this.props;

    return (
      <ClickableComponent
        className={classNames(
          className,
          {
            'video-react-player-menu-button-inline': !!inline,
            'video-react-player-menu-button-popup': !inline,
            'video-react-player-menu-button-active': this.state.active,
          },
          'video-react-player-control video-react-player-button video-react-player-menu-button'
        )}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {children}
        {this.renderMenu()}
      </ClickableComponent>
    );
  }
}

export default MenuButton;
