import { AnyAction } from 'redux';

import { OPERATE } from '../actions/player';

export interface OperationState {
  count: number;
  operation: {
    action: string;
    source: string;
  };
}

const initialState: OperationState = {
  count: 0,
  operation: {
    action: '',
    source: '',
  },
};

export default function operation(
  state: OperationState = initialState,
  action: AnyAction
): OperationState {
  switch (action.type) {
    case OPERATE:
      return {
        ...state,
        count: state.count + 1,
        operation: {
          ...state.operation,
          ...action.operation,
        },
      };
    default:
      return state;
  }
}
