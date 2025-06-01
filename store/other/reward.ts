import { Currency } from "../models/currency";

export interface Reward {
  currency?: Currency;
  amount: number;
}

export const RewardNone: Reward = {
  currency: undefined,
  amount: 0,
};
