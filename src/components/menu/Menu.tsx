/**

 * Copyright (c) 2016 Video-React contributors
  * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface MenuProps {
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="video-react-player-menu video-react-player-lock-showing"
      role="presentation"
      onClick={handleClick}
    >
      <ul className="video-react-player-menu-content">{children}</ul>
    </div>
  );
};

Menu.displayName = 'Menu';

export default Menu;
