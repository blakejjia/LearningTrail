import { ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <ThemedText>Hello</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
