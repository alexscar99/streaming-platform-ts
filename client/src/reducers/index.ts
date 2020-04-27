import { combineReducers } from 'redux';

export interface StoreState {
  replaceMe: String;
}

export const reducers = combineReducers<StoreState>({
  replaceMe: () => 'asjhfj',
});
