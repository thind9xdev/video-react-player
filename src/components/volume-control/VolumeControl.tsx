/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classNames from 'classnames';

import VolumeBar from './VolumeBar';

type VolumeControlProps = React.ComponentProps<typeof VolumeBar> & {
  className?: string;
};

const VolumeControl: React.FC<VolumeControlProps> = ({
  className,
  ...rest
}) => (
  <div
    className={classNames(
      className,
      'video-react-player-volume-control video-react-player-control'
    )}
  >
    <VolumeBar {...rest} />
  </div>
);

VolumeControl.displayName = 'VolumeControl';

export default VolumeControl;
