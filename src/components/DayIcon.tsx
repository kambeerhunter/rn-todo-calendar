import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../theme';
import { weekdays } from '../constants';

type DayPropsType = {
  day: number;
  month: number;
  year: number;
  onOpen: (day: number, month: number, year: number) => void;
  resolved: boolean;
};

export const DayIcon: React.FC<DayPropsType> = ({
  day,
  month,
  year,
  onOpen,
  resolved,
}) => {
  const dayStyles = () => {
    const now = new Date();
    const isCurrentDay =
      day === now.getDate() &&
      month === now.getMonth() + 1 &&
      year === now.getFullYear();
    let iconStyles = {
      ...styles.day,
    };
    if (isCurrentDay) {
      iconStyles = {
        ...styles.day,
        ...styles.nowStyles,
      };
    }
    if (resolved === undefined) {
      return iconStyles;
    }
    if (resolved === false) {
      return {
        ...iconStyles,
        ...styles.unresolveDay,
      };
    }
    return {
      ...iconStyles,
      ...styles.resolveDay,
    };
  };

  const appliedStyled = useMemo(() => dayStyles(), [dayStyles]);

  const weekday = useMemo(() => {
    if (year && month && day) {
      return weekdays[new Date(year, month - 1, day).getDay()];
    }
    return null;
  }, []);

  const openHandler = useCallback(() => {
    onOpen(day, month, year);
  }, [day, month, year]);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={openHandler} key={day}>
      <View style={appliedStyled}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.weekday}>{weekday}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    borderColor: THEME.borderColor,
    borderWidth: 3,
    borderRadius: 10,
    width: 62,
    height: 62,
    marginHorizontal: 5,
    marginBottom: 15,
    paddingTop: 5,
  },
  resolveDay: {
    borderColor: THEME.resolveColor,
  },
  unresolveDay: {
    borderColor: THEME.unresolveColor,
  },
  dayText: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  nowStyles: {
    backgroundColor: '#d6b7ff',
  },
  weekday: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 14,
  }
});
