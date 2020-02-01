import { DB } from '../db';
import { TodoType, TodoImportType } from '../reducers/todos';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_RESOLVED = 'TOGGLE_RESOLVED';
export const REMOVE_TODO = 'REMOVE_TODO';
export const GET_ALL_TODOS = 'GET_ALL_TODOS';
export const GET_TODOS_BY_DATE = 'GET_TODOS_BY_DATE';
export const GET_TODOS_BY_MONTH = 'GET_TODOS_BY_MONTH';

type TodoAddActionType = {
  type: typeof ADD_TODO;
  payload: {
    id: number;
    date: string;
    text: string;
  };
};

type GetTodoListActionType = {
  type: typeof GET_ALL_TODOS;
  payload: Array<TodoImportType> | [];
};

type GetTodosByDateActionType = {
  type: typeof GET_TODOS_BY_DATE;
  payload: Array<TodoImportType> | [];
};

type GetTodosByMonthActionType = {
  type: typeof GET_TODOS_BY_MONTH;
  payload: Array<TodoImportType> | [];
};

type RemoveTodoActionType = {
  type: typeof REMOVE_TODO;
  payload: {
    id: number;
    date: string;
  };
};

type ToggleResolvedActionType = {
  type: typeof TOGGLE_RESOLVED;
  payload: {
    id: number;
    date: string;
    resolved: boolean;
  };
};

export type TodoActionTypes =
  | TodoAddActionType
  | GetTodoListActionType
  | GetTodosByDateActionType
  | GetTodosByMonthActionType
  | RemoveTodoActionType
  | ToggleResolvedActionType;

export const addTodo = ({
  date,
  text,
}: {
  date: string;
  text: string;
}) => async dispatch => {
  const id = await DB.createTodo(date, text);
  dispatch({
    type: ADD_TODO,
    payload: {
      id,
      date,
      text,
    },
  });
};

export const getAllTodos = () => {
  return async dispatch => {
    const result: any = await DB.getTodos();
    const data: Array<TodoImportType> = result._array || [];
    dispatch({
      type: GET_ALL_TODOS,
      payload: data.map(item => ({
        ...item,
        resolved: item.resolved === 1,
      })),
    });
  };
};

export const getTodosByDate = (date: string) => {
  return async dispatch => {
    const result: any = await DB.getTodosByDate(date);
    const data: Array<TodoImportType> = result._array || [];
    dispatch({
      type: GET_TODOS_BY_DATE,
      payload: data.map(item => ({
        ...item,
        resolved: item.resolved === 1,
      })),
    });
  };
};

export const getTodosByMonth = (month: number, year: number) => {
  return async dispatch => {
    const result: any = await DB.getTodosByMonth(month, year);
    const data: Array<TodoImportType> = result._array || [];
    dispatch({
      type: GET_TODOS_BY_MONTH,
      payload: data.map(item => ({
        ...item,
        resolved: item.resolved === 1,
      })),
    });
  };
};

export const removeTodo = (id: number, date: string) => {
  return async dispatch => {
    await DB.removeTodo(id);
    dispatch({
      type: REMOVE_TODO,
      payload: {
        id,
        date,
      },
    });
  };
};

export const toggleResolved = (todo: TodoType) => {
  return async dispatch => {
    await DB.updateTodo(todo);
    dispatch({
      type: TOGGLE_RESOLVED,
      payload: {
        id: todo.id,
        date: todo.date,
        resolved: todo.resolved,
      },
    });
  };
};
