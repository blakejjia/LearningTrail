import { db, sessionsTable, usersTable } from "@/drizzle/db";
import bcrypt from "bcryptjs";
import { and, eq, or } from "drizzle-orm";
import { defaultModelsData } from "./modelsSlide";
import { defaultPrizeData } from "./rewardsSlide";
import { defaultTodoData } from "./todoSlide";
import { clearSessionUUID, getSessionUUID, SystemFeedback } from "./utils";

export type AuthData = Pick<AuthSlice, "parentPassword">;
export const defaultAuthData: AuthData = {
  parentPassword: null,
};

export interface AuthSlice {
  sessionId: string | null;
  accountId: string | null;
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
}

export const createAuthSlice = (set: any, get: any): AuthSlice => ({
  sessionId: null,
  parentPassword: null,
  accountId: null,

  // true if logged in, false if not
  // After this step, we should have sessionId set
  connectServer: async () => {
    const sessionId = await getSessionUUID();
    set({ sessionId: sessionId });
    const session = await db
      .select()
      .from(sessionsTable)
      .where(and(eq(sessionsTable.id, sessionId)));
    if (session.length > 0) {
      // record found, check if accountId set
      if (session[0].accountId) {
        set({ accountId: session[0].accountId });
        get().loadFromDb();
        return { success: true, message: "connect successfully" };
      } else {
        return { success: false, message: "please login" };
      }
    } else {
      // record not found, create a new one
      await db.insert(sessionsTable).values({
        id: sessionId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
      return { success: false, message: "please login" };
    }
  },

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
    if (!(await bcrypt.compare(pwd, accountId[0].pwd))) {
      return { success: false, message: "password is incorrect" };
    }

    await db
      .update(sessionsTable)
      .set({ accountId: accountId[0].id })
      .where(eq(sessionsTable.id, get().sessionId));
    set({ accountId: accountId[0].id });
    get().loadFromDb();
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
    const newUser = await db
      .insert(usersTable)
      .values({
        email,
        password: hashedPwd,
        data: {
          auth: defaultAuthData,
          prizes: defaultPrizeData,
          todo: defaultTodoData,
          models: defaultModelsData,
        },
        shortId,
      })
      .returning({ id: usersTable.id });

    const sessionId = get().sessionId;
    if (sessionId && newUser[0]?.id) {
      await db
        .update(sessionsTable)
        .set({ accountId: newUser[0].id })
        .where(eq(sessionsTable.id, sessionId));
      set({ accountId: newUser[0].id });
      get().loadFromDb();
    }

    return { success: true, message: "signup successfully" };
  },

  logout: async () => {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, get().sessionId));
    await clearSessionUUID();
    set({ sessionId: null });
    return { success: true, message: "logout successfully" };
  },

  setParentPassword: (parentPassword) => set({ parentPassword }),
});
