import "react-native-get-random-values";
import { Symbols } from "./symbols";

export interface Currency {
  id: string;
  name: string;
  symbol: Symbols;
}

export const defaultCurrencies: Currency[] = [
  {
    id: "1",
    name: "Learning Coin",
    symbol: "paid",
  },
  {
    id: "2",
    name: "Diamond",
    symbol: "diamond",
  },
];
