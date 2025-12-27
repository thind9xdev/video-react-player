import type { ActionCreators } from '../Manager';
import type { PlayerState } from '../reducers/player';

export interface PlayerComponentProps {
  actions: ActionCreators;
  player: PlayerState;
  order?: number;
}

export interface PlayerButtonProps extends PlayerComponentProps {
  className?: string;
  order?: number;
  disabled?: boolean;
}
