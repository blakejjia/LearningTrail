import { Stack } from "expo-router";

export default function SubpagesLayout() {
  return (
    <Stack>
      <Stack.Screen name="parent_auth" />
      <Stack.Screen name="todo_detail" />
      <Stack.Screen name="reward_detail" />
    </Stack>
  );
}
