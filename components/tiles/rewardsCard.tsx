import { ThemedView } from "@/components/ThemedView";
import { Reward } from "@/store/models/rewards";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function RewardsCard({ uuid }: { uuid: string }) {
  const [reward, setReward] = useState<Reward | null>(null);
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
