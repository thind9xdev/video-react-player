import React from 'react';
import classNames from 'classnames';

interface VolumeLevelProps {
  percentage?: string;
  vertical?: boolean;
  className?: string;
}

const VolumeLevel: React.FC<VolumeLevelProps> = ({
  percentage = '100%',
  vertical = false,
  className,
}) => {
  const style: React.CSSProperties = {};
  if (vertical) {
    style.height = percentage;
  } else {
    style.width = percentage;
  }

  return (
    <div
      className={classNames(className, 'video-react-player-volume-level')}
      style={style}
    >
      <span className="video-react-player-control-text" />
    </div>
  );
};

VolumeLevel.displayName = 'VolumeLevel';

export default VolumeLevel;
