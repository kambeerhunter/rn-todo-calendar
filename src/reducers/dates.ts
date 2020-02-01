import { DateActionTypes } from '../actions/dates';
import { DECREASE_MONTH, INCREASE_MONTH, RESET_DATE } from '../actions/dates';

type DateStateType = {
  month: number;
  year: number;
};

const initialState: DateStateType = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export const dateReducer = (state = initialState, action: DateActionTypes) => {
  switch (action.type) {
    case DECREASE_MONTH:
      if (state.month === 1) {
        return {
          ...state,
          month: 12,
          year: state.year - 1,
        };
      }
      return {
        ...state,
        month: state.month - 1,
      };

    case INCREASE_MONTH: {
      if (state.month === 12) {
        return {
          ...state,
          month: 1,
          year: state.year + 1,
        };
      }
      return {
        ...state,
        month: state.month + 1,
      };
    }

    case RESET_DATE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
