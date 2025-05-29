import { ThemedView } from "@/components/ThemedView";
import { Prize } from "@/store/models/prize";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function RewardsCard({ uuid }: { uuid: string }) {
  const [reward, setReward] = useState<Prize | null>(null);
  useEffect(() => {
    const reward = useStore.getState().getReward(uuid);
    setReward(reward);
  }, [uuid]);
  return (
    <ThemedView>
      <Text>This is a rewards card of {reward?.details.title}</Text>
    </ThemedView>
  );
}
