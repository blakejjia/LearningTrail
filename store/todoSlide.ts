import { db, usersTable } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { TodoItem } from "./models/todoItem";
import { convertStateToData } from "./utils";

export type TodoData = Pick<TodoSlice, "toDoList">;

export interface TodoSlice {
  toDoList: TodoItem[];
  getTodo: (id: string) => TodoItem | null;
  setToDoList: (toDoList: TodoItem[]) => void;
  createTodo: (toDoItem: TodoItem) => void;
  removeToDoItem: (id: string) => void;

  loadFromDb: (uuid: string) => void;
  saveToDb: (uuid: string) => void;
}

export const createTodoSlice = (set: any, get: any): TodoSlice => ({
  getTodo: (id: string) =>
    get().toDoList.find((item: TodoItem) => item.id === id) || null,
  toDoList: [],
  setToDoList: (toDoList) => set({ toDoList }),
  createTodo: (toDoItem) => set({ toDoList: [...get().toDoList, toDoItem] }),
  removeToDoItem: (id) =>
    set({
      toDoList: get().toDoList.filter((item: TodoItem) => item.id !== id),
    }),

  loadFromDb: async (uuid: string) => {
    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, uuid));
    if (data[0].data.todo) {
      set(data[0].data.todo);
    } else {
      set({ toDoList: [] });
    }
  },
  saveToDb: async (uuid: string) => {
    const newData = convertStateToData(get());

    await db
      .update(usersTable)
      .set({ data: newData })
      .where(eq(usersTable.id, uuid));
  },
});
