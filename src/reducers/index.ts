import { AnyAction } from 'redux';

import player, { PlayerState } from './player';
import operation, { OperationState } from './operation';

export interface RootState {
  player: PlayerState;
  operation: OperationState;
}

export default function reducer(
  state: Partial<RootState> | undefined,
  action: AnyAction
): RootState {
  return {
    player: player(state?.player, action),
    operation: operation(state?.operation, action),
  };
}

export const playerReducer = player;
export const operationReducer = operation;
