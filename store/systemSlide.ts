export interface SystemSlice {
  parentPassword: string;
  userId: string;
  setParentPassword: (parentPassword: string) => void;
  setUserId: (userId: string) => void;
}

export const createSystemSlice = (set: any, get: any): SystemSlice => ({
  parentPassword: "",
  userId: "",
  setParentPassword: (parentPassword) => set({ parentPassword }),
  setUserId: (userId) => set({ userId }),
});
