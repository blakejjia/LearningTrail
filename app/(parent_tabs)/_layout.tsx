import { ThemedIcon } from "@/components/ThemedIcon";
import { router, Tabs } from "expo-router";
import { Pressable } from "react-native";
import tw from "twrnc";

export default function ParentTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="todoItem"
        options={{
          title: "ToDo",
          headerRight: () => (
            <Pressable onPress={() => router.back()} style={tw`mr-4`}>
              <ThemedIcon name="chevron-left" size={28} />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <ThemedIcon name="home" size={28} />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => <ThemedIcon name="star" size={28} />,
        }}
      />
    </Tabs>
  );
}
