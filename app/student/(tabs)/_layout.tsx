import { router, Tabs } from "expo-router";
import { Platform, Pressable } from "react-native";

import { ThemedIcon } from "@/components/common/ThemedIcon";
import { ThemedView } from "@/components/common/ThemedView";
import CurrencyWidget from "@/components/common/currency";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useStore from "@/store/store";
import tw from "twrnc";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currencies = useStore((state) => state.currencies);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="todo"
        options={{
          title: "Todo List",
          headerRight: () => (
            <ThemedView style={tw`flex-row items-center gap-2`}>
              {currencies.map((currency) => (
                <CurrencyWidget key={currency.id} currency={currency} />
              ))}
              <Pressable
                onPress={() => {
                  router.push("/parent/(tabs)/todo");
                }}
                style={tw`mr-4`}
              >
                <ThemedIcon name="settings" size={28} />
              </Pressable>
            </ThemedView>
          ),
          tabBarIcon: ({ color }) => (
            <ThemedIcon
              name="home"
              size={28}
              lightColor={color}
              darkColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          headerRight: () => (
            <ThemedView style={tw`flex-row items-center gap-2 mr-4`}>
              {currencies.map((currency) => (
                <CurrencyWidget key={currency.id} currency={currency} />
              ))}
            </ThemedView>
          ),
          tabBarIcon: ({ color }) => (
            <ThemedIcon
              name="star"
              size={28}
              lightColor={color}
              darkColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
