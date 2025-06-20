import { Duration } from "./models/Duratoin";
import { TodoItem } from "./models/todoItem";

export type TodoData = Pick<TodoSlice, "toDoList">;

export interface TodoSlice {
  toDoList: TodoItem[];

  getTodo: (id: string) => TodoItem | null;
  // regarding completion
  identifyTodoAsCompleted: (id: string) => void;
  identifyAsNotCompleted: (id: string) => void;
  completeTodo: (id: string) => void;
  // regarding timing
  setTodoTiming: (id: string, usedTime: Duration) => void;
  // basics
  createTodo: (toDoItem: TodoItem) => void;
  updateTodo: (id: string, toDoItem: TodoItem) => void;
  removeTodo: (id: string) => Promise<boolean>;
}

export const createTodoSlice = (set: any, get: any): TodoSlice => ({
  toDoList: [],

  getTodo: (id: string) =>
    get().toDoList.find((item: TodoItem) => item.id === id) || null,
  createTodo: (toDoItem) => {
    set({ toDoList: [...get().toDoList, toDoItem] });
    get().saveToDb();
  },
  setTodoTiming: (id: string, usedTime: Duration) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? { ...item, details: { ...item.details, usedTime } }
          : item
      ),
    });
    get().saveToDb();
  },
  removeTodo: (id) => {
    set({
      toDoList: get().toDoList.filter((item: TodoItem) => item.id !== id),
    });
    get().saveToDb();
    return Promise.resolve(true);
  },
  identifyTodoAsCompleted: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, identifiedCompleted: true },
            }
          : item
      ),
    });
    get().saveToDb();
  },
  identifyAsNotCompleted: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, identifiedCompleted: false },
            }
          : item
      ),
    });
    get().saveToDb();
  },
  completeTodo: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, completed: true },
            }
          : item
      ),
    });
    get().saveToDb();
  },
  updateTodo: (id: string, toDoItem: TodoItem) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id ? toDoItem : item
      ),
    });
    get().saveToDb();
  },
});
