import {
  ADD_TODO,
  GET_ALL_TODOS,
  GET_TODOS_BY_DATE,
  GET_TODOS_BY_MONTH,
  REMOVE_TODO,
  TOGGLE_RESOLVED,
  TodoActionTypes,
} from '../actions/todos';

export type TodoType = {
  id: number;
  date: string;
  resolved: boolean;
  text: string;
};

export type TodoImportType = {
  id: number;
  date: string;
  resolved: number;
  text: string;
};

type TodoStateElemType = {
  list: Array<TodoType>;
  resolved: boolean;
};

type TodoState = {
  todos: {
    [key: string]: TodoStateElemType;
  };
};

const initialState: TodoState = {
  todos: {},
};

const createElementsMap = (elements: Array<TodoImportType>) => {
  const elementsMap = {};
  elements.forEach((todo: TodoImportType) => {
    if (!elementsMap[todo.date]) {
      elementsMap[todo.date] = {
        list: [todo],
        resolved: todo.resolved,
      };
    } else {
      elementsMap[todo.date] = {
        list: [...elementsMap[todo.date].list, todo],
        resolved: elementsMap[todo.date].resolved && todo.resolved,
      };
    }
  });
  return elementsMap;
};

export const todosReducer = (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: createElementsMap(action.payload),
      };

    case GET_TODOS_BY_DATE:
      return {
        ...state,
        todos: createElementsMap(action.payload),
      };

    case GET_TODOS_BY_MONTH:
      return {
        ...state,
        todos: createElementsMap(action.payload),
      };

    case ADD_TODO:
      const { date, text, id } = action.payload;
      const newTodo = {
        id,
        text,
        date,
        resolved: false,
      };
      let updatedElement;
      if (state.todos[date] && state.todos[date].list) {
        updatedElement = {
          list: [...state.todos[date].list, newTodo],
          resolved: false,
        };
      } else {
        updatedElement = {
          list: [newTodo],
          resolved: false,
        };
      }
      return {
        ...state,
        todos: {
          ...state.todos,
          [date]: updatedElement,
        },
      };

    case REMOVE_TODO:
      const newList = [...state.todos[action.payload.date].list].filter(
        item => item.id !== action.payload.id
      );

      if (newList.length === 0) {
        const newTodos = {...state.todos};
        delete newTodos[action.payload.date];
        return {
          ...state,
          todos: newTodos,
        };
      }

      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.date]: {
            list: newList,
            resolved: !newList.some(i => i.resolved === false),
          },
        },
      };

    case TOGGLE_RESOLVED:
      const toggledList = [...state.todos[action.payload.date].list].map(
        item => {
          if (item.id === action.payload.id) {
            item.resolved = !item.resolved;
          }
          return item;
        }
      );

      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.date]: {
            list: toggledList,
            resolved: !toggledList.some(i => i.resolved === false),
          },
        },
      };

    default:
      return state;
  }
};
