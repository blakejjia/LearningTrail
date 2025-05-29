import { Reward } from "@/store/additionalModels/rewards";
import { ThemedIconProps } from "../ThemedIcon";

import { Currency } from "@/store/models/currency";
import tw from "twrnc";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function rewardToWidget(
  currencies: Currency[],
  reward: Reward,
  props?: ThemedIconProps
): React.ReactNode {
  const currency = currencies.find((c) => c.id === reward.currencyId);
  if (!currency) return null;

  return (
    <ThemedView style={tw`flex-row items-center`}>
      <ThemedText>{reward.amount}</ThemedText>
      <ThemedIcon name={currency.symbol} size={16} {...props} />
    </ThemedView>
  );
}
