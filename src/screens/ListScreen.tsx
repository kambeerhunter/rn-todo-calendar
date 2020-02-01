import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

import { TodoItem } from '../components/TodoItem';
import { FilterPanel } from '../components/FilterPanel';
import { getAllTodos } from '../actions/todos';
import { RootState } from '../store/reducers';
import { sortByDate } from '../utils';

export const ListScreen: NavigationStackScreenComponent = () => {
  const dispatch = useDispatch();
  const fullList = useSelector((state): RootState => state.todos.todos);
  const sortedKeys = useMemo(() => sortByDate(fullList), [fullList]);
  const [filter, setFilter] = useState(null);
  const filterHandler = useCallback(
    (value: boolean | null) => {
      setFilter(value);
    },
    [setFilter]
  );

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch, fullList]);

  return (
    <View>
      <FilterPanel onClickHandler={filterHandler} />

      <ScrollView>
        <View style={styles.wrapper}>
          {fullList &&
            sortedKeys.map(date => {
              return (
                <View style={styles.titleWrapper} key={date}>
                  <Text style={styles.center}>
                    {new Date(date).toLocaleDateString('en-GB')}
                  </Text>

                  <View>
                    {fullList[date].list
                      .filter(i => i.resolved !== filter)
                      .map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                      ))}
                  </View>
                </View>
              );
            })}
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
  },
});
