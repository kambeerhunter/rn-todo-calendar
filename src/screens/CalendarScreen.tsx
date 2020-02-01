import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { getTodosByMonth } from '../actions/todos';
import { MonthSelector } from '../components/MonthSelector';
import { DayIcon } from '../components/DayIcon';
import { RootState } from '../store/reducers';
import { formatDate } from '../utils';

const daysInMonth = (month: number, year: number) => {
  const lastDay = new Date(year, month, 0).getDate();
  return Array.from(Array(lastDay)).map((_, i) => i + 1);
};

export const CalendarScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const openDayHandler = (day: number, month: number, year: number) => {
    navigation.navigate('Day', { day, month, year });
  };

  const dispatch = useDispatch();
  const { month, year } = useSelector((state): RootState => state.dates);

  useEffect(() => {
    dispatch(getTodosByMonth(month, year));
  }, [month, year, dispatch]);

  const todos = useSelector((state): RootState => state.todos.todos);

  const daysForRender = daysInMonth(month, year);

  return (
    <View style={styles.content}>
      <MonthSelector />
      <ScrollView>
        <View style={styles.wrapper}>
          {daysForRender.map(day => (
            <DayIcon
              day={day}
              month={month}
              year={year}
              onOpen={openDayHandler}
              resolved={
                todos &&
                todos[formatDate(day, month, year)] &&
                todos[formatDate(day, month, year)].resolved
              }
              key={day}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

CalendarScreen.navigationOptions = {
  headerTitle: 'Календарь событий',
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
});
