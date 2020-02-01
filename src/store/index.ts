import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';


export const store = createStore(
  reducers,
  applyMiddleware(thunk),
  //(window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose
);
