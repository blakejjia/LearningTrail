import { v4 as uuidv4 } from "uuid";
import { NonSelectedCategory } from "./models/category";
import { Duration } from "./models/Duratoin";
import { TodoItem } from "./models/todoItem";

export type TodoData = Pick<TodoSlice, "toDoList">;
export const defaultTodoData: TodoData = {
  toDoList: [
    {
      id: uuidv4(),
      category: NonSelectedCategory,
      details: {
        title: "Add the todos",
        description: "Add the todos to the list",
        completed: false,
        reward: { amount: 10, currencyId: "1" },
      },
    },
  ],
};

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
  removeTodo: (id: string) => void;
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
  },
  removeTodo: (id) => {
    set({
      toDoList: get().toDoList.filter((item: TodoItem) => item.id !== id),
    });
    get().saveToDb();
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
