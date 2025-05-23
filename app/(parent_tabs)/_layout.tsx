import { Tabs } from "expo-router";

export default function ParentTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "ToDo List" }} />
      <Tabs.Screen name="rewards" options={{ title: "Rewards" }} />
    </Tabs>
  );
}
