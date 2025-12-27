/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';
import ClickableComponent from '../ClickableComponent';
import Popup from './Popup';

type ClickableProps = React.ComponentProps<typeof ClickableComponent>;

interface PopupButtonProps
  extends Omit<ClickableProps, 'className' | 'children'> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PopupButton: React.FC<PopupButtonProps> = ({
  inline = true,
  className,
  children,
  ...rest
}) => (
  <ClickableComponent
    {...rest}
    className={classNames(
      className,
      {
        'video-react-player-menu-button-inline': !!inline,
        'video-react-player-menu-button-popup': !inline,
      },
      'video-react-player-control video-react-player-button video-react-player-menu-button'
    )}
  >
    <Popup>{children}</Popup>
  </ClickableComponent>
);

PopupButton.displayName = 'PopupButton';

export default PopupButton;
