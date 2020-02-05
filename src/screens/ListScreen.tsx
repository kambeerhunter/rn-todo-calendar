import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { MonthSelector } from '../components/MonthSelector';
import { TodoItem } from '../components/TodoItem';
import { FilterPanel } from '../components/FilterPanel';
import { getTodosByMonth } from '../actions/todos';
import { TodoType } from '../reducers/todos';
import { RootState } from '../store/reducers';
import { sortByDate } from '../utils';

export const ListScreen: NavigationStackScreenComponent = () => {
  const dispatch = useDispatch();
  const { month, year } = useSelector((state: RootState) => state.dates);
  useEffect(() => {
    dispatch(getTodosByMonth(month, year));
  }, [dispatch, month, year]);

  const fullList = useSelector((state: RootState) => state.todos.todos);
  const sortedKeys = useMemo(() => sortByDate(fullList), [fullList]);
  const [filter, setFilter] = useState(null);
  const filterHandler = useCallback(
    (value: boolean | null) => {
      setFilter(value);
    },
    [setFilter]
  );

  const filteredList: Array<{
    date: string;
    list: TodoType[];
  }> = useMemo(() => {
    const result = [];
    sortedKeys.forEach(date => {
      const list = fullList[date].list.filter(i => i.resolved !== filter);
      if (list.length !== 0) {
        result.push({
          date,
          list,
        });
      }
    });
    return result;
  }, [filter, fullList]);

  const renderTodoList = useCallback(() => {
    return filteredList.map(({ date, list }) => {
      if (list.length > 0) {
        return (
          <View style={styles.titleWrapper} key={date}>
            <Text style={styles.center}>
              {new Date(date).toLocaleDateString('en-GB')}
            </Text>

            <View>
              {list.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </View>
          </View>
        );
      }
      return null;
    });
  }, [filteredList]);

  return (
    <View>
      <MonthSelector />

      <FilterPanel onClickHandler={filterHandler} />

      <ScrollView>
        <View style={styles.wrapper}>
          {(!filteredList || filteredList.length === 0) && filter === null && (
            <Text style={styles.center}>Ваш список задач пуст</Text>
          )}

          {(!filteredList || filteredList.length === 0) && filter !== null && (
            <Text style={styles.center}>{`Список ${
              filter ? 'незавершенных' : 'завершенных'
            } дел пуст`}</Text>
          )}

          {renderTodoList()}
        </View>
      </ScrollView>
    </View>
  );
};

ListScreen.navigationOptions = {
  headerTitle: 'Список событий',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  titleWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  center: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
});
