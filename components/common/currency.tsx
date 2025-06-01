import { Currency } from "@/store/models/currency";
import tw from "twrnc";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function CurrencyWidget({
  currency,
  showAmount = true,
}: {
  currency: Currency;
  showAmount?: boolean;
}) {
  return (
    <ThemedView style={tw`flex-row items-center gap-1`}>
      <ThemedIcon name={currency.symbol} size={24} />
      {showAmount && (
        <ThemedText style={tw`font-bold text-gray-500`}>
          {currency.amount}
        </ThemedText>
      )}
    </ThemedView>
  );
}
