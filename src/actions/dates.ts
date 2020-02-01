export const DECREASE_MONTH = 'DECREASE_MONTH';
export const INCREASE_MONTH = 'INCREASE_MONTH';
export const RESET_DATE = 'RESET_DATE';

type DeacreaseMonthType = {
  type: typeof DECREASE_MONTH;
};

type IncreaseMonthType = {
  type: typeof INCREASE_MONTH;
};

type ResetDateType = {
  type: typeof RESET_DATE;
};

export type DateActionTypes =
  | DeacreaseMonthType
  | IncreaseMonthType
  | ResetDateType;

export const decreaseMonth = (): DeacreaseMonthType => ({
  type: DECREASE_MONTH,
});

export const increaseMonth = (): IncreaseMonthType => ({
  type: INCREASE_MONTH,
});

export const resetDate = (): ResetDateType => ({
  type: RESET_DATE,
});
