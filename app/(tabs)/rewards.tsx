import RewardsCard from "@/components/tiles/rewardsCard";
import { useStore } from "@/store/store";
import { View } from "react-native";

export default function RewardsScreen() {
  const rewards = useStore((state) => state.rewards);
  return (
    <View>
      {rewards.map((reward) => (
        <RewardsCard uuid={reward.id} />
      ))}
    </View>
  );
}
