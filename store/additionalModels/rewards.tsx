import { ThemedIcon, ThemedIconProps } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import tw from "twrnc";
import { Currency } from "../models/currency";

export class Reward {
  constructor(public amount: number, public currencyId: string) {}

  toWidget(currencies: Currency[], props?: ThemedIconProps): React.ReactNode {
    const currency = currencies.find((c) => c.id === this.currencyId);
    if (!currency) return null;

    return (
      <ThemedView style={tw`flex-row items-center`}>
        <ThemedText>{this.amount}</ThemedText>
        <ThemedIcon name={currency.symbol} size={16} {...props} />
      </ThemedView>
    );
  }
}
