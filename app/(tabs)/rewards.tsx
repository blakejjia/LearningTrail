import { ThemedIcon } from "@/components/common/ThemedIcon";
import PrizeCard from "@/components/student/prize/rewardsCard";
import { useStore } from "@/store/store";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function RewardsScreen() {
  const prizes = useStore((state) => state.prizes);

  if (prizes.length === 0) {
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
      {prizes.map((prize) => (
        <PrizeCard prize={prize} key={prize.id} />
      ))}
    </View>
  );
}
