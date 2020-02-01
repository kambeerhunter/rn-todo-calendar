import * as SQLite from 'expo-sqlite';

import { TodoType } from './reducers/todos';

const db = SQLite.openDatabase('todos.db');

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS todos' +
            '(id INTEGER PRIMARY KEY NOT NULL,' +
            'text TEXT NOT NULL,' +
            'date TEXT NOT NULL,' +
            'resolved INTEGER DEFAULT 0)',
          [],
          resolve,
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static getTodos() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM todos',
          [],
          (_, result) => resolve(result.rows),
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static getTodosByDate(date: string) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos WHERE date = ?`,
          [date],
          (_, result) => resolve(result.rows),
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static getTodosByMonth(month: number, year: number) {
    const startDate = new Date(year, month - 1, 0).toJSON();
    const finishDate = new Date(year, month, 0).toJSON();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM todos
          WHERE date > ? AND date < ?`,
          [startDate, finishDate],
          (_, result) => resolve(result.rows),
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static createTodo(date: string, text: string) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO todos (text, date, resolved) VALUES (?, ?, ?)',
          [text, date, 0],
          (_, result) => resolve(result.insertId),
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static updateTodo(todo: TodoType) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE todos SET resolved = ? WHERE id = ?',
          [todo.resolved ? 0 : 1, todo.id],
          resolve,
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }

  static removeTodo(id: number) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM todos WHERE id = ?',
          [id],
          resolve,
          (_, error) => {
            reject(error);
            return !!error;
          }
        );
      });
    });
  }
}
