export const dateToString = (value: number) => {
  const formatted =
    value.toString().length == 1 ? `0${value}` : value.toString();
  return formatted;
};

export const formatDate = (day: number, month: number, year: number) =>
  `${year}-${dateToString(month)}-${dateToString(day)}`;

export const humanMonth = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
};

export const sortByDate = obj => {
  return Object.keys(obj).sort((a, b) => {
    if (new Date(a) < new Date(b)) {
      return -1;
    }
    if (new Date(a) > new Date(b)) {
      return 1;
    }
    return 0;
  });
};
