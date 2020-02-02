export const dateToString = (value: number) => {
  const formatted =
    value.toString().length == 1 ? `0${value}` : value.toString();
  return formatted;
};

export const formatDate = (day: number, month: number, year: number) =>
  `${year}-${dateToString(month)}-${dateToString(day)}`;

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
