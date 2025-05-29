import { db, sessionsTable, usersTable } from "@/drizzle/db";
import bcrypt from "bcryptjs";
import { and, eq, gt, or } from "drizzle-orm";
import { defaultModelsData } from "./modelsSlide";
import { defaultRewardData } from "./rewardsSlide";
import { defaultTodoData } from "./todoSlide";
import {
  convertDataToState,
  convertStateToData,
  getSessionUUID,
  setSessionUUID,
  SystemFeedback,
} from "./utils";

export type AuthData = Pick<AuthSlice, "sessionId" | "parentPassword">;
export const defaultAuthData: AuthData = {
  sessionId: null,
  parentPassword: null,
};

export interface AuthSlice {
  sessionId: string | null;
  parentPassword: string | null;

  connectServer: () => Promise<SystemFeedback>;
  setParentPassword: (parentPassword: string) => void;
  login: (emailOrShortId: string, pwd: string) => Promise<SystemFeedback>;
  signup: (
    email: string,
    pwd: string,
    shortId: string
  ) => Promise<SystemFeedback>;
  logout: () => Promise<SystemFeedback>;

  loadFromDb: () => Promise<SystemFeedback>;
  saveToDb: () => Promise<SystemFeedback>;
}

export const createAuthSlice = (set: any, get: any): AuthSlice => ({
  sessionId: null,
  parentPassword: null,

  // true if logged in, false if not
  connectServer: async () => {
    const uuid = await getSessionUUID();
    if (uuid) {
      const session = await db
        .select()
        .from(sessionsTable)
        .where(
          and(
            eq(sessionsTable.id, uuid),
            gt(sessionsTable.expiresAt, new Date())
          )
        );
      if (session.length > 0 && session[0].id) {
        set({ sessionId: session[0].id });
        get().loadFromDb();
        return { success: true, message: "connect successfully" };
      } else {
        const id = await db
          .insert(sessionsTable)
          .values({
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          })
          .returning({ id: sessionsTable.id });
        await setSessionUUID(id[0].id);
        set({ sessionId: id[0].id });
        return { success: false, message: "session outdated, need login" };
      }
    } else {
      const id = await db
        .insert(sessionsTable)
        .values({
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
        .returning({ id: sessionsTable.id });
      await setSessionUUID(id[0].id);
      set({ sessionId: id[0].id });
      return { success: false, message: "need login" };
    }
  },

  setParentPassword: (parentPassword) => set({ parentPassword }),
  login: async (emailOrShortId, pwd) => {
    const accountId = await db
      .select({ pwd: usersTable.password, id: usersTable.id })
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, emailOrShortId),
          eq(usersTable.shortId, emailOrShortId)
        )
      );
    if (accountId.length === 0) {
      return {
        success: false,
        message: "account not found, try sign up first",
      };
    }
    // 其实不应该在本地进行密码验证，不过目前没啥关系
    if (!(await bcrypt.compare(pwd, accountId[0].pwd))) {
      return { success: false, message: "password is incorrect" };
    }
    await db
      .update(sessionsTable)
      .set({
        accountId: accountId[0].id,
      })
      .where(eq(sessionsTable.id, get().sessionId));
    set({ accountId: accountId[0].id });
    return { success: true, message: "login successfully" };
  },
  signup: async (email, pwd, shortId) => {
    // check if email or shortId already exists
    const emailCheck = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (emailCheck.length > 0) {
      return { success: false, message: "email already exists" };
    }
    const shortIdCheck = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.shortId, shortId));
    if (shortIdCheck.length > 0) {
      return { success: false, message: "shortId already exists" };
    }
    // hash password and insert to db
    const hashedPwd = await bcrypt.hash(pwd, 10);
    await db.insert(usersTable).values({
      email,
      password: hashedPwd,
      data: {
        system: defaultAuthData,
        rewards: defaultRewardData,
        todo: defaultTodoData,
        models: defaultModelsData,
      },
      shortId,
    });
    return { success: true, message: "signup successfully" };
  },
  logout: async () => {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, get().sessionId));
    set({ sessionId: null });
    return { success: true, message: "logout successfully" };
  },

  loadFromDb: async () => {
    const data = await db
      .select({
        data: usersTable.data,
      })
      .from(usersTable)
      .innerJoin(sessionsTable, eq(sessionsTable.accountId, usersTable.id))
      .where(eq(sessionsTable.id, get().sessionId));
    if (data[0].data) {
      set(convertDataToState(data[0].data));
      return { success: true, message: "load successfully" };
    } else {
      set({});
      return { success: false, message: "load failed" };
    }
  },
  saveToDb: async () => {
    const newData = convertStateToData(get());
    try {
      const session = await db
        .select({
          userId: usersTable.id,
        })
        .from(sessionsTable)
        .innerJoin(usersTable, eq(sessionsTable.accountId, usersTable.id))
        .where(eq(sessionsTable.id, get().sessionId))
        .then((rows) => rows[0]);
      await db
        .update(usersTable)
        .set({ data: newData })
        .where(eq(usersTable.id, session.userId));
    } catch (error) {
      return { success: false, message: "save failed" };
    }
    return { success: true, message: "save successfully" };
  },
});
