import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../store/reducers';
import { humanMonth } from '../utils';
import { increaseMonth, decreaseMonth, resetDate } from '../actions/dates';
import { THEME } from '../theme';

export const MonthSelector: React.FC = () => {
  const date = useSelector((state): RootState => state.dates);
  const dispatch = useDispatch();

  const decreaseHandler = useCallback(() => {
    dispatch(decreaseMonth());
  }, [dispatch]);
  const increaseHandler = useCallback(() => {
    dispatch(increaseMonth());
  }, [dispatch]);
  const resetDateHandler = useCallback(() => {
    dispatch(resetDate());
  }, [dispatch]);

  return (
    <View style={styles.center}>
      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.leftButton}>
          <Ionicons
            name="ios-arrow-back"
            size={32}
            color="black"
            onPress={decreaseHandler}
          />
        </TouchableOpacity>

        <Text style={styles.text}>
          {humanMonth[date.month]} {date.year}
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.rightButton}
          onPress={increaseHandler}
        >
          <Ionicons name="ios-arrow-forward" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetDateHandler}
      >
        <Ionicons
          name="ios-refresh-circle"
          size={32}
          color={THEME.dangerColor}
        />
        <Text style={styles.resetText}>Сбросить дату</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  leftButton: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'flex-end',
  },
  rightButton: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'flex-start',
  },
  text: {
    width: '55%',
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 18,
  },
  resetButton: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: "flex-start",
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  resetText: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
    marginLeft: 10
  }
});
