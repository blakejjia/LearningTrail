import { Reward } from "@/store/other/reward";
import { ThemedIconProps } from "./ThemedIcon";

import { Currency } from "@/store/models/currency";
import tw from "twrnc";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function RewardWidget({
  currencies,
  reward,
  props,
}: {
  currencies: Currency[];
  reward: Reward;
  props?: ThemedIconProps;
}) {
  const currency = currencies.find((c) => c.id === reward.currency?.id);

  return (
    <ThemedView style={tw`flex-row items-center gap-1`}>
      <ThemedIcon name={currency?.symbol ?? "redeem"} size={24} {...props} />
      <ThemedText>{reward.amount}</ThemedText>
    </ThemedView>
  );
}
