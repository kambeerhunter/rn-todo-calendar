import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../theme';

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

  const appliedStyled = dayStyles();

  const openHandler = useCallback(() => {
    onOpen(day, month, year);
  }, [day, month, year]);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={openHandler} key={day}>
      <View style={appliedStyled}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    borderColor: THEME.borderColor,
    borderWidth: 3,
    borderRadius: 10,
    width: 65,
    height: 65,
    marginHorizontal: 5,
    marginBottom: 15,
    paddingTop: 10,
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
  },
  nowStyles: {
    backgroundColor: '#d6b7ff',
  },
});
