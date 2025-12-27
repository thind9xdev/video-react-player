/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface PopupProps {
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="video-react-player-menu" onClick={handleClick}>
      <div className="video-react-player-menu-content">{children}</div>
    </div>
  );
};

Popup.displayName = 'Popup';

export default Popup;
