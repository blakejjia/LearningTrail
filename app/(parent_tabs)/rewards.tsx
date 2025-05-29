import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PrizeCard from "@/components/prize/rewardsCard";
import { useStore } from "@/store/store";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import tw from "twrnc";

export default function rewards() {
  const prizes = useStore((state) => state.prizes);
  return (
    <ScrollView>
      <ThemedView>
        {prizes.map((prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </ThemedView>
      <View style={tw`p-4 items-center justify-center w-full`}>
        <Pressable onPress={() => router.push("/subpages/reward_detail")}>
          <ThemedView
            style={tw`p-4 gap-2 items-center justify-center w-2/3 rounded-2xl flex-row`}
          >
            <ThemedIcon name="star" size={24} />
            <ThemedText>Add a new reward</ThemedText>
          </ThemedView>
        </Pressable>
      </View>
    </ScrollView>
  );
}
