import React, { ReactElement, ReactNode } from 'react';

// NaN is the only value in javascript which is not equal to itself.
// eslint-disable-next-line no-self-compare
const isNaN = Number.isNaN || ((value: unknown) => value !== value);

/**
 * @file format-time.js
 *
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 *
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 * @function formatTime
 */
export function formatTime(seconds = 0, guide = seconds) {
  let s = Math.floor(seconds % 60);
  let m = Math.floor((seconds / 60) % 60);
  let h = Math.floor(seconds / 3600);
  const gm = Math.floor((guide / 60) % 60);
  const gh = Math.floor(guide / 3600);

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = 0;
    m = 0;
    s = 0;
  }

  const hasHours = h > 0 || gh > 0;
  const hours = hasHours ? `${h}:` : '';
  const minutes = `${(hasHours || gm >= 10) && m < 10 ? `0${m}` : m}:`;
  const secondsString = s < 10 ? `0${s}` : `${s}`;

  return `${hours}${minutes}${secondsString}`;
}

// Check if the element belongs to a video element
// only accept <source />, <track />,
// <MyComponent isVideoChild />
// elements
export function isVideoChild(c: ReactNode): boolean {
  if (!React.isValidElement(c)) {
    return false;
  }
  if (c.props && (c.props as Record<string, unknown>).isVideoChild) {
    return true;
  }
  return c.type === 'source' || c.type === 'track';
}

const find = <T>(elements: T[], func: (value: T) => boolean): T | undefined =>
  elements.find(func);

export const getDisplayName = (
  type: React.ComponentType | string | { displayName?: string; render?: unknown }
): string | undefined => {
  if (typeof type === 'string') return type;
  if (typeof type === 'function') return type.displayName || type.name;
  if (type && typeof type === 'object') {
    const typed = type as {
      displayName?: string;
      render?: { displayName?: string; name?: string };
    };
    return typed.displayName || typed.render?.displayName || typed.render?.name;
  }
  return undefined;
};

export const getControlId = (
  type: React.ComponentType | string | { render?: unknown }
): string | undefined => {
  if (!type || typeof type === 'string') return undefined;
  const typed = type as {
    controlId?: string;
    render?: { controlId?: string };
  };
  return typed.controlId || typed.render?.controlId;
};

// check if two components are the same type
const isTypeEqual = (
  component1: ReactElement,
  component2: ReactElement
): boolean => {
  const type1 = component1.type as React.ComponentType | string;
  const type2 = component2.type as React.ComponentType | string;

  if (type1 === type2) return true;

  const controlId1 = getControlId(type1);
  const controlId2 = getControlId(type2);

  if (controlId1 && controlId1 === controlId2) {
    return true;
  }

  if (typeof type1 === 'string' || typeof type2 === 'string') {
    return type1 === type2;
  }

  const displayName1 = getDisplayName(type1);
  const displayName2 = getDisplayName(type2);

  if (!displayName1 || !displayName2) {
    return false;
  }

  if (displayName1 === displayName2) {
    return true;
  }

  return (
    displayName1.endsWith(displayName2) || displayName2.endsWith(displayName1)
  );
};

// merge default children
// sort them by `order` property
// filter them by `disabled` property
export function mergeAndSortChildren(
  defaultChildren: ReactElement[],
  _children: ReactNode,
  _parentProps: Record<string, unknown>,
  defaultOrder = 1
) {
  const children = React.Children.toArray(_children).filter(
    React.isValidElement
  ) as ReactElement[];
  const { order: _order, ...parentProps } = _parentProps; // ignore order from parent
  return children
    .filter((e) => !(e.props as Record<string, unknown>).disabled) // filter the disabled components
    .concat(
      defaultChildren.filter(
        (c) => !find(children, (component) => isTypeEqual(component, c))
      )
    )
    .map((element) => {
      const defaultComponent = find(defaultChildren, (c) =>
        isTypeEqual(c, element)
      );

      const defaultProps = defaultComponent ? defaultComponent.props : {};
      const props = {
        ...parentProps,
        ...defaultProps,
        ...element.props,
      };
      return React.cloneElement(element, props, element.props.children);
    })
    .sort(
      (a, b) =>
        ((a.props as Record<string, number>).order || defaultOrder) -
        ((b.props as Record<string, number>).order || defaultOrder)
    );
}

/**
 * Temporary utility for generating the warnings
 */
export function deprecatedWarning(
  oldMethodCall: string,
  newMethodCall: string
) {
  // eslint-disable-next-line no-console
  console.warn(
    `WARNING: ${oldMethodCall} will be deprecated soon! Please use ${newMethodCall} instead.`
  );
}

export function throttle<T extends (...args: unknown[]) => void>(
  callback: T,
  limit: number
) {
  let wait = false;
  return (...args: Parameters<T>) => {
    if (!wait) {
      callback(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export const mediaProperties = [
  'error',
  'src',
  'srcObject',
  'currentSrc',
  'crossOrigin',
  'networkState',
  'preload',
  'buffered',
  'readyState',
  'seeking',
  'currentTime',
  'duration',
  'paused',
  'defaultPlaybackRate',
  'playbackRate',
  'played',
  'seekable',
  'ended',
  'autoplay',
  'loop',
  'mediaGroup',
  'controller',
  'controls',
  'volume',
  'muted',
  'defaultMuted',
  'audioTracks',
  'videoTracks',
  'textTracks',
  'width',
  'height',
  'videoWidth',
  'videoHeight',
  'poster',
] as const;
