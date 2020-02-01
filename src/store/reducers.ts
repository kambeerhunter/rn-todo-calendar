import { combineReducers } from 'redux';

import { dateReducer } from '../reducers/dates';
import { todosReducer } from '../reducers/todos';

export const reducers = combineReducers({
  dates: dateReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof reducers>;
