// @ts-nocheck
import { createStore, Store, Unsubscribe } from 'redux';

import reducer, { RootState } from './reducers';
import * as playerActions from './actions/player';
import * as videoActions from './actions/video';

type BindThis = (...args: any[]) => any;
export type ActionCreators = Record<string, BindThis>;

export interface VideoAPI {
  play(): Promise<void> | void;
  pause(): Promise<void> | void;
  load(): void;
  addTextTrack(
    kind: TextTrackKind,
    label?: string,
    language?: string
  ): TextTrack;
  canPlayType(
    ...args: Parameters<HTMLVideoElement['canPlayType']>
  ): CanPlayTypeResult;
  togglePlay(): void;
  seek(time: number): void;
  forward(seconds: number): void;
  replay(seconds: number): void;
  toggleFullscreen(): void;
  playbackRate: number;
  muted: boolean;
  volume: number;
  videoWidth: number;
  videoHeight: number;
  video?: HTMLVideoElement | null;
}

export default class Manager {
  store: Store<RootState>;

  video: VideoAPI | null;

  rootElement: HTMLElement | null;

  boundActions: ActionCreators | undefined;

  constructor(store?: Store<RootState>) {
    this.store = store || createStore(reducer);
    this.video = null;
    this.rootElement = null;
    this.boundActions = undefined;
  }

  getActions(): ActionCreators {
    if (this.boundActions) {
      return this.boundActions;
    }

    const actions: Record<string, unknown> = {
      ...playerActions,
      ...videoActions,
    };

    const bound: Record<string, (...args: unknown[]) => void> = {};

    Object.keys(actions).forEach((key) => {
      const creator: any = actions[key];
      if (typeof creator !== 'function') {
        return;
      }

      bound[key] = (...args: unknown[]) => {
        const action = creator.apply(this, args);
        if (typeof action !== 'undefined') {
          this.store.dispatch(action);
        }
      };
    });

    this.boundActions = bound;
    return this.boundActions;
  }

  getState(): RootState {
    return this.store.getState();
  }

  subscribeToStateChange(
    listener: (state: any, prevState: any) => void,
    getState: () => any = this.getState.bind(this)
  ): Unsubscribe {
    let prevState = getState();

    const handleChange = () => {
      const state = getState();
      if (state === prevState) {
        return;
      }
      const prevStateCopy = prevState;
      prevState = state;
      listener(state, prevStateCopy);
    };

    return this.store.subscribe(handleChange);
  }

  subscribeToOperationStateChange(
    listener: (
      state: RootState['operation'],
      prev: RootState['operation']
    ) => void
  ): Unsubscribe {
    return this.subscribeToStateChange(
      listener,
      () => this.getState().operation
    );
  }

  subscribeToPlayerStateChange(
    listener: (state: RootState['player'], prev: RootState['player']) => void
  ): Unsubscribe {
    return this.subscribeToStateChange(listener, () => this.getState().player);
  }
}
