/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ForwardReplayControl, {
  ForwardReplayControlProps,
} from './ForwardReplayControl';

// Pass mode into parent function
const ReplayControl = ForwardReplayControl('replay');
ReplayControl.displayName = 'ReplayControl';

export default ReplayControl;
export type ReplayControlProps = ForwardReplayControlProps;
