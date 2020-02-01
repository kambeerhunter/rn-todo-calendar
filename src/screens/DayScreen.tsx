import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, TextInput } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { RootState } from '../store/reducers';
import { addTodo } from '../actions/todos';
import { THEME } from '../theme';
import { formatDate, dateToString } from '../utils';
import { TodoItem } from '../components/TodoItem';

export const DayScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const day = navigation.getParam('day');
  const date = useSelector((state): RootState => state.dates);
  const selectedDay = formatDate(day, date.month, date.year);

  const todos = useSelector((state): RootState => state.todos.todos[selectedDay]) || {};

  const submitForm = useCallback(() => {
    dispatch(
      addTodo({
        date: selectedDay,
        text: value,
      })
    );
    setValue('');
  }, [dispatch, value]);

  return (
    <View style={styles.wrapper}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          onSubmitEditing={submitForm}
          placeholder="Введите название задачи"
        />
      </View>

      <View>
        {todos && todos.list &&  todos.list.length > 0 &&
          todos.list.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </View>
    </View>
  );
};

DayScreen.navigationOptions = ({ navigation }) => {
  const day = dateToString(navigation.getParam('day'));
  const month = dateToString(navigation.getParam('month'));
  const year = navigation.getParam('year');

  return {
    headerTitle: `${day}/${month}/${year}`,
  };
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    borderColor: THEME.mainColor,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
