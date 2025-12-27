/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  src: PropTypes.string.isRequired,
  media: PropTypes.string,
  type: PropTypes.string,
};
interface SourceProps {
  src: string;
  media?: string;
  type?: string;
}
export default function Source({ ...props }: SourceProps) {
  const { src, media, type } = props;

  return <source src={src} media={media} type={type} />;
}

Source.propTypes = propTypes;
Source.displayName = 'Source';
