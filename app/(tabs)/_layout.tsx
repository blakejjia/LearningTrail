import { router, Tabs } from "expo-router";
import { Platform, Pressable } from "react-native";

import { ThemedIcon } from "@/components/common/ThemedIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import tw from "twrnc";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            <Pressable
              onPress={() => {
                router.push("/(parent_tabs)/todoItem");
              }}
              style={tw`mr-4`}
            >
              <ThemedIcon name="settings" size={28} />
            </Pressable>
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
