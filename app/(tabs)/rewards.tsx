import { ThemedIcon } from "@/components/ThemedIcon";
import RewardsCard from "@/components/tiles/rewardsCard";
import { useStore } from "@/store/store";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function RewardsScreen() {
  const rewards = useStore((state) => state.rewards);

  if (rewards.length === 0) {
    return (
      <View style={tw`flex-1 items-center justify-center p-20`}>
        <ThemedIcon name="add" size={64} />
        <Text style={tw`text-xl font-bold text-center`}>
          ask your parent to add your first reward Now!
        </Text>
      </View>
    );
  }
  return (
    <View>
      {rewards.map((reward) => (
        <RewardsCard uuid={reward.id} key={reward.id} />
      ))}
    </View>
  );
}
