/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';

export interface MenuItemData {
  label: React.ReactNode;
  value?: unknown;
}

interface MenuItemProps {
  item: MenuItemData;
  index: number;
  activateIndex: number;
  onSelectItem: (index: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  index,
  activateIndex,
  onSelectItem,
}) => {
  const handleClick = () => {
    onSelectItem(index);
  };

  return (
    <li
      className={classNames({
        'video-react-player-menu-item': true,
        'video-react-player-selected': index === activateIndex,
      })}
      role="menuitem"
      onClick={handleClick}
    >
      {item.label}
      <span className="video-react-player-control-text" />
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
