import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { removeTodo, toggleResolved } from '../actions/todos';
import { TodoType } from '../reducers/todos';
import { THEME } from '../theme';

type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const resolvedIconOptions = {
    name: todo.resolved
      ? 'ios-checkmark-circle-outline'
      : 'ios-close-circle-outline',
    color: todo.resolved ? 'green' : THEME.dangerColor,
  };

  const removeHandler = useCallback(() => {
    Alert.alert(
      'Удаление задачи',
      'Вы хотите удалить эту задачу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => dispatch(removeTodo(todo.id, todo.date)),
        },
      ],
      { cancelable: false }
    );
  }, [dispatch, todo]);

  const resolveHandler = useCallback(() => {
    dispatch(toggleResolved(todo));
  }, [dispatch, todo]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.todoWrapper}>
        <TouchableOpacity activeOpacity={0.5} onPress={resolveHandler}>
          <Ionicons {...resolvedIconOptions} size={28} />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>{todo.text}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={removeHandler}>
        <Ionicons name="ios-close-circle" size={32} color={THEME.dangerColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.borderColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    width: '85%',
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 14,
    paddingLeft: 10,
  },
});
