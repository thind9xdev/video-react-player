/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import PlaybackRateMenuButton from './PlaybackRateMenuButton';
import { deprecatedWarning } from '../../utils';

type PlaybackRateProps = React.ComponentProps<typeof PlaybackRateMenuButton>;

const PlaybackRate: React.FC<PlaybackRateProps> = (props) => {
  useEffect(() => {
    deprecatedWarning('PlaybackRate', 'PlaybackRateMenuButton');
  }, []);

  return <PlaybackRateMenuButton {...props} />;
};

PlaybackRate.displayName = 'PlaybackRate';

export default PlaybackRate;
