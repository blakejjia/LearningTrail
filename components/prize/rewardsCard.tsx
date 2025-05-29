import { ThemedView } from "@/components/ThemedView";
import { Prize } from "@/store/models/prize";
import { Text } from "react-native";

export default function PrizeCard({ prize }: { prize: Prize }) {
  return (
    <ThemedView>
      <Text>This is a rewards card of {prize?.details?.title}</Text>
    </ThemedView>
  );
}
