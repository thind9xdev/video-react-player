/**

 * Copyright (c) 2016 Video-React contributors
 * Copyright (c) 2025 ZingMe.Vn
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import MenuButton from '../menu/MenuButton';
import type { PlayerButtonProps } from '../../types/component';

interface ClosedCaptionButtonProps extends PlayerButtonProps {
  className?: string;
  offMenuText?: string;
  showOffMenu?: boolean;
  kinds?: TextTrackKind[];
}

interface TextTrackMenuItem {
  label: string;
  value: string | null;
}

const DEFAULT_KINDS: TextTrackKind[] = ['captions', 'subtitles'];

const ClosedCaptionButton: React.FC<ClosedCaptionButtonProps> = ({
  player,
  actions,
  className,
  offMenuText = 'Off',
  showOffMenu = true,
  kinds = DEFAULT_KINDS,
}) => {
  const textTrackItems = useMemo(() => {
    const items: TextTrackMenuItem[] = [];
    const tracks = Array.from(player.textTracks || []);

    if (showOffMenu) {
      items.push({
        label: offMenuText,
        value: null,
      });
    }

    tracks.forEach((textTrack) => {
      if (kinds.length && !kinds.includes(textTrack.kind as TextTrackKind)) {
        return;
      }

      items.push({
        label: textTrack.label || textTrack.language || 'Unknown',
        value: textTrack.language || null,
      });
    });

    const selectedIndex = items.findIndex(
      (item) =>
        player.activeTextTrack &&
        item.value !== null &&
        player.activeTextTrack.language === item.value
    );

    return {
      items,
      selectedIndex: selectedIndex >= 0 ? selectedIndex : 0,
    };
  }, [
    kinds,
    offMenuText,
    player.activeTextTrack,
    player.textTracks,
    showOffMenu,
  ]);

  const handleSelectItem = useCallback(
    (index: number) => {
      Array.from(player.textTracks || []).forEach((textTrack, trackIndex) => {
        const normalizedIndex = showOffMenu ? trackIndex + 1 : trackIndex;
        if (index === normalizedIndex) {
          textTrack.mode = 'showing';
          actions.activateTextTrack(textTrack);
        } else {
          textTrack.mode = 'hidden';
        }
      });

      if (showOffMenu && index === 0) {
        actions.activateTextTrack(null);
      }
    },
    [actions, player.textTracks, showOffMenu]
  );

  return (
    <MenuButton
      className={classNames('video-react-player-closed-caption', className)}
      onSelectItem={handleSelectItem}
      items={textTrackItems.items}
      selectedIndex={textTrackItems.selectedIndex}
    >
      <span className="video-react-player-control-text">Closed Caption</span>
    </MenuButton>
  );
};

ClosedCaptionButton.displayName = 'ClosedCaptionButton';
export default ClosedCaptionButton;
