/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import React from 'react';

import type { ActionCreators } from '../../Manager';
import type { PlayerState } from '../../reducers/player';
import { getControlId, getDisplayName, mergeAndSortChildren } from '../../utils';
import CurrentTimeDisplay from '../time-controls/CurrentTimeDisplay';
import DurationDisplay from '../time-controls/DurationDisplay';
import TimeDivider from '../time-controls/TimeDivider';
import FullscreenToggle from './FullscreenToggle';
import PlayToggle from './PlayToggle';
import ProgressControl from './ProgressControl';
import VolumeMenuButton from './VolumeMenuButton';

interface ControlBarProps {
  actions?: ActionCreators;
  player?: PlayerState;
  order?: number;
  children?: React.ReactNode;
  autoHide?: boolean;
  autoHideTime?: number;
  disableDefaultControls?: boolean;
  disableCompletely?: boolean;
  className?: string;
}

const asDefaultChild = (element: React.ReactElement) =>
  element as React.ReactElement;

const getDefaultChildren = () => [
  asDefaultChild(
    React.createElement(VolumeMenuButton as React.ComponentType<any>, {
      key: 'volume-menu-button',
      order: 4,
    })
  ),
  asDefaultChild(
    React.createElement(CurrentTimeDisplay as React.ComponentType<any>, {
      key: 'current-time-display',
      order: 5.1,
    })
  ),
  asDefaultChild(
    React.createElement(TimeDivider as React.ComponentType<any>, {
      key: 'time-divider',
      order: 5.2,
    })
  ),
  asDefaultChild(
    React.createElement(DurationDisplay as React.ComponentType<any>, {
      key: 'duration-display',
      order: 5.3,
    })
  ),
  asDefaultChild(
    React.createElement(ProgressControl as React.ComponentType<any>, {
      key: 'progress-control',
      order: 6,
    })
  ),
  asDefaultChild(
    React.createElement(FullscreenToggle as React.ComponentType<any>, {
      key: 'fullscreen-toggle',
      order: 8,
    })
  ),
];

const ControlBar: React.FC<ControlBarProps> = ({
  autoHide = true,
  className,
  disableCompletely = false,
  disableDefaultControls,
  children,
  ...parentProps
}) => {
  if (disableCompletely || !parentProps.actions || !parentProps.player) {
    return null;
  }

  const hasCoreProps = Boolean(parentProps.actions && parentProps.player);
  const defaultChildren =
    disableDefaultControls || !hasCoreProps ? [] : getDefaultChildren();

  const hasUserPlayToggle = React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    const name = getDisplayName(child.type);
    return (
      child.type === PlayToggle ||
      name === 'PlayToggle' ||
      (name ? name.endsWith('PlayToggle') : false)
    );
  });

  const isPlayToggleName = (name?: string) =>
    name === 'PlayToggle' || (name ? name.endsWith('PlayToggle') : false);

  const defaultsWithOptionalPlayToggle = [
    !disableDefaultControls &&
      asDefaultChild(
        React.createElement(PlayToggle as React.ComponentType<any>, {
          key: 'play-toggle',
          order: 1,
        })
      ),
    ...defaultChildren,
  ].filter(Boolean) as React.ReactElement[];

  const effectiveDefaults = hasUserPlayToggle
    ? defaultsWithOptionalPlayToggle.filter((c) => {
        const id = getControlId(c.type as React.ComponentType | string);
        const name = getDisplayName(c.type as React.ComponentType | string);
        return !(id === 'PlayToggle' || isPlayToggleName(name));
      })
    : defaultsWithOptionalPlayToggle;

  const seen = new Set<string>();
  const mergedChildren = mergeAndSortChildren(
    effectiveDefaults,
    children,
    parentProps
  ).filter((child) => {
    if (!React.isValidElement(child)) return false;
    const id = getControlId(child.type as React.ComponentType | string);
    const name = getDisplayName(child.type as React.ComponentType | string);

    if (!id && !name) return true;

    // Normalize PlayToggle across different bundles/wrappers so it dedupes reliably.
    const normalizedId = id || (isPlayToggleName(name) ? 'PlayToggle' : undefined);
    const key = normalizedId ? `id:${normalizedId}` : `name:${name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div
      className={classNames(
        'video-react-player-control-bar',
        {
          'video-react-player-control-bar-auto-hide': autoHide,
        },
        className
      )}
    >
      {mergedChildren}
    </div>
  );
};

ControlBar.displayName = 'ControlBar';

export default ControlBar;
